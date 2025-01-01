import axios from "axios";

const baseUrl = "https://5a12-2402-9d80-c41-cdb5-5d0f-cada-863c-71a3.ngrok-free.app/"

export const token = ref();

const config = {
  headers: { Authorization: `Bearer ${token.value}` }
};



export const getUserInfo = async () => {
  const res = await axios.get(`${baseUrl}user/info`, {}, {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  return res.data;
}