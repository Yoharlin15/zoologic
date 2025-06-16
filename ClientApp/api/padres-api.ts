import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IPadre } from "ClientApp/interfaces/padre";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  create?: (data: any) => Promise<any>;
}

const EmpleadoApi: ApiCustom<IPadre> = {

  getAll: async () => {
    const result = await API().get(Endpoints.PADRES_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.PADRES_CREATE, data);
    return result.data;
  }
};

export default EmpleadoApi;