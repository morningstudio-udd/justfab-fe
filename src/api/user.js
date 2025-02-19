import { $api } from "@/plugins/axios";
import { cookies } from "@/plugins/useCookies";
import { store } from "@store";
import { updateAbility } from "@plugins/casl/casl";
import { $ability } from "@/plugins/casl";

const authStore = useAuthStore(store);
const userStore = useUserStore(store);

const API = {
  user: {
    info: "/user/info",
    refLink: "/referral/link",
  },
};

export const getUserInfo = async () => {
  try {
    const res = await $api.get(API.user.info);

    if (res.status === 200 && res.data) {
      userStore.userData = res.data;

      // await updateAbility(res.data.role || "GUEST");

      // console.log("updateAbility done", $ability);

      $ability.update(USER_ABILITY_RULES[res.data.role] || "GUEST");

      console.log("done", $ability);

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

export const getReferralLink = async () => {
  try {
    const res = await $api.get(API.user.refLink);

    if (res.status === 200 && res.data) {
      userStore.setRefLink(res.data.referralLink);
    }

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};
