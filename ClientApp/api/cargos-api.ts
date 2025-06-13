import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { ICargo } from "ClientApp/interfaces/cargos";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const CargoApi: ApiCustom<ICargo> = {

  getAll: async () => {
    const result = await API().get(Endpoints.CARGOS_GET);
    return result.data;
  },
};

export default CargoApi;