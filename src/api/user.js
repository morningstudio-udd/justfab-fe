import { $api } from "@/plugins/axios";

export const getUserInfo = async () => {
  try {
    const res = await $api.get(`/user/info`, {});

    return res.data;
  } catch (e) {
    throw e;
  }
};
