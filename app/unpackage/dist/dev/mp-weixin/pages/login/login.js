"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const stores_collectCart = require("../../stores/collectCart.js");
const LineLine = () => "../../components/common/Line.js";
const _sfc_main = {
  setup() {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const localPhone = common_vendor.index.getStorageSync("phone");
    const localPassword = common_vendor.index.getStorageSync("password");
    if (localPhone != void 0) {
      phone.value = localPhone;
    }
    if (localPassword != void 0) {
      password.value = localPassword;
    }
    const usePersonStore = stores_person.personStore();
    const useCollectCartStore = stores_collectCart.collectCartStore();
    const goRegistry = () => {
      common_vendor.index.navigateTo({
        url: "/pages/registry/registry"
      });
    };
    const goFindPwd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/findPwd/findPwd"
      });
    };
    const login = () => {
      common_vendor.index.request({
        method: "POST",
        url: `${proxy.baseUrl}/login`,
        data: {
          phone: phone.value,
          password: password.value
        },
        success(res) {
          if (res.data.code == 0) {
            common_vendor.index.navigateBack({
              delta: 1,
              animationType: "pop-in",
              animationDuration: 1e3,
              success() {
                usePersonStore.personData = res.data.data;
                usePersonStore.authorization = res.data.token;
                common_vendor.index.setStorageSync("phone", phone.value);
                common_vendor.index.setStorageSync("password", password.value);
                common_vendor.index.showToast({
                  title: `${res.data.message}`
                });
                common_vendor.index.request({
                  method: "GET",
                  url: `${proxy.baseUrl}/order`,
                  data: {
                    user_id: usePersonStore.personData.id
                  },
                  success(res2) {
                    usePersonStore.fullPayList = res2.data.fullPayList;
                    usePersonStore.partPayList = res2.data.partPayList;
                  }
                });
                common_vendor.index.request({
                  method: "GET",
                  url: `${proxy.baseUrl}/getCart`,
                  data: {
                    id: usePersonStore.personData.id
                  },
                  success(res2) {
                    useCollectCartStore.selectIdList = res2.data.selectId;
                    useCollectCartStore.selectEquipmentList = res2.data.data;
                  }
                });
                common_vendor.index.request({
                  method: "GET",
                  url: `${proxy.baseUrl}/user/another`,
                  data: {
                    id: usePersonStore.personData.id
                  },
                  success(res2) {
                    usePersonStore.anotherData = res2.data.data;
                  }
                });
              }
            });
          } else {
            common_vendor.index.showModal({
              title: "温馨提示,请联系管理员",
              content: `${res.data.message}`
            });
          }
        }
      });
    };
    const vxLogin = () => {
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log(loginRes);
          console.log(loginRes.authResult);
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: function(infoRes) {
              console.log(infoRes);
              console.log("用户昵称为：" + infoRes.userInfo.nickName);
            }
          });
        }
      });
    };
    return {
      phone,
      password,
      goRegistry,
      goFindPwd,
      localPhone,
      localPassword,
      login,
      usePersonStore,
      vxLogin
    };
  },
  components: {
    LineLine
  },
  onLoad() {
  }
};
if (!Array) {
  const _component_LineLine = common_vendor.resolveComponent("LineLine");
  _component_LineLine();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.phone,
    b: common_vendor.o(($event) => $setup.phone = $event.detail.value),
    c: $setup.password,
    d: common_vendor.o(($event) => $setup.password = $event.detail.value),
    e: common_vendor.o((...args) => $setup.goRegistry && $setup.goRegistry(...args)),
    f: common_vendor.o((...args) => $setup.goFindPwd && $setup.goFindPwd(...args)),
    g: common_vendor.p({
      line_color: "blue"
    }),
    h: common_vendor.o((...args) => $setup.vxLogin && $setup.vxLogin(...args)),
    i: common_vendor.o((...args) => $setup.login && $setup.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
