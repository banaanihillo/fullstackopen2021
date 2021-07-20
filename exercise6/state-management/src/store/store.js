import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    positive: 0,
    neutral: 0,
    negative: 0
  },
  mutations: {
    increment(state, typeOfFeedback) {
      state[typeOfFeedback]++
    },
    doNothing() {
      console.log("Nothing done")
    }
  },
  actions: {

  },
  modules: {
    
  },
  getters: {
    
  }
})
