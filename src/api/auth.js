import { $api } from "@/plugins/axios";
import { cookies } from "@/plugins/useCookies";
import { store } from "@store";
import { $ability } from "@/plugins/casl";
import { getApiPath } from "@/utils/helpers";

// const authStore = useAuthStore(store);

const API = {
  user: {
    auth: "/user/auth",
  },
};

export const refreshToken = async () => {
  try {
    // authStore.token = null;
    $ability.update("GUEST");
    cookies.remove("token");
    cookies.remove("role");
    return "";
  } catch (error) {
    // authStore.token = null;
    $ability.update("GUEST");
    cookies.remove("token");
    cookies.remove("role");
    console.log(error);
    throw error.response.data || error;
  }
};

export const authTelegram = async (payload) => {
  try {
    const res = await $api.post(
      API.user.auth,
      {
        initData: payload,
      },
      {
        useAuthToken: false,
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};
