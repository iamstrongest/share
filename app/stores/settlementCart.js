import { defineStore } from 'pinia'

export const settlementCartStore = defineStore('settlementCart', {
  // other options...
   state: () => {
      return {
       
       settlementList:[]
      }
    },
})