import { createApp } from 'vue';
import { Button, Cell, Icon, Tab, Tabs } from 'vant';
const sdk = window.h5PanelSdk;
import router from './router';
import App from './App.vue';

import 'vant/lib/index.css';

const app = createApp(App);
[router, Button, Cell, Icon, Tab, Tabs].forEach(plugin => app.use(plugin));
app.mount("#app");
