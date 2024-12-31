import axios from "axios";

// const axiosAI = axios.create({
//   // You can add your headers here
//   // ================================
//   baseURL: import.meta.env.VITE_AI_URL,
// });

// // ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
// axiosAI.interceptors.request.use(async (config) => {
  

//   // Return modified config
//   return config;
// });

// ℹ️ Add response interceptor to handle 401 response
// axiosAI.interceptors.response.use(response => {
//   return response
// }, error => {
//   // Handle error
//   if (error.response.status === 401) {
//     // ℹ️ Logout user and redirect to login page
//     // Remove "userData" from localStorage
//     localStorage.removeItem('userData')

//     // Remove "accessToken" from localStorage
//     localStorage.removeItem('accessToken')
//     localStorage.removeItem('userAbilities')

//     // If 401 response returned from api
//     router.push('/login')
//   }
//   else {
//     return Promise.reject(error)
//   }
// })

// export { axiosAI };
