import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IFactura } from "ClientApp/interfaces/venta";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const FacturaApi: ApiCustom<IFactura> = {

  getAll: async () => {
    const result = await API().get(Endpoints.FACTURA_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.FACTURA_CREATE, data);
    return result.data;
  },
}

export default FacturaApi;