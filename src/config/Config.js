import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.176:5000/api/",
  // baseURL: "http://127.0.1.1:5000/api/",
});
