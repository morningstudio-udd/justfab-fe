import { cookies } from "@/plugins/useCookies";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userData = ref(null);
  const userAbilityRules = ref(
    USER_ABILITY_RULES[cookies.get("user_role") || "GUEST"]
  );

  watch(
    () => userData.value?.role,
    (newRole) => {
      console.log("newRole", newRole);
      if (newRole) {
        cookies.set("user_role", newRole, { path: "/", maxAge: 60 * 60 * 24 });
        userAbilityRules.value = USER_ABILITY_RULES[newRole];
      } else {
        userAbilityRules.value = USER_ABILITY_RULES.GUEST;
      }
    },
    { immediate: true }
  );

  return {
    userData,
    userAbilityRules,
  };
});
