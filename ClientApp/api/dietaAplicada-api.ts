import { Endpoints } from "../core";
import { Api, IAnimal } from "#interfaces";
import API from "./api";
import { IDietaAplicada } from "ClientApp/interfaces/alimentacion";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const DietaAplicadaApi: ApiCustom<IDietaAplicada> = {

  getAll: async () => {
    const result = await API().get(Endpoints.dietaAPLICADA_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.DIETA_APLICADA_CREATE, data);
    return result.data;
  }
}

export default DietaAplicadaApi;