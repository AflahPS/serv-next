import axios, { AxiosInstance } from "axios";

export const nest: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});
