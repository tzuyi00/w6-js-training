// node_module 需先排於前面 沒有.屬外部資源
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jquery from 'jquery'
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend
} from 'vee-validate' // 驗證套件
import * as rules from 'vee-validate/dist/rules' // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json' // 語系檔案
import 'bootstrap'
import clipboard from 'clipboard'
import 'animate.css'
import WOW from 'wow.js/dist/wow'
// Bus
import './bus'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'
import currencyFilter from './filters/currency' // filter 千分位

window.$ = jquery
Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)

// 套件加入到Vue的藍圖內(加入到原型內)，為方法，需用呼叫方式取用
Vue.use(VueAxios, axios)

// Loading元件，全域註冊，為屬性，比較簡易
Vue.component('Loading', Loading)

// vee-validate 所有驗證規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

// 自定義設定檔案，錯誤的 className
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

// 載入自訂規則包
localize('tw', zhTW) // 中文語系

// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', ValidationObserver)
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', ValidationProvider)

Vue.prototype.Clipboard = clipboard

new WOW({ live: true }).init()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
