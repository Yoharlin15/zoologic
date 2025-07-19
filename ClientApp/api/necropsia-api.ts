import { Endpoints } from "../core";
import { Api, INecropsia, INecropsiaCurrent } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  activate?: (id: number) => Promise<number>;
  update?: (data: Partial<INecropsiaCurrent>) => Promise<INecropsiaCurrent>;
}

const NecropsiaApi: ApiCustom<INecropsia> = {

  getAll: async () => {
    const result = await API().get(Endpoints.NECROPSIAS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.NECROPSIAS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.NECROPSIAS_CREATE, data);
    return result.data;
  },

  update: async (updatedNecropsia) => {
    if (!updatedNecropsia.NecropsiaId) {
      WarnUtils.missing(Endpoints.NECROPSIAS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.NECROPSIAS_UPDATE.replace("{id}", updatedNecropsia.NecropsiaId.toString());

    const response = await API().put(url, updatedNecropsia);

    return response.data;
  }
};

export default NecropsiaApi;