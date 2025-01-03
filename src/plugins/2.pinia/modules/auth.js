import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", () => {
  const token = useLocalStorage("token", "")

  return {
    token
  };
});
