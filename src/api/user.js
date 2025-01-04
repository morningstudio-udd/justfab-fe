import { $api } from "@/plugins/axios";
import { store } from "@store";

const authStore = useAuthStore(store);
const userStore = useUserStore(store);

export const getUserInfo = async () => {
  try {
    const res = await $api.get(`/user/info`);
    console.log(res.status, res.data);

    if (res.status === 200 && res.data) {
      userStore.userData = res.data;
    }

    return res.data;
  } catch (e) {
    userStore.userData = null;
    console.log(e);
    throw e;
  }
};
