/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import NotFound from "@/pages/not-found.vue";
import SignIn from "../pages/sign-in.vue";
import SignUp from "../pages/sign-up.vue";
import { useAuthStore } from "../stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignIn,
      meta: { public: true }
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp,
      meta: { public: true }
    },
    ...setupLayouts(routes),
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.public) {
    return next();
  }

  const token = authStore.token;

  if (!token) {
    console.warn("Token ausente ou expirado. Redirecionando para login.");
    return next("/sign-in");
  }

  next();
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
