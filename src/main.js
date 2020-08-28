// node_module 需先排於前面 沒有.屬外部資源
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jquery from 'jquery'
import 'bootstrap'
// Bus
import './bus'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'

window.$ = jquery
Vue.config.productionTip = false

// 套件加入到Vue的藍圖內(加入到原型內)，為方法，需用呼叫方式取用
Vue.use(VueAxios, axios)

// Loading元件，全域註冊，為屬性，比較簡易
Vue.component('Loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
