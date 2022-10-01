import axios, { AxiosError } from "axios";
import { store } from "./store";
import { resetUser } from "./store/user";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => response,
  (axiosError: AxiosError) => {
    if (axiosError.response?.status === 401) {
      store.dispatch(resetUser());
    }
    return Promise.reject(axiosError);
  }
);
