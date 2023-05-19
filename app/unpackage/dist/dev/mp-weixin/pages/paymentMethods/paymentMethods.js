"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "paymentMethods",
  setup(__props) {
    const pay = () => {
      common_vendor.index.navigateTo({
        url: "/pages/payment/payment"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.o(pay)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b4590e3"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/paymentMethods/paymentMethods.vue"]]);
wx.createPage(MiniProgramPage);
