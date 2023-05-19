import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const collectCartStore = defineStore('collectCart', {
  // other options...
   state: () => {
      return {
        //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
		selectIdList:[],
		// 收藏夹器材的详细信息
       selectEquipmentList:[],
	   testId:0,
	   isShowOprate:false,
	   clickList:{
		   idList:[],
		   payNameList:[],
		   numList:[],
		   prices:[],
	   }
      }
    },
	getters:{
		judgeId:(state)=>(id)=>state.selectIdList.includes(id),
		// judgeSelectIdListLength:(state)=>{
		// 	console.log(state.selectIdList.length);
		// 	return state.selectIdList.length>0
		// }
	},
	actions:{
		init(id){
			if(id===undefined) return;
			uni.request({
				method:'GET',
				url:"http://127.0.0.1:3000/api/getCart",
				// url:"http://192.168.137.1:3000/api/getCart",
				// url:"http://47.106.134.6/:3003/api/getCart",
				data:{
					id,
				},
				success(res) {
					this.selectIdList=res.data.selectId;
					this.selectEquipmentList=res.data.data;
				}
			})
		}
	}
})