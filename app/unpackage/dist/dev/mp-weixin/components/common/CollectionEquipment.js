"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_collectCart = require("../../stores/collectCart.js");
const _sfc_main = {
  __name: "CollectionEquipment",
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
    const props = __props;
    const useCollectCartStore = stores_collectCart.collectCartStore();
    const num = common_vendor.ref(0);
    const changeChecked = () => {
      if (useCollectCartStore.clickList.idList.includes(props.equipment.id)) {
        const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
        useCollectCartStore.clickList.idList.splice(index, 1);
        useCollectCartStore.clickList.payNameList.splice(index, 1);
        useCollectCartStore.clickList.numList.splice(index, 1);
        useCollectCartStore.clickList.prices.splice(index, 1);
      } else {
        useCollectCartStore.clickList.idList.push(props.equipment.id);
        useCollectCartStore.clickList.prices.push(props.equipment.price);
        useCollectCartStore.clickList.payNameList.push(props.equipment.name);
        useCollectCartStore.clickList.numList.push(num.value);
      }
    };
    const sub = () => {
      num.value--;
      const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
      useCollectCartStore.clickList.numList[index] = num.value;
    };
    const add = () => {
      num.value < props.equipment.restNum ? num.value++ : "";
      const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
      useCollectCartStore.clickList.numList[index] = num.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(useCollectCartStore).isShowOprate
      }, common_vendor.unref(useCollectCartStore).isShowOprate ? {
        b: common_vendor.unref(useCollectCartStore).clickList.idList.includes(__props.equipment.id),
        c: common_vendor.o(changeChecked)
      } : {}, {
        d: __props.equipment.imageUrl,
        e: common_vendor.t(__props.equipment.name),
        f: common_vendor.t(__props.equipment.type),
        g: common_vendor.t(__props.equipment.price),
        h: common_vendor.t(__props.equipment.unit),
        i: common_vendor.t(__props.equipment.restNum),
        j: common_vendor.unref(useCollectCartStore).isShowOprate
      }, common_vendor.unref(useCollectCartStore).isShowOprate ? common_vendor.e({
        k: num.value > 0
      }, num.value > 0 ? {
        l: common_assets._imports_0$2
      } : {}, {
        m: common_vendor.o(sub),
        n: common_vendor.t(num.value),
        o: common_assets._imports_1$2,
        p: common_vendor.o(add)
      }) : {}, {
        q: +__props.style_height + "rpx",
        r: +__props.style_width + "%"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-564bb798"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/CollectionEquipment.vue"]]);
wx.createComponent(Component);
