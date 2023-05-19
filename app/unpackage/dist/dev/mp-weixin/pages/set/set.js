"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
if (!Math) {
  Mask();
}
const Mask = () => "../../components/common/Mask.js";
const _sfc_main = {
  __name: "set",
  setup(__props) {
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const user = common_vendor.reactive({
      username: "",
      email: "",
      description: "",
      verificationCode: ""
    });
    const showMask = common_vendor.reactive({
      showName: false,
      showEmail: false,
      showDesc: false
    });
    const show = (type) => {
      switch (type) {
        case 1:
          showMask.showName = true;
          break;
        case 2:
          showMask.showDesc = true;
          break;
        case 3:
          showMask.showEmail = true;
          break;
      }
    };
    const cancle = () => {
      showMask.showName = false;
      showMask.showDesc = false;
      showMask.showEmail = false;
    };
    const changeTickname = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/change/name`,
        method: "PUT",
        data: {
          id: usePersonStore.personData.id,
          username: user.username
        },
        success(res) {
          common_vendor.index.showToast({
            title: `${res.data.message}`
          });
          common_vendor.index.request({
            url: `${proxy.baseUrl}/get`,
            data: {
              id: usePersonStore.personData.id
            },
            success(res2) {
              usePersonStore.personData = res2.data.data;
              common_vendor.index.navigateTo({
                url: "/pages/my/my"
              });
            }
          });
        }
      });
      showMask.showName = false;
    };
    const changeDesc = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/change/description`,
        method: "PUT",
        data: {
          id: usePersonStore.personData.id,
          description: user.description
        },
        success(res) {
          common_vendor.index.showToast({
            title: `${res.data.message}`
          });
          common_vendor.index.request({
            url: `${proxy.baseUrl}/get`,
            data: {
              id: usePersonStore.personData.id
            },
            success(res2) {
              usePersonStore.personData = res2.data.data;
              common_vendor.index.navigateTo({
                url: "/pages/my/my"
              });
            }
          });
        }
      });
      showMask.showDesc = false;
    };
    const getVerificationCode = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/send/email`,
        method: "POST",
        data: {
          id: usePersonStore.personData.id,
          email: user.email
        },
        success(res) {
          common_vendor.index.showModal({
            title: `${res.data.message}`
          });
        }
      });
    };
    const submit = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/register/email`,
        method: "POST",
        data: {
          phone: usePersonStore.personData.phone,
          verificationCode: user.verificationCode
        },
        success(res) {
          common_vendor.index.showToast({
            title: `${res.data.message}`
          });
          common_vendor.index.request({
            url: `${proxy.baseUrl}/get`,
            data: {
              id: usePersonStore.personData.id
            },
            success(res2) {
              usePersonStore.personData = res2.data.data;
              common_vendor.index.showModal({
                title: `${res2.data.message}`
              });
            }
          });
        }
      });
    };
    const upload = () => {
      common_vendor.index.chooseImage({
        //选择图片
        count: 1,
        sizeType: ["compressed"],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          common_vendor.index.uploadFile({
            //上传代码
            url: `${proxy.baseUrl}/upload/image`,
            //本地node.js服务器地址
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              //用于给file文件添加额外说明信息
              id: usePersonStore.personData.id
            },
            success: function(res2) {
              common_vendor.index.showToast({
                title: `修改头像成功`
              });
              common_vendor.index.request({
                url: `${proxy.baseUrl}/get`,
                data: {
                  id: usePersonStore.personData.id
                },
                success(response) {
                  usePersonStore.personData = response.data.data;
                  common_vendor.index.navigateTo({
                    url: "/pages/my/my"
                  });
                }
              });
            },
            fail: function(err) {
              console.log(err);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => show(1)),
        b: common_vendor.o(($event) => show(2)),
        c: common_vendor.o(($event) => show(3)),
        d: common_vendor.o(upload),
        e: showMask.showName
      }, showMask.showName ? {
        f: user.username,
        g: common_vendor.o(($event) => user.username = $event.detail.value),
        h: common_vendor.o(changeTickname),
        i: common_vendor.o(cancle)
      } : {}, {
        j: showMask.showDesc
      }, showMask.showDesc ? {
        k: user.description,
        l: common_vendor.o(($event) => user.description = $event.detail.value),
        m: common_vendor.o(changeDesc),
        n: common_vendor.o(cancle)
      } : {}, {
        o: showMask.showEmail
      }, showMask.showEmail ? {
        p: user.email,
        q: common_vendor.o(($event) => user.email = $event.detail.value),
        r: common_vendor.o(getVerificationCode),
        s: user.verificationCode,
        t: common_vendor.o(($event) => user.verificationCode = $event.detail.value),
        v: common_vendor.o(submit),
        w: common_vendor.o(cancle)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8936fe0d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/set/set.vue"]]);
wx.createPage(MiniProgramPage);
