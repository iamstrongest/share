"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const stores_datingCircle = require("../../stores/datingCircle.js");
const utils_useDate = require("../../utils/useDate.js");
const _sfc_main = {
  __name: "Reply",
  props: {
    image_width: {
      type: Number,
      default: 70
    },
    image_height: {
      type: Number,
      default: 70
    },
    margin_left: {
      type: Number,
      default: -70
    },
    font_style: {
      type: Number || String,
      default: 700
    },
    data: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const usePersonStore = stores_person.personStore();
    const useDatingCircleStore = stores_datingCircle.datingCircleStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const goodNum = common_vendor.ref(0);
    const userInThumbs = common_vendor.ref([]);
    const getFollowThumbsLength = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/get/followThumbs`,
        method: "GET",
        data: {
          follow_id: props.data.id
        },
        success(res) {
          goodNum.value = res.data.length;
          userInThumbs.value = res.data.data;
        }
      });
    };
    const changeFollowThumbs = () => {
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
            common_vendor.index.request({
              url: `${proxy.baseUrl}/change/followThumbs`,
              method: "POST",
              data: {
                follow_id: props.data.id,
                user_id: usePersonStore.personData.id,
                been_given_id: props.data.publish_id
              },
              success(res2) {
                if (res2.data.code == 0) {
                  common_vendor.index.request({
                    method: "GET",
                    url: `${proxy.baseUrl}/user/another`,
                    data: {
                      id: usePersonStore.personData.id
                    },
                    success(res3) {
                      usePersonStore.anotherData = res3.data.data;
                    }
                  });
                  getFollowThumbsLength();
                }
              }
            });
          }
        }
      });
    };
    const reply = () => {
      useDatingCircleStore.isShowPublish = true;
      useDatingCircleStore.type = 2;
      useDatingCircleStore.reply_id = props.data.publish_id;
      useDatingCircleStore.floor = props.data.floor;
    };
    getFollowThumbsLength();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.data.imageUrl,
        b: props.image_width + "rpx",
        c: props.image_height + "rpx",
        d: props.font_style,
        e: props.margin_left + "rpx",
        f: common_vendor.t(__props.data.publish_name),
        g: common_vendor.t(__props.data.reply_name),
        h: common_vendor.t(__props.data.message),
        i: common_vendor.t(common_vendor.unref(utils_useDate.useDate)(__props.data.time)),
        j: common_vendor.o(reply),
        k: !userInThumbs.value.includes(common_vendor.unref(usePersonStore).personData.id)
      }, !userInThumbs.value.includes(common_vendor.unref(usePersonStore).personData.id) ? {} : {}, {
        l: common_vendor.t(goodNum.value),
        m: common_vendor.o(changeFollowThumbs)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6393d47c"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Reply.vue"]]);
wx.createComponent(Component);
