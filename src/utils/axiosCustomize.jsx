import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

const handleRefreshToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");
  console.log("res", res);
  if (res && res.data) {
    return res.data.access_token;
  } else {
    return null;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    if (error.config && error.response && +error.response.status === 401) {
      const access_token = await handleRefreshToken();
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        return instance.request(error.config);
      }
      // return updateToken().then((token) => {
      //   error.config.headers.xxxx <= set the token
      //   return axios.request(config);
      // });
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // console.log("response:", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
