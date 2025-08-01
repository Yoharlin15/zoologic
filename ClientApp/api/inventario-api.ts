import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IInventario, IInventarioCurrent } from "ClientApp/interfaces/alimentacion";
import { WarnUtils } from "#utils";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getUnidadMedidaByAlimentoId: (id: number) => Promise<any>;
  update?: (data: Partial<IInventarioCurrent>) => Promise<IInventarioCurrent>;
}

const InventarioApi: ApiCustom<IInventario> = {

  getAll: async () => {
    const result = await API().get(Endpoints.INVENTARIO_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.INVENTARIO_GETBYID}/${id}`);
    return result.data;
  },

  getUnidadMedidaByAlimentoId: async (id: number) => {
    const result = await API().get(`${Endpoints.UNIDADMEDIDA_BY_ALIMENTOID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.INVENTARIO_CREATE, data);
    return result.data;
  },

  update: async (updatedInventario) => {
    if (!updatedInventario.InventarioId) {
      WarnUtils.missing(Endpoints.INVENTARIO_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.INVENTARIO_UPDATE.replace("{id}", updatedInventario.InventarioId.toString());

    const response = await API().put(url, updatedInventario);

    return response.data;
  }
};

export default InventarioApi;