import { Endpoints } from "../core";
import { Api, IAlimentoEspecie } from "#interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const AlimentoEspecieApi: ApiCustom<IAlimentoEspecie> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ALIMENTO_ESPECIE_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ALIMENTO_ESPECIE_CREATE, data);
    return result.data;
  }
}

export default AlimentoEspecieApi
