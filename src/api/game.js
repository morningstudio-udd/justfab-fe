import { $api } from "@/plugins/axios";
import { set } from "@vueuse/core";
import { all } from "axios";
import { create } from "canvas-confetti";

const API = {
  inventory: {
    user: "/inventory/:userId",
    add: "/inventory/:userId/add",
    remove: "/inventory/:userId/remove",
  },
  slotMachine: {
    get: "/slotMachine",
    set: "/slotMachine",
    play: "/slotMachine/play",
  },
  jackpot: {
    get: "/jackpot",
    set: "/jackpot",
    getRewards: "/jackpot/rewards",
  },
  user: {
    claimEnergy: "/user/claimEnergy"
  }
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

export const getSlotMachineConfig = async () => {
  try {
    const url = getApiPath(API.slotMachine.get);
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const setSlotMachineConfig = async (payload) => {
  try {
    const url = getApiPath(API.slotMachine.set);
    const res = await $api.post(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const playSlotMachine = async ({ betX = 1 }) => {
  try {
    const url = getApiPath(API.slotMachine.play);
    const res = await $api.post(url, betX);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const claimEnergy = async () => {
  try {
    const url = getApiPath(API.user.claimEnergy);
    const res = await $api.post(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getJackpot = async () => {
  try {
    const url = getApiPath(API.jackpot.get);
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const setJackpot = async (payload) => {
  try {
    const url = getApiPath(API.jackpot.set);
    const res = await $api.post(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getJackpotRewards = async () => {
  try {
    const url = getApiPath(API.jackpot.getRewards);
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};
