import { cookies } from "@/plugins/useCookies";
import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", () => {
  const assetsManagerDialog = ref(false);
  const allItems = ref([]);

  const getItemById = (id) => {
    if (!allItems.value || !allItems.value.length) return null;
    return allItems.value.find((item) => item._id === id);
  };

  return {
    assetsManagerDialog,
    allItems,
    getItemById,
  };
});
