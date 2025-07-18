import { Endpoints } from "../core";
import { Api, ITratamientoEspecie, ITratamientoEspecieCurrent } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<ITratamientoEspecieCurrent>) => Promise<ITratamientoEspecieCurrent>;
}

const TratamientoEspecieApi: ApiCustom<ITratamientoEspecie> = {

  getAll: async () => {
    const result = await API().get(Endpoints.TRATAMIENTOESPECIES_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.TRATAMIENTOESPECIES_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.TRATAMIENTOESPECIES_CREATE, data);
    return result.data;
  },

  update: async (updatedTratamientoEspecie) => {
    if (!updatedTratamientoEspecie.TratamientoId)
      WarnUtils.missing(Endpoints.TRATAMIENTOESPECIES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedTratamientoEspecie
    };

    const response = await API().put(
      `${Endpoints.TRATAMIENTOESPECIES_UPDATE}/${updatedTratamientoEspecie.TratamientoEspecieId}`,
      payload
    );
    return response.data;
  }
};

export default TratamientoEspecieApi;