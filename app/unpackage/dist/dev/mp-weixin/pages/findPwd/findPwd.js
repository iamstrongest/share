"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const Line = () => "../../components/common/Line.js";
const _sfc_main = {
  setup() {
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const phone = common_vendor.ref("");
    const email = common_vendor.ref("");
    const getPwd = () => {
      if (phone.value == "" || email.value == "") {
        common_vendor.index.showToast({
          title: "手机号码或者邮箱不能为空",
          icon: "error"
        });
        return;
      } else {
        common_vendor.index.request({
          method: "POST",
          url: `${proxy.baseUrl}/find/pwd`,
          data: {
            phone: phone.value,
            email: email.value
          },
          success(res) {
            common_vendor.index.showModal({
              title: "提示",
              content: `${res.data.message}，点击确认前往登录界面`,
              showCancel: false,
              success: function(res2) {
                if (res2.confirm) {
                  common_vendor.index.navigateTo({
                    url: "/pages/login/login"
                  });
                }
              }
            });
          }
        });
      }
    };
    return {
      phone,
      email,
      getPwd,
      usePersonStore
    };
  },
  onLoad() {
  },
  components: {
    Line
  }
};
if (!Array) {
  const _component_Line = common_vendor.resolveComponent("Line");
  _component_Line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.phone,
    b: common_vendor.o(($event) => $setup.phone = $event.detail.value),
    c: $setup.email,
    d: common_vendor.o(($event) => $setup.email = $event.detail.value),
    e: common_vendor.p({
      line_color: "#cb2d01"
    }),
    f: common_vendor.o((...args) => $setup.getPwd && $setup.getPwd(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-60183a10"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/findPwd/findPwd.vue"]]);
wx.createPage(MiniProgramPage);
