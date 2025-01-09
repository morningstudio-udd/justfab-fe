import { cookies } from "@/plugins/useCookies";
import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", () => {
  const assetsManagerDialog = ref(false);

  return {
    assetsManagerDialog,
  };
});
