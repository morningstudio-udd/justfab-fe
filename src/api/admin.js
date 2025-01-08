import { $api } from "@/plugins/axios";

export const uploadAsset = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $api.post(`/asset/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.status, res.data);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const getAllAssets = async () => {
  try {
    const res = await $api.get(`/asset/all`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};

export const deleteAsset = async (payload) => {
  try {
    const res = await $api.delete(`/asset/delete`, {
      data: payload,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response.data || error;
  }
};
