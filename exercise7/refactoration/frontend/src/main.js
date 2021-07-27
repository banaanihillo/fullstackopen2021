import Vue from 'vue'
import App from './App.vue'
import store from "./store/store"
import router from "./router/router"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// Clear the console on reload
if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept()

  module.hot.addStatusHandler((status) => {
    if (status === "prepare") {
      window.console.clear()
    }
  })
}
