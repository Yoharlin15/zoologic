import { Endpoints } from "../core";
import { Api, ITratamiento, ITratamientoCurrent } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<ITratamientoCurrent>) => Promise<ITratamientoCurrent>;
}

const TratamientoApi: ApiCustom<ITratamiento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.TRATAMIENTOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.TRATAMIENTO_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.TRATAMIENTO_CREATE, data);
    return result.data;
  },

  update: async (updatedTratamiento) => {
    if (!updatedTratamiento.TratamientoId)
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedTratamiento
    };

    const response = await API().put(
      `${Endpoints.TRATAMIENTO_UPDATE}/${updatedTratamiento.TratamientoId}`,
      payload
    );
    return response.data;
  }
};

export default TratamientoApi;