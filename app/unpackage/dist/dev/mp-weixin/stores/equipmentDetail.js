"use strict";
const common_vendor = require("../common/vendor.js");
const detailCartStore = common_vendor.defineStore("detail", {
  // other options...
  state: () => {
    return {
      //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
      detail: {}
    };
  }
});
exports.detailCartStore = detailCartStore;
