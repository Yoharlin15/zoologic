import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";
import { IPermiso, IRolesPermisos, IRolesPermisosCurrent } from "ClientApp/interfaces/permisos";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IRolesPermisosCurrent>) => Promise<IRolesPermisosCurrent>;
}

const RolesPermisosApi: ApiCustom<IRolesPermisos> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ROLES_PERMISOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ROLES_PERMISOS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ROLES_PERMISOS_CREATE, data);
    return result.data;
  },
}

export default RolesPermisosApi;