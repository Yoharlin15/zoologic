import { Endpoints } from "../core";
import { Api } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";
import { IPadre } from "ClientApp/interfaces/padre";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const EmpleadoApi: ApiCustom<IPadre> = {

  getAll: async () => {
    const result = await API().get(Endpoints.PADRES_GET);
    return result.data;
  },
};

export default EmpleadoApi;