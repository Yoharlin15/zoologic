import { Endpoints } from "../core";
import { Api, IComportamientoCurrent } from "#interfaces";
import API from "./api";
import { IComportamiento } from "#interfaces";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    getById?: (id: number) => Promise<any>;
    update?: (data: Partial<IComportamientoCurrent>) => Promise<IComportamientoCurrent>;
}

const ComportamientoAPi: ApiCustom<IComportamiento> = {

    getAll: async () => {
        const result = await API().get(Endpoints.COMPORTAMIENTO_GET);
        return result.data;
    },

    getById: async (id: number) => {
        const result = await API().get(`${Endpoints.COMPORTAMIENTO_GETBYID}/${id}`);
        return result.data;
    },

    create: async (data) => {
        const result = await API().post(Endpoints.COMPORTAMIENTO_CREATE, data);
        return result.data;
    },

    update: async (updatedComportamiento) => {
    if (!updatedComportamiento.ComportamientoId) {
      WarnUtils.missing(Endpoints.COMPORTAMIENTO_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.COMPORTAMIENTO_UPDATE.replace("{id}", updatedComportamiento.ComportamientoId.toString());

    const response = await API().put(url, updatedComportamiento);

    return response.data;
  },
}

export default ComportamientoAPi
