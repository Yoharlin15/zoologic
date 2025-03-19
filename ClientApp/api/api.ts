import axios from "axios";
import { ApiUtils, WarnUtils } from "../utils";

const SERVER_URL = process.env.ZOOLOGIC_SERVER_URL ?? "";

if (!SERVER_URL) {
  throw new Error("Please add your Server URL to environment variables.");
}

// Crear una instancia de Axios sin autenticación
const API = (params?: object) => {
  const api = axios.create({
    params,
    timeout: 1000000,
    baseURL: SERVER_URL,
  });

  // Interceptor de respuesta para manejar errores genéricos
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        return Promise.reject(
          ApiUtils.getApiMessageError(
            error.response.data?.Result?.OuterException ?? "",
          ).join(" "),
        );
      }

      return Promise.reject(
        ApiUtils.getApiMessageError(error.message).join(""),
      );
    },
  );

  return api;
};

export default API;
