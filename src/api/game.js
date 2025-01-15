import { $api } from "@/plugins/axios";

const API = {
  inventory: {
    user: "/inventory/:userId",
    add: "/inventory/:userId/add",
    remove: "/inventory/:userId/remove",
  },
};

export const getUserInventory = async (userId) => {
  try {
    const url = getApiPath(API.inventory.user, { userId: userId });
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const addItemToInventory = async (userId, payload) => {
  try {
    const url = getApiPath(API.inventory.add, { userId: userId });
    const res = await $api.post(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const removeItemFromInventory = async (userId, payload) => {
  try {
    const url = getApiPath(API.inventory.remove, { userId: userId });
    const res = await $api.post(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};
