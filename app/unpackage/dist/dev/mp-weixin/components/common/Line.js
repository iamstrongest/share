"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: {
    line_color: {
      type: String,
      default: "red"
    },
    line_width: {
      type: String,
      default: "2rpx"
    },
    line_style: {
      type: String,
      default: "solid"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: this.line_color,
    b: this.line_width,
    c: this.line_style
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c929473b"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/Line.vue"]]);
wx.createComponent(Component);
