import { Endpoints } from "../core";
import { Api, ITratamientoAplicado } from "#interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getTratamientoByAnimalId?: (id: number) => Promise<any>;
}

const TratamientoAplicadoApi: ApiCustom<ITratamientoAplicado> = {

  getAll: async () => {
    const result = await API().get(Endpoints.TRATAMIENTOSAPLICADOS_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.TRATAMIENTOSAPLICADOS_CREATE, data);
    return result.data;
  },

  getTratamientoByAnimalId: async (id: number) => {
    const result = await API().get(`${Endpoints.TRATAMIENTOSAPLICADOS_BY_ANIMALID}/${id}`);
    return result.data;
  },
};

export default TratamientoAplicadoApi;