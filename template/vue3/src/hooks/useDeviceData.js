import { reactive, ref } from 'vue';
import sdk from "qcloud-iotexplorer-h5-panel-sdk";

export function useDeviceData() {
  // TIP: 直接传入 sdk.deviceData，响应式不生效
  const deviceData = reactive({...sdk.deviceData});
  // 设备在线状态 0：离线 1：在线
  const deviceStatusRef = ref(1);
  sdk.on('wsReport', function (res) {
    const {deviceData: incomeDeviceData, deviceId} = res;
    if (deviceId === sdk.deviceId) {
      for (const key in incomeDeviceData) {
        deviceData[key] = incomeDeviceData[key].Value;
      }
    }
  });

  const getInitData = Promise.all([sdk.getDeviceStatus(), sdk.sdkReady()]);
  const app = document.getElementById("app");
  const loading = document.createElement("div");
  loading.className="loading";
  document.body.appendChild(loading);
  app.setAttribute("style", "display:none");
  getInitData.then(status => {
    deviceStatusRef.value = status;
    loading.remove()
    app.setAttribute("style", "display:block");
  });

  sdk.on('wsStatusChange', ({deviceStatus}) => {
    console.log({deviceStatus});
    deviceStatusRef.value = deviceStatus;
  });

  return { deviceData, deviceStatus: deviceStatusRef };
}
