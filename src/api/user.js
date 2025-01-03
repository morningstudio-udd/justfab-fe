import axios from "axios";

const baseUrl = "https://api-smk.morningstudio.vn/"

axios.defaults.headers.common['ngrok-skip-browser-warning'] = "69420";

export const token = ref();

export const getUserInfo = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

    const res = await axios.get(`${baseUrl}user/info`, {});
    return res.data;
  } catch (e) {
    throw (e);
  }

}