// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'

Vue.prototype.axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': require('./common/lang/zh'),
    'en-US': require('./common/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
