import axios from "axios";
import { refreshToken } from "@api/auth";
import { store } from "@store";
import { router } from "@plugins/1.router";

const authStore = useAuthStore(store);

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "ngrok-skip-browser-warning": import.meta.env.VITE_NGROK_SKIP_BROWSER,
  },
});

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
$api.interceptors.request.use(
  function (config) {
    if (config.useAuthToken === false) {
      delete config.headers.Authorization;
    } else {
      if (authStore.token) {
        config.headers["Authorization"] = "Bearer " + authStore.token;
      }
    }

    delete config.useAuthToken;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ℹ️ Add response interceptor to handle 401 response
let refreshingToken = false;
let requestsQueue = [];

$api.interceptors.response.use(
  async function (response) {
    refreshingToken = false;
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    console.error("Error interceptors", error);

    if (error.response.status === 401) {
      if (!refreshingToken) {
        refreshingToken = true;
        try {
          await refreshToken();
          const updatedTokenData = authStore.token;
          if (!updatedTokenData) {
            throw new Error("Token refresh failed");
          }

          originalRequest.headers["Authorization"] =
            "Bearer " + updatedTokenData;

          // Retry the original request
          const response = await $api.request(originalRequest);

          // Process the queued requests
          requestsQueue.forEach((callback) => callback());
          requestsQueue = [];

          return response;
        } catch (refreshError) {
          refreshingToken = false;
          // Handle refresh token failure here (e.g., redirect to login)
          // $cookies.remove("accessToken");

          // Redirect to login page
          await router.push("/");
          return Promise.reject(refreshError);
        }
      }

      // Queue the request
      return new Promise((resolve, reject) => {
        requestsQueue.push(() => {
          originalRequest.headers["Authorization"] =
            "Bearer " + authStore.token;
          $api.request(originalRequest).then(resolve).catch(reject);
        });
      });
    }

    return Promise.reject(error);
  }
);

const FPapi = axios.create({
  baseURL: import.meta.env.VITE_FP_IDENTITY_PROVIDER_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
});

FPapi.interceptors.request.use(
  function (config) {
    if (config.useAuthToken === false) {
      delete config.headers.Authorization;
    } else {
      if (authStore.token) {
        config.headers["Authorization"] = "Bearer " + authStore.token;
      }
    }

    delete config.useAuthToken;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { $api, FPapi };
