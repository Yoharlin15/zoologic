import { Endpoints } from "../core";
import { Api, IExamen, IExamenCurrent } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IExamenCurrent>) => Promise<IExamenCurrent>;
}

const ExamenApi: ApiCustom<IExamen> = {

  getAll: async () => {
    const result = await API().get(Endpoints.EXAMENES_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.EXAMENES_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.EXAMENES_CREATE, data);
    return result.data;
  },

  update: async (updatedExamen) => {
    if (!updatedExamen.ExamentId)
      WarnUtils.missing(Endpoints.EXAMENES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedExamen
    };

    const response = await API().put(
      `${Endpoints.ESTADO_UPDATE}/${updatedExamen.ExamentId}`,
      payload
    );
    return response.data;
  }
}

export default ExamenApi;