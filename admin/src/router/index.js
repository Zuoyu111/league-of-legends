import VueRouter from "vue-router";
import HomeView from "@/pages/HomeView";

import CategoryEdit from "@/pages/CategoryEdit";
import CategoryList from "@/pages/CategoryList";

import ItemEdit from "@/pages/ItemEdit";
import ItemList from "@/pages/ItemList";

import HeroEdit from "@/pages/HeroEdit";
import HeroList from "@/pages/HeroList";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
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

      ],
    },
  ],
});

export default router;
