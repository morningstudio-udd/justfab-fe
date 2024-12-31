import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { routes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import { staticRoutes, redirects } from "./static";

const isHash =
  import.meta.env.VITE_USE_HASH === true ||
  import.meta.env.VITE_USE_HASH === "true";


const router = createRouter({
  history: isHash
    ? createWebHashHistory()
    : createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 60 };
    }
    return { top: 0 };
  },
  // routes: [
  //   ...redirects,
  //   ...[...routes, ...staticRoutes].map((route) => recursiveLayouts(route)),
  // ],
  routes: [...redirects, ...setupLayouts([...routes, ...staticRoutes])],
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(async (to) => {
  console.log("to: ", to);
});

export { router };
export default function (app) {
  app.use(router);
}
