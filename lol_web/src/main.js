import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "@/router";

import axios from "axios";

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import './scss/style.scss'
import './assets/iconfont/iconfont.css'


Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
