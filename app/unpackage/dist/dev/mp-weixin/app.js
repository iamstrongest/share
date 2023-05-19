"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/sportShop/sportShop.js";
  "./pages/my/my.js";
  "./pages/consumeHistory/consumeHistory.js";
  "./pages/datingCircles/datingCircles.js";
  "./pages/sportCart/sportCart.js";
  "./pages/login/login.js";
  "./pages/confirm/confirm.js";
  "./pages/payment/payment.js";
  "./pages/paymentMethods/paymentMethods.js";
  "./pages/account/account.js";
  "./pages/paySuccess/paySuccess.js";
  "./pages/details/details.js";
  "./pages/registry/registry.js";
  "./pages/findPwd/findPwd.js";
  "./pages/search/search.js";
  "./pages/set/set.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.index.hideTabBar({
      animation: false
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Front-end/uni-app/uni-project/app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const baseUrl = "http://47.106.134.6:3003/api";
  app.config.globalProperties.baseUrl = baseUrl;
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
