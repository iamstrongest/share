"use strict";
const common_vendor = require("../../common/vendor.js");
const static_iconPath = require("../../static/iconPath.js");
const _sfc_main = {
  data() {
    return {
      dataList: [],
      selectIndex: 0
    };
  },
  props: {
    propsIndex: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.dataList = static_iconPath.tabBarList;
    this.selectIndex = parseInt(this.propsIndex);
  },
  methods: {
    select(url, index) {
      common_vendor.index.switchTab({
        url
      });
      this.selectIndex = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dataList, (item, index, i0) => {
      return {
        a: $data.selectIndex == index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.select(item.pagePath, index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c497a889"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/tabBar/tabBar.vue"]]);
wx.createComponent(Component);
