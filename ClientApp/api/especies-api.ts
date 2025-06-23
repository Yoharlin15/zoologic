import { Endpoints } from "../core";
import { Api, IEspecie, IEspecieCurrent } from "../interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  create?: (data: any) => Promise<any>;
  update?: (data: Partial<IEspecieCurrent>) => Promise<IEspecieCurrent>;
  updateGet: (id: number) => Promise<IEspecieCurrent>;
}

const EspecieApi: ApiCustom<IEspecie> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ESPECIES_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ESPECIES_CREATE, data);
    return result.data;
  },

  updateGet: async (id) => {
    if (!id) WarnUtils.missing(Endpoints.ESPECIES_UPDATE, "Missing ID");
    const response = await API().get(`${Endpoints.ESPECIES_UPDATE}/${id}`);
    return response.data;
  },
  update: async (updatedEspecie) => {
    if (!updatedEspecie.EspecieId)
      WarnUtils.missing(Endpoints.ESPECIES_UPDATE, "Missing update ID");
    const response = await API().put(
      `${Endpoints.ESPECIES_UPDATE}/${updatedEspecie.EspecieId}`,
      updatedEspecie
    );
    return response.data;
  },
};

export default EspecieApi;
