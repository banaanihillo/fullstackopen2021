import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import store from "./store/store"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Clear the console on reload
if (module.hot) {
  module.hot.accept()

  module.hot.addStatusHandler((status) => {
    if (status === "prepare") {
      console.clear()
    }
  })
}
