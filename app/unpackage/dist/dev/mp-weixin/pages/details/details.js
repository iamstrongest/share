"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_equipmentDetail = require("../../stores/equipmentDetail.js");
const stores_collectCart = require("../../stores/collectCart.js");
const stores_person = require("../../stores/person.js");
const common_assets = require("../../common/assets.js");
const TextCard = () => "../../components/common/TextCard.js";
const EquipmentCard = () => "../../components/common/EquipmentCard.js";
const _sfc_main = {
  setup() {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    let equipment = common_vendor.reactive({});
    let style_width = 800;
    let data = common_vendor.ref([]);
    let page = common_vendor.ref(1);
    let totalLength = common_vendor.ref();
    const useCollectCartStore = stores_collectCart.collectCartStore();
    const useDetailCartStore = stores_equipmentDetail.detailCartStore();
    const usePersonStore = stores_person.personStore();
    equipment = useDetailCartStore.detail;
    function operate() {
      common_vendor.index.request({
        method: "POST",
        url: `${proxy.baseUrl}/validate`,
        header: {
          authorization: usePersonStore.authorization
        },
        data: {
          phone: usePersonStore.personData.phone
        },
        success(res) {
          if (res.data.code == 401) {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.data.code == 200) {
            usePersonStore.authorization = res.data.token;
            common_vendor.index.request({
              url: `${proxy.baseUrl}/changeCart`,
              method: "POST",
              data: {
                user_id: usePersonStore.personData.id,
                equ_id: equipment.id
              },
              success() {
                common_vendor.index.request({
                  method: "GET",
                  url: `${proxy.baseUrl}/getCart`,
                  data: {
                    id: usePersonStore.personData.id
                  },
                  success(res2) {
                    useCollectCartStore.selectIdList = res2.data.selectId;
                    useCollectCartStore.selectEquipmentList = res2.data.data;
                  }
                });
              }
            });
          }
        }
      });
    }
    function getMore() {
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/random`,
        data: {
          page: page.value
        },
        success(res) {
          totalLength.value = res.data.length;
          data.value = [...data.value, ...res.data.data];
          page.value++;
        }
      });
    }
    function goDetail(item) {
      useDetailCartStore.detail = item;
      common_vendor.index.navigateTo({
        url: `/pages/details/details`
      });
    }
    function goCollectUrl() {
      common_vendor.index.request({
        method: "POST",
        url: `${proxy.baseUrl}/validate`,
        header: {
          authorization: usePersonStore.authorization
        },
        data: {
          phone: usePersonStore.personData.phone
        },
        success(res) {
          if (res.data.code == 401) {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.data.code == 200) {
            usePersonStore.authorization = res.data.token;
            common_vendor.index.navigateTo({
              url: "/pages/sportCart/sportCart"
            });
          }
        }
      });
    }
    getMore();
    return {
      useCollectCartStore,
      useDetailCartStore,
      equipment,
      style_width,
      totalLength,
      data,
      operate,
      getMore,
      goDetail,
      goCollectUrl
    };
  },
  components: {
    TextCard,
    EquipmentCard
  },
  onLoad() {
  },
  onReachBottom() {
    if (this.data.length < this.totalLength) {
      this.getMore();
    } else {
      common_vendor.index.showToast({
        title: "暂无更多数据~"
      });
    }
  }
};
if (!Array) {
  const _component_TextCard = common_vendor.resolveComponent("TextCard");
  const _component_EquipmentCard = common_vendor.resolveComponent("EquipmentCard");
  (_component_TextCard + _component_EquipmentCard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.equipment.imageUrl,
    b: common_vendor.t($setup.equipment.name),
    c: common_vendor.t($setup.equipment.type),
    d: common_vendor.t($setup.equipment.price),
    e: common_vendor.t($setup.equipment.unit),
    f: common_vendor.t($setup.equipment.restNum),
    g: common_vendor.t($setup.equipment.description),
    h: !$setup.useCollectCartStore.selectIdList.includes($setup.equipment.id)
  }, !$setup.useCollectCartStore.selectIdList.includes($setup.equipment.id) ? {
    i: common_assets._imports_0$1
  } : {
    j: common_assets._imports_1$1
  }, {
    k: common_vendor.o((...args) => $setup.operate && $setup.operate(...args)),
    l: common_vendor.o((...args) => $setup.goCollectUrl && $setup.goCollectUrl(...args)),
    m: common_vendor.p({
      color: "red"
    }),
    n: common_vendor.f($setup.data, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $setup.goDetail(item), index),
        c: "4b799d2f-1-" + i0,
        d: common_vendor.p({
          equipment: item,
          style_width: $setup.style_width
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4b799d2f"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/details/details.vue"]]);
wx.createPage(MiniProgramPage);
