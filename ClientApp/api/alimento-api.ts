import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IAlimento } from "#interfaces";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const AlimentoApi: ApiCustom<IAlimento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ALIMENTO_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ALIMENTO_CREATE, data);
    return result.data;
  }
}

export default AlimentoApi
