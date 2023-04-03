import { useEffect, useReducer, useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { retry } from '../utils/retry';
export interface UseDeviceInfoState {
  deviceInfo: any;
  productInfo: any;
  templateMap: any;
  deviceData: any;
  eventMap: Record<string, any>;
  statusTip?: { status: 'error' | 'loading' | 'empty' } | null;
}

export interface UserDeviceInfoData extends UseDeviceInfoState {
  isShareDevice?: boolean;
}

export type DoControlDeviceData = (id: string | { [id: string]: any }, value?: any) => void;

export interface UseDeviceInfoHandler {
  doControlDeviceData: DoControlDeviceData;
}

export type UseDeviceInfoResult = [UserDeviceInfoData, UseDeviceInfoHandler];

// declare type Reducer = (state: UseDeviceInfoState, action: ReducerAction<UseDeviceInfoAction>) => UseDeviceInfoState;

export enum UseDeviceInfoAction {
  Init = 'Init',
  UpdateDeviceData = 'UpdateDeviceData',
  UpdateDeviceInfo = 'UpdateDeviceInfo',
  UpdateDeviceStatus = 'UpdateDeviceStatus',
}

const getFirstKey = (obj = {}): string => {
  for (const key in obj) {
    return key;
  }
  return '';
};
// 更新数据
function reducer(state: UseDeviceInfoState, action): UseDeviceInfoState {
  const { type, payload } = action;

  // console.log('action => ', action.type, payload);
  // console.log('prev state => ', state);

  const nextState = (() => {
    switch (type) {
      case UseDeviceInfoAction.Init: {
        return {
          ...state,
          ...payload,
          statusTip: null,
        };
      }
      case UseDeviceInfoAction.UpdateDeviceData: {
        const deviceData = { ...state.deviceData };

        for (const key in payload.deviceData) {
          if (!deviceData[key] || deviceData[key] !== payload.deviceData[key]) {
            deviceData[key] = payload.deviceData[key];
          }
        }

        return {
          ...state,
          deviceData,
        };
      }
      case UseDeviceInfoAction.UpdateDeviceInfo: {
        const deviceInfo = { ...state.deviceInfo };

        for (const key in payload.deviceInfo) {
          if (!deviceInfo[key] || deviceInfo[key] !== payload.deviceInfo[key]) {
            deviceInfo[key] = payload.deviceInfo[key];
          }
        }

        return {
          ...state,
          deviceInfo,
        };
      }
      case UseDeviceInfoAction.UpdateDeviceStatus: {
        const { deviceStatus } = payload;

        return {
          ...state,
          deviceInfo: {
            ...state.deviceInfo,
            Status: deviceStatus,
          },
        };
      }
    }

    return state;
  })();

  // console.log('next state => ', nextState);

  return nextState;
}

// 初始化sdk状态
function initState(sdk, online = true): UseDeviceInfoState {
  const { deviceInfo, productInfo, dataTemplate, deviceData, deviceStatus } = sdk;

  const result = {
    deviceInfo,
    productInfo,
    templateMap: {},
    eventMap: {},
    deviceData,
    statusTip: null,
  };

  ['events', 'actions', 'properties'].forEach((key) => {
    if (dataTemplate[key] && dataTemplate[key].length) {
      dataTemplate[key].forEach((item) => {
        result.templateMap[item.id] = item;
        if (key === 'events') {
          result.eventMap[item.id] = item;
        }
      });
    }
  });

  result.deviceInfo.Status = online !== undefined ? online : deviceStatus;
  result.deviceInfo.isVirtualDevice = deviceInfo.DeviceName === '~virtualDev';
  return result;
}

export const useDeviceInfo = (): UseDeviceInfoResult => {
  // id 为key，设置 setTimeout 避免连续操作
  const controlDeviceDataDebounceMap = useRef({});
  const [state, dispatch] = useReducer(reducer, initState(sdk));

  const controlDeviceData = async (deviceData) => {
    try {
      await sdk.controlDeviceData(deviceData);
    } catch (err) {
      console.warn('control failed', err);
    }
  };

  const doControlDeviceData = (idOrDeviceData, value) => {
    let deviceData;

    if (typeof idOrDeviceData === 'string') {
      deviceData = { [idOrDeviceData]: typeof value === 'boolean' ? Number(value) : value };
    } else {
      deviceData = idOrDeviceData;
    }

    // 以第一个key为id
    const id = getFirstKey(deviceData);

    clearTimeout(controlDeviceDataDebounceMap.current[id]);

    controlDeviceDataDebounceMap.current[id] = setTimeout(() => controlDeviceData(deviceData), 100);
  };

  useEffect(() => {
    const handleWsReport = ({ deviceId, deviceData }) => {
      console.log('handleWsStatusChange==========', deviceData);
      if (deviceId === sdk.deviceId) {
        const data = {};
        for (const key in deviceData) {
          data[key] = deviceData[key].Value;
        }
        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceData,
          payload: { deviceData: data },
        });
      }
    };

    const handleWsStatusChange = ({ deviceId, deviceStatus }) => {
      if (deviceId === sdk.deviceId) {
        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceStatus,
          payload: { deviceStatus },
        });
      }
    };
    const handleWsControl = ({ deviceId, deviceData }) => {
      console.log('wsControl==========', deviceData);
      // 最好在 report消息触发后更新，因为这时候物模型才是真正的更新了
      if (deviceId === sdk.deviceId) {
        const data = {};
        for (const key in deviceData) {
          data[key] = deviceData[key].Value;
        }
        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceData,
          payload: { deviceData: data },
        });
      }
    };

    const handleWsPush = ({ action, params }) => {
      if (action === 'DeviceChange') {
        const { DeviceId, Type, SubType, Payload } = params;
        if (SubType === 'DeviceAliasUpdate' && DeviceId === sdk.deviceId) {
          try {
            const { DeviceAlias } = JSON.parse(sdk.appDevSdk.utils.base64.decode(Payload));
            dispatch({
              type: UseDeviceInfoAction.UpdateDeviceInfo,
              payload: { deviceInfo: { AliasName: DeviceAlias } },
            });
          } catch (err) {
            console.warn('update alias failed', err);
          }
        }
      }
    }

    sdk
      .on('wsControl', handleWsControl)
      .on('wsReport', handleWsReport)
      .on('wsStatusChange', handleWsStatusChange)
      .on('wsPush', handleWsPush);
    // TODO 后续明确具体线上与测试的差异后 进行去掉wsControl处理
    // sdk
    //   .on('wsReport', handleWsReport)
    //   .on('wsStatusChange', handleWsStatusChange);

    // 当小程序进入后台后，可能无法及时同步 在线状态，这时要调用 api 同步下在线状态

    const getDeviceStatus = () => {
      if (sdk.isMock) {
        return Promise.resolve(1);
      }
      return sdk.requestTokenApi('AppGetDeviceStatuses', {
        DeviceIds: [sdk.deviceId],
      }).then(({ DeviceStatuses }) => {
        return DeviceStatuses[0]?.Online;
      });
    };
    const  getInitData = () => Promise.all([getDeviceStatus(), sdk.sdkReady()])
      .then(([deviceStatus]) => {
        dispatch({
          type: UseDeviceInfoAction.Init,
          payload: initState(sdk, deviceStatus),
        });
        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceStatus,
          payload: { deviceStatus },
        });
      });
    retry(getInitData, { times: 3 })
      .catch((err) => {
        console.warn('sdk ready fail', err);
        sdk.insightReportor.error('SDK-INIT-ERROR', err.message);
      });

    return () => {
      sdk
        .off('wsControl', handleWsReport)
        .off('wsReport', handleWsReport)
        .off('wsStatusChange', handleWsStatusChange);
    };
  }, []);

  return [{
    ...state,
    isShareDevice: sdk.isShareDevice,
  }, { doControlDeviceData }];
};
