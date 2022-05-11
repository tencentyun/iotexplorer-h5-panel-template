import { createApp } from 'vue';
import { Button, Cell, Icon, Tab, Tabs } from 'vant';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import router from './router';
import App from './App.vue';
import { StandardDeviceAdapter4H5 as StandardDeviceAdapter } from 'qcloud-iotexplorer-bluetooth-adapter-llsync';

import 'vant/lib/index.css';

StandardDeviceAdapter.injectOptions({ appDevSdk: sdk.appDevSdk });
sdk.blueToothAdapter.addAdapter(StandardDeviceAdapter, true);

const app = createApp(App);
[router, Button, Cell, Icon, Tab, Tabs].forEach(plugin => app.use(plugin));
app.mount("#app");
