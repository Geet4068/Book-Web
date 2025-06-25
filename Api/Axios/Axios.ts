import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const adminUrl = "https://wtsacademy.dedicateddevelopers.us/api";

export const baseURL = adminUrl;
const cookie = new Cookies();
const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const token = cookie.get("token");
    // console.log(token, "token"); // Debugging log
    if (token) {
      config.headers = config.headers || {};
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const product = (media:File|null) => {
  return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
};

export const profile_pic = (media:File|null) => {
  return `https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${media}`;
};



export default axiosInstance;
