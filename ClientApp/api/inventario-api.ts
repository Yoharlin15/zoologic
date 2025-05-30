import { Endpoints } from "../core";
import { Api } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";
import { IInventario } from "ClientApp/interfaces/inventario";


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
};

export default InventarioApi;