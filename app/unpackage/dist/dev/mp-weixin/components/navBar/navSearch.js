"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_datingCircle = require("../../stores/datingCircle.js");
const _sfc_main = {
  setup(props) {
    const useDatingCircleStore = stores_datingCircle.datingCircleStore();
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const publish = () => {
      useDatingCircleStore.isShowPublish = true;
      useDatingCircleStore.type = 1;
    };
    const goUrl = () => {
      common_vendor.index.navigateTo({
        url: `${props.url}`
      });
    };
    return {
      back,
      publish,
      goUrl
    };
  },
  props: {
    margin_height: {
      type: Number,
      default: 50
    },
    nav_text: {
      type: String,
      default: "搜索界面"
    },
    right_text: {
      type: String,
      default: "搜索"
    },
    right_img: {
      type: String,
      default: "../../static/images/search.png"
    },
    url: {
      type: String,
      default: "/pages/search/search"
    },
    show_back: {
      type: Boolean,
      default: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show_back
  }, $props.show_back ? {
    b: common_vendor.o((...args) => $setup.back && $setup.back(...args))
  } : {}, {
    c: common_vendor.t($props.nav_text),
    d: common_vendor.t($props.right_text),
    e: $props.right_img,
    f: common_vendor.o((...args) => $setup.goUrl && $setup.goUrl(...args)),
    g: $props.margin_height + "rpx"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e414a9a0"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/navBar/navSearch.vue"]]);
wx.createComponent(Component);
