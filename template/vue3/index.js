import { createApp } from "vue";
import router from './router';
import App from './App.vue';

const sdk = window.h5PanelSdk;

console.log('sdk', sdk);

const app = createApp(App);
app.use(router);
app.mount("#app");