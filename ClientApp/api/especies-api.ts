import { Endpoints } from "../core";
import { Api, ICategoriasData, IEspecie, IEspecieCurrent } from "../interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getFotoByEspecieId?: (id: number) => Promise<string>;
  update?: (data: Partial<IEspecieCurrent>) => Promise<IEspecieCurrent>;
  getCategorias?: () => Promise<ICategoriasData>;
}

const EspecieApi: ApiCustom<IEspecie> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ESPECIES_GET);
    return result.data;
  },

  getCategorias: async () => {
    const result = await API().get(Endpoints.ESPECIES_GET_CATEGORIAS);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ESPECIES_GETBYID}/${id}`);
    return result.data;
  },

  getFotoByEspecieId: async (id: number) => {
    const result = await API().get(`${Endpoints.ESPECIES_GET_FOTO}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ESPECIES_CREATE, data);
    return result.data;
  },
 
  update: async (updatedEspecie) => {
    if (!updatedEspecie.EspecieId) {
      WarnUtils.missing(Endpoints.ESPECIES_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ESPECIES_UPDATE.replace("{id}", updatedEspecie.EspecieId.toString());

    const response = await API().put(url, updatedEspecie);

    return response.data;
  },
};

export default EspecieApi;
