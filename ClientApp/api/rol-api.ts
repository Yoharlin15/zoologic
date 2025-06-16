import { Endpoints } from "../core";
import { Api, IRolCurrent, IRoles } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IRolCurrent>) => Promise<IRolCurrent>;
}

const RolApi: ApiCustom<IRoles> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ROLES_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ROLES_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ROLES_CREATE, data);
    return result.data;
  },

  update: async (updatedRol) => {
    if (!updatedRol.RolId)
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedRol
    };

    const response = await API().put(
      `${Endpoints.ESTADO_UPDATE}/${updatedRol.RolId}`,
      payload
    );
    return response.data;
  }
}

export default RolApi;