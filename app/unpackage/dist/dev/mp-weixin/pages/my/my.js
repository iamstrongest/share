"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const _sfc_main = {
  setup() {
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const isBck = common_vendor.ref(false);
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
    const loginOut = () => {
      if (usePersonStore.personData.id !== void 0) {
        usePersonStore.personData = {};
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        common_vendor.index.showToast({
          title: "用户未登录"
        });
      }
    };
    const changeBck = () => {
      isBck.value = !isBck.value;
    };
    const goSet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/set/set"
      });
    };
    return {
      usePersonStore,
      loginOut,
      changeBck,
      isBck,
      goSet
    };
  },
  data() {
    return {
      index: ""
    };
  },
  onLoad(e) {
    this.index = e.index;
  },
  methods: {
    goConsumeHistory() {
      this.index = 3;
      common_vendor.index.navigateTo({
        url: `/pages/consumeHistory/consumeHistory?index=${this.index}`
      });
    },
    goDatingCircles() {
      this.index = 4;
      common_vendor.index.navigateTo({
        url: `/pages/datingCircles/datingCircles?index=${this.index}`
      });
    }
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
    a: common_vendor.o((...args) => $setup.goSet && $setup.goSet(...args)),
    b: $setup.isBck ? 1 : "",
    c: common_vendor.o((...args) => $setup.changeBck && $setup.changeBck(...args)),
    d: $setup.isBck ? 1 : "",
    e: $setup.usePersonStore.personData.imageUrl,
    f: common_vendor.t($setup.usePersonStore.personData.username),
    g: common_vendor.t($setup.usePersonStore.personData.money),
    h: common_vendor.t($setup.usePersonStore.personData.credit),
    i: common_vendor.t($setup.usePersonStore.personData.description),
    j: common_vendor.t($setup.usePersonStore.anotherData.publishLength),
    k: common_vendor.t($setup.usePersonStore.anotherData.replyLength),
    l: common_vendor.t($setup.usePersonStore.anotherData.thumbsLength),
    m: common_vendor.o((...args) => $setup.loginOut && $setup.loginOut(...args)),
    n: $setup.usePersonStore.personData.id !== void 0 ? 1 : "",
    o: $setup.usePersonStore.personData.id == void 0 ? 1 : "",
    p: common_vendor.p({
      propsIndex: 2
    }),
    q: $setup.isBck ? 1 : ""
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
