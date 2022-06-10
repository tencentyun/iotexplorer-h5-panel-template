<template>
  <div>
    <div class="more-menu">
      <van-icon
        name="more-o"
        @click="goDeviceDetail"
      >
        跳转设备详情
      </van-icon>
    </div>
    <div style="display: flex; justify-content: space-around;">
      <!-- <van-button type="primary" @click="showTip" size="small">显示设备状态</van-button> -->
      <img :src="logo">
      <van-button
        type="primary"
        size="small"
        :loading="connectStatus === 'connecting'"
        loading-text="连接中"
        @click="!isConnected ? connectDevice() : disconnectDevice()"
      >
        {{ !isConnected ? '连接设备' : '断开连接' }}
      </van-button>
      <van-button
        type="danger"
        size="small"
        :disabled="!isConnected"
        @click="controlDevice({lock_switch: Number(!deviceData.lockSwitch)})"
      >
        控制设备:{{ deviceData.lockSwitch ? '关' : '开' }}
      </van-button>
    </div>

    <a href="https://cloud.tencent.com/document/product/1081">官网文档</a>
  </div>
</template>

<script>
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import { useDeviceData } from "../hooks/useDeviceData";
import { watchEffect } from "vue";

const StandardBleConnectStatus = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ERROR: "connect-error",
};
const StandardBleConnectStatusStr = {
  [StandardBleConnectStatus.DISCONNECTED]: "蓝牙未连接",
  [StandardBleConnectStatus.CONNECTING]: "蓝牙连接中",
  [StandardBleConnectStatus.CONNECTED]: "蓝牙已连接",
  [StandardBleConnectStatus.ERROR]: "无法连接蓝牙设备,点击重试",
};

export default {
  setup() {
    const {deviceData, deviceStatus} = useDeviceData();
    watchEffect(() => {
      if (deviceStatus.value === 0) {
        sdk.showOfflineTip();
      } else {
        sdk.hideOfflineTip();
      }
    });

    return {
      deviceData,
      deviceStatus
    }
  },
  data() {
    return {
      connectStatus: "",
      bleStatus: ""
    };
  },
  computed: {
    isConnected() {
      return this.connectStatus === StandardBleConnectStatus.CONNECTED
    }
  },
  methods: {
    updateDeviceConnectStatusInfo(connectStatus, msg = "") {
      this.connectStatus = connectStatus;
      this.bleStatus = StandardBleConnectStatusStr[connectStatus];
    },
    showTip() {
      sdk.getDeviceStatus().then((res) => {
        console.log("res", res);
        sdk.tips.alert("设备已离线");
      });
    },
    controlDevice(data) {
      console.log('control data', data);
      sdk.controlDeviceData(data).then(() => {
        console.log('控制成功');
      }).catch(err => {
        console.warn('控制失败', err.message);
      });
      this.deviceData.lockSwitch = data.lock_switch;
    },
    isDeviceReady(deviceAdapter) {
      return (
        deviceAdapter && deviceAdapter.isConnected && deviceAdapter.authorized
      );
    },
    goDeviceDetail() {
      sdk.goDeviceInfoPage(`${this.productId}/${this.deviceName}`);
    },

    async connectDevice() {
      if (!sdk.isStandardBleDevice) return;

      try {
        let familyId = sdk.familyId;
        let deviceId = sdk.deviceId;
        console.log(
          "%c familyId: %s deviceId: %s",
          "color:yellow",
          familyId,
          deviceId
        );
        const [productId, deviceName] = deviceId.split("/");
        console.log(
          "%c productId: %s deviceName: %s",
          "color:yellow",
          productId,
          deviceName
        );

        let serviceId = sdk.StandardDeviceAdapter.serviceId;
        console.log("%c serviceId:", "color:yellow", serviceId);

        console.log(
          "%c sdk.blueToothAdapter:",
          "color:yellow",
          sdk.blueToothAdapter
        );
        let deviceAdapter = sdk.blueToothAdapter.getDeviceAdapter({
          explorerDeviceId: deviceId,
        });
        console.log("deviceAdapter", deviceAdapter);
        if (!this.isDeviceReady(deviceAdapter)) {
          console.log("%c device is not ready:", "color:red");

          this.updateDeviceConnectStatusInfo(
            StandardBleConnectStatus.CONNECTING
          );

          if (!deviceAdapter) {
            await sdk.blueToothAdapter.init();
            try {
              const device = await sdk.blueToothAdapter.searchDevice({
                serviceId: sdk.StandardDeviceAdapter.serviceId,
                productId,
                deviceName,
                // 因为要使用广播中的version来判断发包，所以不使用缓存吧
                disableCache: true,
              });

              if (device) {
                deviceAdapter = await sdk.blueToothAdapter.connectDevice(device);
                console.log(
                  "%c sdk.blueToothAdapter.connectDevice(device) deviceAdapter:",
                  "color:green",
                  deviceAdapter
                );
              } else {
                console.warn('没有搜到设备，请重试', device);
                this.connectStatus = StandardBleConnectStatus.DISCONNECTED;
                sdk.tips.showError('没有搜到设备，请重试');
                return;
              }
            } catch(err) {
              console.error('搜索出错', err.message);
            }
          }
        } else {
          console.log("%c device is ready:", "color:green");
        }

        // console.log('%c deviceAdapter 2:', 'color:green', deviceAdapter)
        if (!deviceAdapter.isConnected) {
          await deviceAdapter.connectDevice();
        }

        if (!deviceAdapter.authorized) {
          // 走再次连接的流程
          try {
            console.info('开始鉴权');
            await deviceAdapter.authenticateConnection({
              deviceName,
            });
            console.info('鉴权完成');
          } catch (err) {
            console.error('auth failed', err.message);
          }
        }

        this.deviceAdapterRef = deviceAdapter;

        this.updateDeviceConnectStatusInfo(StandardBleConnectStatus.CONNECTED);
      } catch (err) {
        console.error(err);
        if (err) {
          this.updateDeviceConnectStatusInfo(
            StandardBleConnectStatus.ERROR,
            err.errCode || err.msg ? err.msg : ""
          );

          sdk.insightReportor.error(sdk.REPORT_EVENT_TYPE, {
            message: '连接设备出错',
            error: err,
            data: {
              error: err,
            },
          });
        }
      }
    },
    disconnectDevice() {
      console.warn('disconnect Device');
      this.deviceAdapterRef.disconnectDevice();
    }
  },
};
</script>

<style>
.more-menu{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
