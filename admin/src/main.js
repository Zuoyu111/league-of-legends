import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style.css'

import http from "./http"


import router from "@/router";



Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uplaodUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
