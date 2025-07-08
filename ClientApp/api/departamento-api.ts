import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";
import { ICurrentDepartamento, IDepartamento } from "ClientApp/interfaces/departamento";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<ICurrentDepartamento>) => Promise<ICurrentDepartamento>;
}

const DepartamentoApi: ApiCustom<IDepartamento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.DEPARTAMENTOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.DEPARTAMENTOS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.DEPARTAMENTOS_CREATE, data);
    return result.data;
  },

  update: async (updatedDepartamento) => {
    if (!updatedDepartamento.DepartamentoId) {
      WarnUtils.missing(Endpoints.DEPARTAMENTOS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.DEPARTAMENTOS_UPDATE.replace("{id}", updatedDepartamento.DepartamentoId.toString());

    const response = await API().put(url, updatedDepartamento);

    return response.data;
  }
}

export default DepartamentoApi;