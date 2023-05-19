"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_equipmentDetail = require("../../stores/equipmentDetail.js");
const stores_person = require("../../stores/person.js");
if (!Math) {
  EquipmentCard();
}
const EquipmentCard = () => "../../components/common/EquipmentCard.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    stores_person.personStore();
    const useDetailCartStore = stores_equipmentDetail.detailCartStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const data = common_vendor.ref([]);
    const ipt = common_vendor.ref("");
    const search = () => {
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/search`,
        data: {
          name: ipt.value
        },
        success(res) {
          res.data.code == 0 ? data.value = res.data.data : common_vendor.index.showToast({
            title: `${res.data.message}`
          });
        }
      });
    };
    const goDetail = (equipment) => {
      useDetailCartStore.detail = equipment;
      common_vendor.index.navigateTo({
        url: `/pages/details/details`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ipt.value,
        b: common_vendor.o(($event) => ipt.value = $event.detail.value),
        c: common_vendor.o(search),
        d: data.value.length > 0
      }, data.value.length > 0 ? {
        e: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => goDetail(item), index),
            c: "c10c040c-0-" + i0,
            d: common_vendor.p({
              equipment: item,
              style_width: 1e3
            })
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
