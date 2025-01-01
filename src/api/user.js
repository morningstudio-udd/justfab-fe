import axios from "axios";

const baseUrl = "https://5a12-2402-9d80-c41-cdb5-5d0f-cada-863c-71a3.ngrok-free.app/"

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