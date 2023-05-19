"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_datingCircle = require("../../stores/datingCircle.js");
const stores_person = require("../../stores/person.js");
const _sfc_main = {
  __name: "Publish",
  setup(__props) {
    const useDatingCircleStore = stores_datingCircle.datingCircleStore();
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const publish = () => {
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
            if (useDatingCircleStore.type == 1) {
              common_vendor.index.request({
                url: `${proxy.baseUrl}/add/landlord`,
                method: "POST",
                data: {
                  publish_id: usePersonStore.personData.id,
                  message: useDatingCircleStore.message
                },
                success(res2) {
                  if (res2.data.code == 0) {
                    common_vendor.index.showToast({
                      title: `${res2.data.message}`
                    });
                    useDatingCircleStore.isShowPublish = false;
                    useDatingCircleStore.message = "";
                    useDatingCircleStore.type = 0;
                    usePersonStore.isPublishLandlord = true;
                    common_vendor.index.navigateTo({
                      url: "/pages/datingCircles/datingCircles"
                    });
                  }
                }
              });
            } else if (useDatingCircleStore.type == 2) {
              common_vendor.index.request({
                url: `${proxy.baseUrl}/add/reply`,
                method: "POST",
                data: {
                  publish_id: usePersonStore.personData.id,
                  message: useDatingCircleStore.message,
                  reply_id: useDatingCircleStore.reply_id,
                  floor: useDatingCircleStore.floor
                },
                success(res2) {
                  if (res2.data.code == 0) {
                    common_vendor.index.showToast({
                      title: `${res2.data.message}`
                    });
                    useDatingCircleStore.isShowPublish = false;
                    useDatingCircleStore.message = "";
                    useDatingCircleStore.type = 0;
                    useDatingCircleStore.reply_id = "";
                    useDatingCircleStore.floor = ";";
                    usePersonStore.isPublishReply = true;
                    common_vendor.index.navigateTo({
                      url: "/pages/datingCircles/datingCircles"
                    });
                  }
                }
              });
            }
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
        }
      });
    };
    const cancle = () => {
      useDatingCircleStore.isShowPublish = false;
      useDatingCircleStore.message = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(useDatingCircleStore).message,
        b: common_vendor.o(($event) => common_vendor.unref(useDatingCircleStore).message = $event.detail.value),
        c: common_vendor.o(publish),
        d: common_vendor.o(cancle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a45d052"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Publish.vue"]]);
wx.createComponent(Component);
