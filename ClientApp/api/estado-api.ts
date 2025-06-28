import { Endpoints } from "../core";
import { Api, IEstadoCurrent, IEstados } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IEstadoCurrent>) => Promise<IEstadoCurrent>;
}

const EstadoApi: ApiCustom<IEstados> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ESTADO_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ESTADO_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ESTADO_CREATE, data);
    return result.data;
  },

  update: async (updatedEstado) => {
    if (!updatedEstado.EstadoId) {
      WarnUtils.missing(Endpoints.ESTADO_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ESTADO_UPDATE.replace("{id}", updatedEstado.EstadoId.toString());

    const response = await API().put(url, updatedEstado);

    return response.data;
  }
}

export default EstadoApi;