"use strict";
const common_vendor = require("../common/vendor.js");
const collectCartStore = common_vendor.defineStore("collectCart", {
  // other options...
  state: () => {
    return {
      //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
      selectIdList: [],
      // 收藏夹器材的详细信息
      selectEquipmentList: [],
      testId: 0,
      isShowOprate: false,
      clickList: {
        idList: [],
        payNameList: [],
        numList: [],
        prices: []
      }
    };
  },
  getters: {
    judgeId: (state) => (id) => state.selectIdList.includes(id)
    // judgeSelectIdListLength:(state)=>{
    // 	console.log(state.selectIdList.length);
    // 	return state.selectIdList.length>0
    // }
  },
  actions: {
    init(id) {
      if (id === void 0)
        return;
      common_vendor.index.request({
        method: "GET",
        url: "http://127.0.0.1:3000/api/getCart",
        // url:"http://192.168.137.1:3000/api/getCart",
        // url:"http://47.106.134.6/:3003/api/getCart",
        data: {
          id
        },
        success(res) {
          this.selectIdList = res.data.selectId;
          this.selectEquipmentList = res.data.data;
        }
      });
    }
  }
});
exports.collectCartStore = collectCartStore;
