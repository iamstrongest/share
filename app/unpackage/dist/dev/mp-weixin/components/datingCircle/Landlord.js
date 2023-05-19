"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_datingCircle = require("../../stores/datingCircle.js");
const stores_person = require("../../stores/person.js");
const utils_useDate = require("../../utils/useDate.js");
if (!Math) {
  Reply();
}
const Reply = () => "./Reply.js";
const _sfc_main = {
  __name: "Landlord",
  props: {
    image_width: {
      type: Number,
      default: 70
    },
    image_height: {
      type: Number,
      default: 70
    },
    isLandlord: {
      type: Boolean,
      default: false
    },
    margin_left: {
      type: Number,
      default: 100
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
    const useDatingCircleStore = stores_datingCircle.datingCircleStore();
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const isShowMore = common_vendor.ref(false);
    let length = common_vendor.ref(0);
    let page = common_vendor.ref(1);
    let nowShowLength = common_vendor.ref(0);
    const goodNum = common_vendor.ref(0);
    const userInThumbs = common_vendor.ref([]);
    let replyData = common_vendor.ref([]);
    const getLength = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/getReplyLength`,
        method: "GET",
        data: {
          floor: props.data.id
        },
        success(res) {
          length.value = res.data.length;
        }
      });
    };
    const getLandThumbsLength = () => {
      common_vendor.index.request({
        url: `${proxy.baseUrl}/get/landThumbs`,
        method: "GET",
        data: {
          land_id: props.data.id
        },
        success(res) {
          goodNum.value = res.data.length;
          userInThumbs.value = res.data.data;
        }
      });
    };
    const changeLandThumbs = () => {
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
              url: `${proxy.baseUrl}/change/landThumbs`,
              method: "POST",
              data: {
                land_id: props.data.id,
                user_id: usePersonStore.personData.id,
                been_given_id: props.data.user_id
              },
              success(res2) {
                if (res2.data.code == 0) {
                  getLandThumbsLength();
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
                }
              }
            });
          }
        }
      });
    };
    const addMore = () => {
      if (!isShowMore.value) {
        isShowMore.value = true;
      }
      common_vendor.index.request({
        url: `${proxy.baseUrl}/reply/${props.data.id}`,
        method: "GET",
        data: {
          page: page.value
        },
        success(res) {
          replyData.value = [...replyData.value, ...res.data.data];
          page.value++;
          nowShowLength.value += res.data.length;
        }
      });
    };
    const reply = () => {
      useDatingCircleStore.isShowPublish = true;
      useDatingCircleStore.type = 2;
      useDatingCircleStore.reply_id = props.data.user_id;
      useDatingCircleStore.floor = props.data.id;
    };
    getLength();
    getLandThumbsLength();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.data.imageUrl,
        b: props.image_width + "rpx",
        c: props.image_height + "rpx",
        d: props.font_style,
        e: props.margin_left + "rpx",
        f: common_vendor.t(__props.data.username),
        g: common_vendor.t(__props.data.message),
        h: common_vendor.t(common_vendor.unref(utils_useDate.useDate)(__props.data.time)),
        i: common_vendor.o(reply),
        j: !userInThumbs.value.includes(common_vendor.unref(usePersonStore).personData.id)
      }, !userInThumbs.value.includes(common_vendor.unref(usePersonStore).personData.id) ? {} : {}, {
        k: common_vendor.t(goodNum.value),
        l: common_vendor.o(changeLandThumbs),
        m: isShowMore.value && common_vendor.unref(length) > 0
      }, isShowMore.value && common_vendor.unref(length) > 0 ? {
        n: common_vendor.f(common_vendor.unref(replyData), (item, index, i0) => {
          return {
            a: index,
            b: "8ae1c494-0-" + i0,
            c: common_vendor.p({
              data: item
            })
          };
        })
      } : {}, {
        o: props.isLandlord && common_vendor.unref(length) > 0
      }, props.isLandlord && common_vendor.unref(length) > 0 ? common_vendor.e({
        p: !isShowMore.value
      }, !isShowMore.value ? {
        q: common_vendor.t(common_vendor.unref(length))
      } : common_vendor.e({
        r: common_vendor.unref(nowShowLength) < common_vendor.unref(length)
      }, common_vendor.unref(nowShowLength) < common_vendor.unref(length) ? {} : {}), {
        s: common_vendor.o(addMore)
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8ae1c494"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Landlord.vue"]]);
wx.createComponent(Component);
