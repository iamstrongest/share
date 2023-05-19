import App from "./App";
import * as Pinia from "pinia";

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();

// #endif

// #ifdef VUE3
import { createSSRApp, provide, ref } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  // const baseUrl = "http://47.110.123.6:3003/api";//自己远程服务器地址
  // const baseUrl = "http://192.168.137.1:3000/api";//自己手机与电脑处在的同一个热点下的地址
  const baseUrl = "http://127.0.0.1:3003/api"; //浏览器调试的地址
  app.config.globalProperties.baseUrl = baseUrl;
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia, // 此处必须将 Pinia 返回
  };
}
// #endif
