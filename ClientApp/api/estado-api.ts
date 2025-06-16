import { Endpoints } from "../core";
import { Api, IEstado, IEstadoCurrent } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IEstadoCurrent>) => Promise<IEstadoCurrent>;
}

const EstadoApi: ApiCustom<IEstado> = {

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

  update: async (updatedEspecie) => {
    if (!updatedEspecie.EstadoId)
      WarnUtils.missing(Endpoints.ESTADO_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedEspecie
    };

    const response = await API().put(
      `${Endpoints.ESTADO_UPDATE}/${updatedEspecie.EstadoId}`,
      payload
    );
    return response.data;
  }
}

export default EstadoApi;