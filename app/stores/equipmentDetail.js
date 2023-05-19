import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const detailCartStore = defineStore('detail', {
  // other options...
   state: () => {
      return {
        //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
		detail:{}
      }
    },
})