import axios from "axios";

import { baseUrl } from "./urls";
import { tokenName } from "./constants";

export const generateHttpClient = () => {
  const client = axios.create({
    baseURL: baseUrl,
  });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenName);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};
