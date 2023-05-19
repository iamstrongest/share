"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "TextCard",
  props: {
    text: {
      type: String || Number,
      default: "猜你喜欢"
    },
    color: {
      type: String,
      default: "#ccc"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.text),
        b: props.color
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Front-end/uni-app/uni-project/app/components/common/TextCard.vue"]]);
wx.createComponent(Component);
