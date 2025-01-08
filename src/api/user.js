import { $api } from "@/plugins/axios";
import { cookies } from "@/plugins/useCookies";
import { store } from "@store";

const authStore = useAuthStore(store);
const userStore = useUserStore(store);

export const getUserInfo = async () => {
  try {
    const res = await $api.get(`/user/info`);

    if (res.status === 200 && res.data) {
      userStore.userData = res.data;

      // cookies.set("user_role", res.data.role, {
      //   path: "/",
      //   maxAge: 60 * 60 * 24, // 24 hours
      // });
    }

    return res.data;
  } catch (error) {
    // userStore.userData = null;

    console.log(error);
    throw error.response?.data || error;
  }
};
