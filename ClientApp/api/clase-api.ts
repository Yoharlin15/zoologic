import { WarnUtils } from "#utils";
import { Endpoints } from "../core";
import { Api, IClase, IClaseCurrent } from "../interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    update?: (data: Partial<IClaseCurrent>) => Promise<IClaseCurrent>;
}

const ClaseApi: ApiCustom<IClase> = {

    getAll: async () => {
        const result = await API().get(Endpoints.CLASES_GET);
        return result.data;
    },

    create: async (data) => {
        const result = await API().post(Endpoints.CLASES_CREATE, data);
        return result.data;
    },

    update: async (updatedClase) => {
    if (!updatedClase.ClaseId)
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedClase
    };

    const response = await API().put(
      `${Endpoints.CLASES_UPDATE}/${updatedClase.ClaseId}`,
      payload
    );
    return response.data;
  }
};

export default ClaseApi;