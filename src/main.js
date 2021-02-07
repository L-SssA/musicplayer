import {
  createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import 'nprogress/nprogress.css'

import registerIcons from "./utils/registerIcons";

let app = createApp(App)
app.use(store)
  .use(router)
  .use(Antd)

registerIcons(app)

// 调用 mount 后，app内各函数都会失效，调用报错 undefined 。
app.mount("#app")