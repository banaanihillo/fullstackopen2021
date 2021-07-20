require("jsdom-global")()
window.Date = Date
const hooks = require("require-extension-hooks")
const Vue = require("vue")

Vue.config.productionTip = false
Vue.config.devtools = false

hooks("vue").plugin("vue").push()
hooks(["vue", "js"])
  .exclude(({filename}) => filename.match(/\/node_modules\//))
  .plugin("babel")
  .push()
