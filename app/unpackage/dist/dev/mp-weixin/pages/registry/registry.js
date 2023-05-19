"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const Line = () => "../../components/common/Line.js";
const _sfc_main = {
  setup() {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const verificationCode = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const re_password = common_vendor.ref("");
    const btnMessage = common_vendor.ref("点击发送");
    const isConfirm = common_vendor.ref(false);
    const usePersonStore = stores_person.personStore();
    const submitPhone = () => {
      if (isConfirm.value) {
        if (password.value == "" || re_password.value == "") {
          common_vendor.index.showToast({
            title: "密码不能为空",
            icon: "error"
          });
          return;
        }
        if (password.value != re_password.value) {
          common_vendor.index.showToast({
            title: "密码输入不正确",
            icon: "error"
          });
          return;
        } else {
          common_vendor.index.request({
            method: "POST",
            url: `${proxy.baseUrl}/register/phone`,
            data: {
              verificationCode: verificationCode.value,
              phone: phone.value,
              password: password.value
            },
            success(res) {
              common_vendor.index.showModal({
                title: "提示",
                content: "注册成功,点击确认前往登录界面",
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
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: `请先发送验证码`,
          showCancel: false,
          success: function(res) {
            if (res.confirm)
              ;
          }
        });
      }
    };
    let timer = null;
    let time = common_vendor.ref(5);
    let timer1 = null;
    let flag = true;
    const getVerificationCode = (wait = 500) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (flag) {
          flag = false;
          common_vendor.index.request({
            method: "POST",
            url: `${proxy.baseUrl}/send/phone`,
            data: {
              phone: phone.value
            },
            success(res) {
              common_vendor.index.showModal({
                title: "提示",
                content: `${res.data.message}`,
                showCancel: false,
                success: function(res2) {
                  if (res2.confirm) {
                    isConfirm.value = true;
                  }
                }
              });
            }
          });
          timer1 = setInterval(() => {
            time.value = time.value - 1;
            btnMessage.value = `${time.value}秒后重发`;
            if (time.value == 0) {
              clearInterval(timer1);
              btnMessage.value = `点击重发`;
              flag = true;
              time.value = 5;
            }
          }, 1e3);
        }
      }, wait);
    };
    return {
      phone,
      password,
      re_password,
      btnMessage,
      verificationCode,
      usePersonStore,
      submitPhone,
      getVerificationCode
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
    c: common_vendor.t($setup.btnMessage),
    d: common_vendor.o(($event) => $setup.getVerificationCode(1e3)),
    e: $setup.verificationCode,
    f: common_vendor.o(($event) => $setup.verificationCode = $event.detail.value),
    g: common_vendor.p({
      line_color: "skyblue"
    }),
    h: $setup.password,
    i: common_vendor.o(($event) => $setup.password = $event.detail.value),
    j: $setup.re_password,
    k: common_vendor.o(($event) => $setup.re_password = $event.detail.value),
    l: common_vendor.p({
      line_color: "#ccc"
    }),
    m: common_vendor.o((...args) => $setup.submitPhone && $setup.submitPhone(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4420ee1d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/registry/registry.vue"]]);
wx.createPage(MiniProgramPage);
