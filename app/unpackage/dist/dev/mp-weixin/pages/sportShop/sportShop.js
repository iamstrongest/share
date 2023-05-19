"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_equipmentDetail = require("../../stores/equipmentDetail.js");
const stores_person = require("../../stores/person.js");
if (!Array) {
  const _easycom_tabBar2 = common_vendor.resolveComponent("tabBar");
  _easycom_tabBar2();
}
const _easycom_tabBar = () => "../../components/tabBar/tabBar.js";
if (!Math) {
  (navSearch + EquipmentCard + _easycom_tabBar)();
}
const EquipmentCard = () => "../../components/common/EquipmentCard.js";
const navSearch = () => "../../components/navBar/navSearch.js";
const _sfc_main = {
  __name: "sportShop",
  setup(__props) {
    stores_person.personStore();
    const useDetailCartStore = stores_equipmentDetail.detailCartStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const sort = common_vendor.ref([]);
    const selectIndex = common_vendor.ref(0);
    const selectType = common_vendor.ref([]);
    const init = () => {
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/types`,
        // header: {
        //    'content-type': 'application/json;charset:utf-8'
        //    },
        success(res) {
          sort.value = res.data.data;
          changColor(0, sort.value[0]);
        }
      });
    };
    const changColor = (index, type) => {
      selectIndex.value = index;
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/type`,
        data: {
          type
        },
        success(res) {
          selectType.value = res.data.data;
        }
      });
    };
    const goDetail = (equipment) => {
      useDetailCartStore.detail = equipment;
      common_vendor.index.navigateTo({
        url: `/pages/details/details`
      });
    };
    init();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          nav_text: "租借室",
          show_back: false
        }),
        b: common_vendor.f(sort.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index == selectIndex.value ? 1 : "",
            c: common_vendor.o(($event) => changColor(index, item))
          };
        }),
        c: common_vendor.f(selectType.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => goDetail(item), index),
            c: "da629555-1-" + i0,
            d: common_vendor.p({
              equipment: item,
              style_width: 100
            })
          };
        }),
        d: common_vendor.o((...args) => _ctx.getMore && _ctx.getMore(...args)),
        e: common_vendor.p({
          propsIndex: 0
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da629555"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/sportShop/sportShop.vue"]]);
wx.createPage(MiniProgramPage);
