import { cookies } from "@/plugins/useCookies";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", () => {
  const userStore = useUserStore();

  const token = computed({
    get: () => cookies.get("token") || null,
    set: (val) =>
      cookies.set("token", val, { path: "/", maxAge: 60 * 60 * 24 }), // 24 hours
  });

  const isLoggedIn = computed(
    () =>
      !!(
        cookies.get("user_role") &&
        cookies.get("token") &&
        Object.keys(userStore.userData)?.length
      )
  );

  return {
    token,
    isLoggedIn,
  };
});
