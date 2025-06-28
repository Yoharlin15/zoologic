import { Endpoints } from "../core";
import { Api, INecropsia } from "#interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const NecropsiaApi: ApiCustom<INecropsia> = {

  getAll: async () => {
    const result = await API().get(Endpoints.NECROPSIAS_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.NECROPCIAS_CREATE, data);
    return result.data;
  }
};

export default NecropsiaApi;