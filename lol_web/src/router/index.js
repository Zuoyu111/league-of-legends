import VueRouter from "vue-router";

import Home from "@/components/Home";
import Main from "@/views/Main"
import Article from "@/views/Article";
import Hero from "@/views/Hero";


const router = new VueRouter({

  routes: [
    { path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: Home,
          component: Home
        },
        {
          path: '/article/:id',
          name:'Article',
          component: Article,
          props: true
        }
      ]
    },
    {
      path:'/heroes/:id',
      name: "Hero",
      component: Hero,
      props: true
    }
  ]




})

export default router