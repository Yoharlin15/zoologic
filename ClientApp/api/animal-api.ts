import { Endpoints } from "../core";
import { Api, IAnimal } from "#interfaces";
import API from "./api";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const AnimalApi: ApiCustom<IAnimal> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ANIMALES_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ANIMALES_GET}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ANIMALES_CREATE, data);
    return result.data;
  }

};

export default AnimalApi;