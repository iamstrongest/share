"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const stores_collectCart = require("../../stores/collectCart.js");
const SuccessPay = () => "../../components/history/SuccessPay.js";
const FailPay = () => "../../components/history/FailPay.js";
const _sfc_main = {
  setup() {
    const usePersonStore = stores_person.personStore();
    stores_collectCart.collectCartStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const show = common_vendor.ref("SuccessPay");
    const change = (component) => {
      show.value = component;
    };
    common_vendor.index.request({
      method: "POST",
      url: `${proxy.baseUrl}/validate`,
      header: {
        authorization: usePersonStore.authorization
      },
      data: {
        phone: usePersonStore.personData.phone
      },
      success(res) {
        if (res.data.code == 401) {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        } else if (res.data.code == 200) {
          usePersonStore.authorization = res.data.token;
        }
      }
    });
    common_vendor.index.request({
      method: "GET",
      url: `${proxy.baseUrl}/order`,
      data: {
        user_id: usePersonStore.personData.id
      },
      success(res) {
        usePersonStore.fullPayList = res.data.fullPayList;
        usePersonStore.partPayList = res.data.partPayList;
      }
    });
    return {
      show,
      change,
      usePersonStore
    };
  },
  components: {
    SuccessPay,
    FailPay
  },
  onLoad() {
  }
};
if (!Array) {
  const _easycom_tabBar2 = common_vendor.resolveComponent("tabBar");
  _easycom_tabBar2();
}
const _easycom_tabBar = () => "../../components/tabBar/tabBar.js";
if (!Math) {
  _easycom_tabBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.change("SuccessPay")),
    b: common_vendor.o(($event) => $setup.change("FailPay")),
    c: common_vendor.p({
      propsIndex: 4
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30930065"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/consumeHistory/consumeHistory.vue"]]);
wx.createPage(MiniProgramPage);
