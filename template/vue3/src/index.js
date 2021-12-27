import VConsole from 'vconsole';
import { createApp } from 'vue';
import { Button, Cell, Icon } from 'vant';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import router from './router';
import App from './App.vue';
import { StandardDeviceAdapter4H5 as StandardDeviceAdapter, utils } from 'qcloud-iotexplorer-bluetooth-adapter-llsync';

import 'vant/lib/index.css';

StandardDeviceAdapter.injectOptions({ appDevSdk: sdk.appDevSdk });
sdk.blueToothAdapter.addAdapter(StandardDeviceAdapter, true);

const vConsole = new VConsole();

// 由于 vConsole 会劫持浏览器的 console，这里需要重新赋值一下，才能正常打印
utils.log.log = console.log;
localStorage.debug = '*';

const app = createApp(App);
[router, Button, Cell, Icon].forEach(plugin => app.use(plugin));
app.mount("#app");