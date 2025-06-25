import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IInventario } from "ClientApp/interfaces/alimentacion";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const InventarioApi: ApiCustom<IInventario> = {

  getAll: async () => {
    const result = await API().get(Endpoints.INVENTARIO_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.INVENTARIO_CREATE, data);
    return result.data;
  }
};

export default InventarioApi;