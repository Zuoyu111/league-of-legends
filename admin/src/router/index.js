import VueRouter from "vue-router";
import HomeView from "@/pages/HomeView";

import CategoryEdit from "@/pages/CategoryEdit";
import CategoryList from "@/pages/CategoryList";

import ItemEdit from "@/pages/ItemEdit";
import ItemList from "@/pages/ItemList";

import HeroEdit from "@/pages/HeroEdit";
import HeroList from "@/pages/HeroList";

import ArticleList from "@/pages/ArticleList";
import ArticleEdit from "@/pages/ArticleEdit";

import AdList from "@/pages/AdList";
import AdEdit from "@/pages/AdEdit";

import AdminUserList from "@/pages/AdminUserList";
import AdminUserEdit from "@/pages/AdminUserEdit";

import Login from "@/pages/Login";


const router = new VueRouter({
  routes: [
    { path: '/login',name: 'login', component: Login,meta: { isPublic: true }},
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [

        //分类管理相关路由
        {
          path: "/categories/create",
          component: CategoryEdit,
        },
        {
          path: "/categories/edit/:id",
          component: CategoryEdit,
          props: true,
        },
        {
          path: "/categories/list",
          component: CategoryList,
        },

        //装备管理相关路由
        {
          path: "/items/create",
          component: ItemEdit,
        },
        {
          path: "/items/edit/:id",
          component: ItemEdit,
          props: true,
        },
        {
          path: "/items/list",
          component: ItemList,
        },


        //英雄管理相关路由
        {
          path: "/heroes/create",
          component: HeroEdit,
        },
        {
          path: "/heroes/edit/:id",
          component: HeroEdit,
          props: true,
        },
        {
          path: "/heroes/list",
          component: HeroList,
        },

        //文章管理相关路由
        {
          path: "/articles/create",
          component: ArticleEdit,
        },
        {
          path: "/articles/edit/:id",
          component: ArticleEdit,
          props: true,
        },
        {
          path: "/articles/list",
          component: ArticleList,
        },

        //广告位管理相关路由
        {
          path: "/ads/create",
          component: AdEdit,
        },
        {
          path: "/ads/edit/:id",
          component: AdEdit,
          props: true,
        },
        {
          path: "/ads/list",
          component: AdList,
        },

        //管理员管理相关路由        
        {
          path: "/admin_users/create",
          component: AdminUserEdit,
        },
        {
          path: "/admin_users/edit/:id",
          component: AdminUserEdit,
          props: true,
        },
        {
          path: "/admin_users/list",
          component: AdminUserList,
        },

      ],
    },
  ],
});

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !localStorage.token ) {
    return next('/login')
  }
  next()
})

export default router;
