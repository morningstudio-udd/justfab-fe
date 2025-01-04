import { $api } from "@/plugins/axios";
import { store } from "@store";

const authStore = useAuthStore(store);

export const refreshToken = async () => {
  try {
    authStore.token = null;
    return "";
  } catch (e) {
    authStore.token = null;
    console.log(e);
    throw e;
  }
};
