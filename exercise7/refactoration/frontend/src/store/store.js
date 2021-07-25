import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let notificationTimeoutID = null

export default new Vuex.Store({
  state: {
    notification: null,
    isError: false
  },
  mutations: {
    SET_NOTIFICATION(state, payload) {
      clearTimeout(notificationTimeoutID)
      state.notification = payload.notification
      state.isError = payload.isError || false
      notificationTimeoutID = setTimeout(
        () => {
          state.notification = null
          state.isError = false
        },
        payload.timeoutDuration || 5000
      )
    },
    DISMISS_NOTIFICATION(state) {
      state.notification = null
      state.isError = false
    }
  },
  actions: {},
  modules: {},
  getters: {}
})
