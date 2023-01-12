import axios, { AxiosInstance } from "axios";

export const nest: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333/",
});
