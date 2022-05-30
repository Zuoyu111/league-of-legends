import VueRouter from "vue-router";
import HomeView from "@/pages/HomeView";
import CategoryEdit from "@/pages/CategoryEdit";
import CategoryList from "@/pages/CategoryList";


const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/categories/list',
          component: CategoryList
        },

      ]
    }
  ]
})

export default router