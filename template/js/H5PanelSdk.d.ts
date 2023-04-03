interface Tips {
  showInfo: () => void;
  showError: (info: string) => void;
  showSuccess: (info: string) => void;
  showLoading: (msg: string) => void;
  hideLoading: () => void;
}
interface H5PanelSdk {
  deviceId: string;
  requestTokenApi: (apiName: string, payload: any) => Promise<any>;
  callDeviceAction: (payload: any, actionName: string) => Promise<any>;
  tips: Tips;
  isShareDevice: boolean;
  [key: string]: any;
}
interface Window {
  h5PanelSdk: H5PanelSdk;
}