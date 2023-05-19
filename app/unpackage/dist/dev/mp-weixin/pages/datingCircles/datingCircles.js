"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const stores_datingCircle = require("../../stores/datingCircle.js");
const navBarBatingCircle = () => "../../components/navBar/navBarBatingCircle.js";
const Publish = () => "../../components/datingCircle/Publish.js";
const Landlord = () => "../../components/datingCircle/Landlord.js";
const _sfc_main = {
  setup() {
    const useDatingCircleStore = stores_datingCircle.datingCircleStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    let statusBarHeight = common_vendor.ref();
    let length = common_vendor.ref(0);
    let page = common_vendor.ref(1);
    const landlordData = common_vendor.ref([]);
    stores_person.personStore();
    statusBarHeight.value = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
    statusBarHeight.value = statusBarHeight.value + 50;
    const getLandlord = () => {
      common_vendor.index.request({
        method: "GET",
        url: `${proxy.baseUrl}/landlord`,
        data: {
          page: page.value
        },
        success(res) {
          length.value = res.data.length;
          landlordData.value = [...landlordData.value, ...res.data.data];
          page.value++;
        }
      });
    };
    getLandlord();
    if (useDatingCircleStore.isPublishLandlord) {
      getLandlord();
      useDatingCircleStore.isPublishLandlord = false;
    }
    return {
      useDatingCircleStore,
      statusBarHeight,
      landlordData,
      length,
      page,
      getLandlord
    };
  },
  components: {
    navBarBatingCircle,
    Landlord,
    Publish
  },
  onReachBottom() {
    if (this.landlordData.length < this.length) {
      this.getLandlord();
    } else {
      return common_vendor.index.showToast({
        title: "暂时没有更多数据了~"
      });
    }
  }
};
if (!Array) {
  const _component_navBarBatingCircle = common_vendor.resolveComponent("navBarBatingCircle");
  const _component_Landlord = common_vendor.resolveComponent("Landlord");
  const _component_Publish = common_vendor.resolveComponent("Publish");
  const _easycom_tabBar2 = common_vendor.resolveComponent("tabBar");
  (_component_navBarBatingCircle + _component_Landlord + _component_Publish + _easycom_tabBar2)();
}
const _easycom_tabBar = () => "../../components/tabBar/tabBar.js";
if (!Math) {
  _easycom_tabBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      show_back: false,
      margin_height: $setup.statusBarHeight,
      nav_text: "谈论圈",
      right_text: "发布",
      img_url: "@/static/images/publish.png"
    }),
    b: common_vendor.f($setup.landlordData, (item, index, i0) => {
      return {
        a: index,
        b: "351f0672-1-" + i0,
        c: common_vendor.p({
          image_width: 100,
          image_height: 100,
          isLandlord: true,
          margin_left: 0,
          font_style: 900,
          data: item
        })
      };
    }),
    c: $setup.useDatingCircleStore.isShowPublish
  }, $setup.useDatingCircleStore.isShowPublish ? {} : {}, {
    d: common_vendor.p({
      propsIndex: 3
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/datingCircles/datingCircles.vue"]]);
wx.createPage(MiniProgramPage);
