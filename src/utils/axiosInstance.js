import axios from "axios"
import {useAuthStore} from '../stores/index.stores.js'

const baseUrl = `${(import.meta.env.MODE=="production")?import.meta.env.VITE_BACKEND_URL:import.meta.env.VITE_BACKEND_URL_DEV}/api`
"http://localhost:8000/api/"

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
