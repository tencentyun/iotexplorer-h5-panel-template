import { createApp } from 'vue';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import router from './router';
import App from './App.vue';

console.log('sdk', sdk);

const app = createApp(App);
app.use(router);
app.mount("#app");
