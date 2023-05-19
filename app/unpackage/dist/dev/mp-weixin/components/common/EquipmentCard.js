"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "EquipmentCard",
  props: {
    equipment: {
      type: Object,
      require: true
    },
    style_width: {
      type: Number || String,
      default: 50
    },
    style_height: {
      type: Number || String,
      default: 250
    },
    url: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.equipment.imageUrl,
        b: common_vendor.t(__props.equipment.name),
        c: common_vendor.t(__props.equipment.type),
        d: common_vendor.t(__props.equipment.price),
        e: common_vendor.t(__props.equipment.unit),
        f: common_vendor.t(__props.equipment.restNum),
        g: +__props.style_height + "rpx",
        h: +__props.style_width + "%"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69d51b90"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/EquipmentCard.vue"]]);
wx.createComponent(Component);
