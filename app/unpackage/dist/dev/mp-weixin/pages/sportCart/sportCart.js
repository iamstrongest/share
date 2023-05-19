"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_collectCart = require("../../stores/collectCart.js");
const stores_person = require("../../stores/person.js");
const CollectionEquipment = () => "../../components/common/CollectionEquipment.js";
const navBarCollectCart = () => "../../components/navBar/navBarCollectCart.js";
const _sfc_main = {
  setup() {
    const useCollectCartStore = stores_collectCart.collectCartStore();
    const usePersonStore = stores_person.personStore();
    let statusBarHeight = common_vendor.ref();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    common_vendor.index.request({
      method: "POST",
      url: `${proxy.baseUrl}/validate`,
      // uni.setStorageSync('authorization', res.data.token);
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
        }
      }
    });
    const init = (id) => {
      if (id === void 0)
        return;
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/getCart`,
        data: {
          id
        },
        success(res) {
          useCollectCartStore.selectIdList = res.data.selectId;
          useCollectCartStore.selectEquipmentList = res.data.data;
        }
      });
    };
    const selectAll = () => {
      useCollectCartStore.clickList.idList = useCollectCartStore.selectEquipmentList.map((item, index) => item.id);
      useCollectCartStore.clickList.idList.forEach((item, index) => {
        const detail = useCollectCartStore.selectEquipmentList.filter((equipment) => item == equipment.id);
        useCollectCartStore.clickList.payNameList.push(detail[0].name);
        useCollectCartStore.clickList.prices.push(detail[0].price);
        useCollectCartStore.clickList.numList.push(0);
      });
    };
    const deleteSelect = () => {
      common_vendor.index.request({
        method: "DELETE",
        url: `${proxy.baseUrl}/delete/cartEquipment`,
        data: {
          user_id: usePersonStore.personData.id,
          equipments: useCollectCartStore.clickList.idList
        },
        success(res) {
          res.data.code == 0 ? common_vendor.index.showToast({
            title: `${res.data.message}`
          }) : "";
          useCollectCartStore.isShowOprate = false;
          useCollectCartStore.clickList = {
            idList: [],
            payNameList: [],
            numList: [],
            prices: []
          };
          common_vendor.index.navigateTo({
            url: "/pages/sportCart/sportCart"
          });
        }
      });
    };
    const submit = () => {
      common_vendor.index.request({
        method: "POST",
        url: `${proxy.baseUrl}/create/order`,
        data: {
          user_id: usePersonStore.personData.id,
          phone: usePersonStore.personData.phone,
          payName: useCollectCartStore.clickList.payNameList.join("-"),
          nums: useCollectCartStore.clickList.numList.join("-"),
          prices: useCollectCartStore.clickList.prices.join("-"),
          ids: useCollectCartStore.clickList.idList.join("-")
        },
        success(res) {
          common_vendor.index.showToast({
            title: `${res.data.message}`
          });
          useCollectCartStore.isShowOprate = false;
          useCollectCartStore.clickList = {
            idList: [],
            payNameList: [],
            numList: [],
            prices: []
          };
          init(usePersonStore.personData.id);
        }
      });
    };
    init(usePersonStore.personData.id);
    statusBarHeight.value = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
    statusBarHeight.value = statusBarHeight.value + 50;
    return {
      useCollectCartStore,
      usePersonStore,
      init,
      selectAll,
      deleteSelect,
      submit
    };
  },
  components: {
    CollectionEquipment,
    navBarCollectCart
  },
  onLoad() {
  }
};
if (!Array) {
  const _component_navBarCollectCart = common_vendor.resolveComponent("navBarCollectCart");
  const _component_CollectionEquipment = common_vendor.resolveComponent("CollectionEquipment");
  const _easycom_tabBar2 = common_vendor.resolveComponent("tabBar");
  (_component_navBarCollectCart + _component_CollectionEquipment + _easycom_tabBar2)();
}
const _easycom_tabBar = () => "../../components/tabBar/tabBar.js";
if (!Math) {
  _easycom_tabBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      show_back: false
    }),
    b: $setup.useCollectCartStore.selectEquipmentList.length > 0
  }, $setup.useCollectCartStore.selectEquipmentList.length > 0 ? {
    c: common_vendor.f($setup.useCollectCartStore.selectEquipmentList, (item, index, i0) => {
      return {
        a: index,
        b: "809b20f8-1-" + i0,
        c: common_vendor.p({
          equipment: item,
          style_width: 1e3
        })
      };
    })
  } : {}, {
    d: $setup.useCollectCartStore.isShowOprate
  }, $setup.useCollectCartStore.isShowOprate ? {
    e: common_vendor.o((...args) => $setup.selectAll && $setup.selectAll(...args)),
    f: common_vendor.o((...args) => $setup.deleteSelect && $setup.deleteSelect(...args)),
    g: common_vendor.o((...args) => $setup.submit && $setup.submit(...args))
  } : {}, {
    h: common_vendor.p({
      propsIndex: 1
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-809b20f8"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/sportCart/sportCart.vue"]]);
wx.createPage(MiniProgramPage);
