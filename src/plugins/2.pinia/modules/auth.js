import { cookies } from "@/plugins/useCookies";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = computed({
    get: () => cookies.get("token") || null,
    set: (val) =>
      cookies.set("token", val, { path: "/", maxAge: 60 * 60 * 24 }), // 24 hours
  });

  return {
    token,
  };
});
