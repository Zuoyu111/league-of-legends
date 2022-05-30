import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView";
import CategoryEdit from "@/views/CategoryEdit";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path:'/categories/create',
        component: CategoryEdit
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
