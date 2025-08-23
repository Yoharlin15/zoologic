import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { ICompra } from "ClientApp/interfaces/venta";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getCompraByUsuarioId?: (id: number) => Promise<any>;
  getCompraReportes?: (id: number) => Promise<any>;
}

const CompraApi: ApiCustom<ICompra> = {

  getAll: async () => {
    const result = await API().get(Endpoints.COMPRA_GET);
    return result.data;
  },

  getCompraByUsuarioId: async (id: number) => {
    const result = await API().get(`${Endpoints.COMPRA_BY_USUARIOID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.COMPRA_CREATE, data);
    return result.data;
  },

  getCompraReportes: async (params) => {
    console.log("🟢 Llamando a la API con filtros:", params);
    const result = await API().get(Endpoints.COMPRAS_REPORTES, { params });
    console.log("🟢 Datos recibidos del backend:", result.data);
    return result.data;
  },
}

export default CompraApi;