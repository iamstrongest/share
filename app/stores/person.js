import {
	defineStore
} from 'pinia'

export const personStore = defineStore('person', {
	// other options...
	state: () => {
		return {
			// 所有这些属性都将自动推断其类型
			// baseUrl:"http://127.0.0.1:3000/api",
			// baseUrl:"http://192.168.137.1:3000/api",
			// baseUrl:"http://47.106.134.6/:3003/api",
			authorization:"",
			personData:{},
			anotherData:{},
			fullPayList:[],
			partPayList:[]
           }
}	
})