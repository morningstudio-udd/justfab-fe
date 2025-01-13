import { $api } from "@/plugins/axios";
import { store } from "@store";
import { $ability } from "@/plugins/casl";

const authStore = useAuthStore(store);

export const refreshToken = async () => {
  try {
    authStore.token = null;
    return "";
  } catch (error) {
    authStore.token = null;
    $ability.update("GUEST");
    console.log(error);
    throw error.response.data || error;
  }
};
