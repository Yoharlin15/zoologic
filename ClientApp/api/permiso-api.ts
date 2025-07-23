import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";
import { IPermiso, IPermisoCurrent } from "ClientApp/interfaces/permisos";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IPermisoCurrent>) => Promise<IPermisoCurrent>;
}

const PermisoApi: ApiCustom<IPermiso> = {

  getAll: async () => {
    const result = await API().get(Endpoints.PERMISOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.PERMISOS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.PERMISOS_CREATE, data);
    return result.data;
  },

  update: async (updatedPermiso) => {
    if (!updatedPermiso.PermisoId) {
      WarnUtils.missing(Endpoints.PERMISOS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.PERMISOS_UPDATE.replace("{id}", updatedPermiso.PermisoId.toString());

    const response = await API().put(url, updatedPermiso);

    return response.data;
  },
}

export default PermisoApi;