import { $api } from "@/plugins/axios";
import { store } from "@store";

const adminStore = useAdminStore(store);

const API = {
  asset: {
    upload: "/asset/upload",
    all: "/asset/all",
    delete: "/asset/delete",
  },
  item: {
    all: "/item",
    item: "/item/:id",
    create: "/item",
    update: "/item/:id",
    delete: "/item/:id",
  },
  fusion: {
    all: "/fusion",
    fusion: "/fusion/:id",
    create: "/fusion",
    update: "/fusion/:id",
    delete: "/fusion/:id",
    fusedInto: "/fusion/fused-into/:id",
    fusedFrom: "/fusion/fused-from/:id",
  },
};

export const uploadAsset = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $api.post(API.asset.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getAllAssets = async () => {
  try {
    const res = await $api.get(API.asset.all);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const deleteAsset = async (payload) => {
  try {
    const res = await $api.delete(API.asset.delete, {
      data: payload,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getAllItems = async () => {
  try {
    const res = await $api.get(API.item.all);

    adminStore.allItems = res.data;
    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getItem = async (id) => {
  try {
    const url = getApiPath(API.item.item, { id: id });
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const createItem = async (payload) => {
  try {
    const res = await $api.post(API.item.create, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const updateItem = async (payload) => {
  try {
    const url = getApiPath(API.item.update, { id: payload._id });
    const res = await $api.patch(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const deleteItem = async (id) => {
  try {
    const url = getApiPath(API.item.delete, { id: id });
    const res = await $api.delete(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getAllFusions = async () => {
  try {
    const res = await $api.get(API.fusion.all);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getFusion = async (id) => {
  try {
    const url = getApiPath(API.fusion.fusion, { id: id });
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const createFusion = async (payload) => {
  try {
    const res = await $api.post(API.fusion.create, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const updateFusion = async (payload) => {
  try {
    const url = getApiPath(API.fusion.update, { id: payload._id });
    const res = await $api.patch(url, payload);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const deleteFusion = async (id) => {
  try {
    const url = getApiPath(API.fusion.delete, { id: id });
    const res = await $api.delete(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getFusedInto = async (id) => {
  try {
    const url = getApiPath(API.fusion.fusedInto, { id: id });
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getFusedFrom = async (id) => {
  try {
    const url = getApiPath(API.fusion.fusedFrom, { id: id });
    const res = await $api.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};
