"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_person = require("../../stores/person.js");
const _sfc_main = {
  __name: "payment",
  setup(__props) {
    const usePersonStore = stores_person.personStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    common_vendor.index.request({
      method: "PUT",
      url: `${proxy.baseUrl}/return/order`,
      data: {
        id: usePersonStore.partPayList[0].id,
        user_id: usePersonStore.personData.id,
        payTime: usePersonStore.partPayList[0].payTime,
        prices: usePersonStore.partPayList[0].prices,
        nums: usePersonStore.partPayList[0].nums,
        idList: usePersonStore.partPayList[0].idList
      },
      success(result) {
        common_vendor.index.request({
          method: "GET",
          url: `${proxy.baseUrl}/order`,
          data: {
            user_id: usePersonStore.personData.id
          },
          success(res) {
            usePersonStore.fullPayList = res.data.fullPayList;
            usePersonStore.partPayList = res.data.partPayList;
          }
        });
        common_vendor.index.request({
          method: "GET",
          url: `${proxy.baseUrl}/get`,
          data: {
            id: usePersonStore.personData.id
          },
          success(res) {
            usePersonStore.personData = res.data.data;
            common_vendor.index.showModal({
              title: "温馨提示,点击确定1秒返回租借室,您可以回到历史界面，查看信息",
              content: `${result.data.message}`,
              success() {
                setTimeout(() => {
                  common_vendor.index.navigateTo({
                    url: "/pages/sportShop/sportShop"
                  });
                }, 1e3);
              }
            });
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Front-end/uni-app/uni-project/app/pages/payment/payment.vue"]]);
wx.createPage(MiniProgramPage);
