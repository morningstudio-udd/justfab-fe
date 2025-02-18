import { $api } from "@/plugins/axios";
import { cookies } from "@/plugins/useCookies";
import { store } from "@store";
import { $ability } from "@/plugins/casl";

const authStore = useAuthStore(store);

export const refreshToken = async () => {
  try {
    authStore.token = null;
    $ability.update("GUEST");
    cookies.remove("token");
    cookies.remove("role");
    return "";
  } catch (error) {
    authStore.token = null;
    $ability.update("GUEST");
    cookies.remove("token");
    cookies.remove("role");
    console.log(error);
    throw error.response.data || error;
  }
};
