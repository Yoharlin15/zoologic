import { Endpoints } from "../core";
import { Api, IAlimentoCurrent } from "#interfaces";
import API from "./api";
import { IAlimento } from "#interfaces";
import { WarnUtils } from "#utils";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IAlimentoCurrent>) => Promise<IAlimentoCurrent>;
}

const AlimentoApi: ApiCustom<IAlimento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ALIMENTO_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ALIMENTO_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ALIMENTO_CREATE, data);
    return result.data;
  },

  update: async (updatedAlimento) => {
    if (!updatedAlimento.AlimentoId) {
      WarnUtils.missing(Endpoints.ALIMENTO_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ALIMENTO_UPDATE.replace("{id}", updatedAlimento.AlimentoId.toString());

    const response = await API().put(url, updatedAlimento);

    return response.data;
  }
}

export default AlimentoApi
