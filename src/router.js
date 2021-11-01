import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

import Index from "./pages/Index.vue";
import Upload from "./pages/Upload.vue";
import Explorer from "./pages/Explorer.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index },
    {
      path: "/upload",
      component: Upload,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/explorer", component: Explorer },
    { path: "/:notFound", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.userIsAuthenticated) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
