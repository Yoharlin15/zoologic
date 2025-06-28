import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IHabitat } from "ClientApp/interfaces/habitat";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const HabitatApi: ApiCustom<IHabitat> = {

  getAll: async () => {
    const result = await API().get(Endpoints.HABITATS_GET);
    return result.data;
  },

  create: async (data) => {
        const result = await API().post(Endpoints.HABITATS_CREATE, data);
        return result.data;
    },
}

export default HabitatApi;