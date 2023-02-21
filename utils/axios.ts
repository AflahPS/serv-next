import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL_DEV;

export const nest: AxiosInstance = axios.create({
  baseURL,
});
