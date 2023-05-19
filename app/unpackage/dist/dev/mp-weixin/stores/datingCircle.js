"use strict";
const common_vendor = require("../common/vendor.js");
const datingCircleStore = common_vendor.defineStore("datingCircle", {
  // other options...
  state: () => {
    return {
      // 发送的信息，需要跨组件传输
      message: "",
      // 是否展示组件
      isShowPublish: false,
      // type,1表示发布楼主类型，2表示发布回复者类型
      type: 0,
      reply_id: "",
      floor: "",
      isPublishLandlord: false,
      isPublishReply: false
    };
  },
  getters: {
    retutnIsPublishLandlord: (state) => state.isPublishLandlord,
    retutnIsPublishReply: (state) => state.isPublishLandlord
  }
});
exports.datingCircleStore = datingCircleStore;
