import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  EXPO_PUBLIC_GIT_TOKEN,
  EXPO_PUBLIC_GIT_API_URL,
  EXPO_PUBLIC_API_URL
} from "@env";

const gitInstance = axios.create({
  baseURL: EXPO_PUBLIC_GIT_API_URL,
  headers: {
    Authorization: `Bearer ${EXPO_PUBLIC_GIT_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28"
  }
});

const apiInstance = axios.create({
  baseURL: " https://2b01-157-49-129-238.ngrok.io"
});

apiInstance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("@token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
      config.headers.set("Content-Type", `application/json`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { apiInstance, gitInstance };
