"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_collectCart = require("../../stores/collectCart.js");
const _sfc_main = {
  __name: "navBarCollectCart",
  props: {
    margin_height: {
      type: Number,
      default: 50
    },
    nav_text: {
      type: String,
      default: "收藏夹"
    },
    right_text: {
      type: String,
      default: "管理"
    },
    show_back: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const useCollectCartStore = stores_collectCart.collectCartStore();
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const change_cart = () => {
      useCollectCartStore.isShowOprate = !useCollectCartStore.isShowOprate;
      if (!useCollectCartStore.isShowOprate) {
        useCollectCartStore.clickList = {
          idList: [],
          payNameList: [],
          numList: [],
          prices: []
        };
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show_back
      }, __props.show_back ? {
        b: common_vendor.o(back)
      } : {}, {
        c: common_vendor.t(__props.nav_text),
        d: !common_vendor.unref(useCollectCartStore).isShowOprate
      }, !common_vendor.unref(useCollectCartStore).isShowOprate ? {
        e: common_vendor.t(__props.right_text)
      } : {}, {
        f: !common_vendor.unref(useCollectCartStore).isShowOprate
      }, !common_vendor.unref(useCollectCartStore).isShowOprate ? {
        g: common_assets._imports_0$3
      } : {
        h: common_assets._imports_1$3
      }, {
        i: common_vendor.o(change_cart),
        j: __props.margin_height + "rpx"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5455963c"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/navBar/navBarCollectCart.vue"]]);
wx.createComponent(Component);
