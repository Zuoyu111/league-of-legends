import VueRouter from "vue-router";

import Home from "@/components/Home";
import Main from "@/views/Main"

const router = new VueRouter({

  routes: [
    { path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: Home,
          component: Home
        }
      ]
    },
  ]




})

export default router