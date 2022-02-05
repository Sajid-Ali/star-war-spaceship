/* eslint-disable no-unused-vars */
import axios from "axios";
import { baseURL } from "./constants";

axios.defaults.baseURL = baseURL;
export const axiosClient = axios.create({
  baseURL,
});

export default axiosClient;
