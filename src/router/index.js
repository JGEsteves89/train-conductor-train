import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/views/HomeView.vue";
import Test1View from "@/views/Test1View.vue";
import Test2View from "@/views/Test2View.vue";
import Test3View from "@/views/Test3View.vue";

Vue.use(Router);

export default new Router({
  mode: "hash", // important for static sites on GitHub Pages
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/test1",
      name: "Test1",
      component: Test1View,
    },
    {
      path: "/test2",
      name: "Test2",
      component: Test2View,
    },
    {
      path: "/test3",
      name: "Test3",
      component: Test3View,
    },
  ],
});
