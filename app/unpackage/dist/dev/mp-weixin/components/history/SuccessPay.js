"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const utils_useDate = require("../../utils/useDate.js");
const _sfc_main = {
  __name: "SuccessPay",
  setup(__props) {
    const usePersonStore = stores_person.personStore();
    const data = common_vendor.ref([]);
    data.value = usePersonStore.fullPayList;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.value.length == 0
      }, data.value.length == 0 ? {} : {
        b: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.payName),
            b: common_vendor.t(item.nums),
            c: common_vendor.t(item.prices),
            d: common_vendor.t(common_vendor.unref(utils_useDate.useDate)(item.payTime)),
            e: common_vendor.t(common_vendor.unref(utils_useDate.useDate)(item.returnTime)),
            f: common_vendor.t(item.cost),
            g: index
          };
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9002f96e"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/history/SuccessPay.vue"]]);
wx.createComponent(Component);
