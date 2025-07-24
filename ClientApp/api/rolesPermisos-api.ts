import { Endpoints } from "../core";
import { Api, IRolesPermisos } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update: (data: IRolesPermisos[]) => Promise<any>
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

  update: async (updatedPermisos) => {
  if (!updatedPermisos || updatedPermisos.length === 0) {
    WarnUtils.missing(Endpoints.ROLES_PERMISOS_UPDATE, "Missing update data");
    return Promise.reject(new Error("Missing update data"));
  }

  const rolId = updatedPermisos[0].RolId;
  if (!rolId) {
    WarnUtils.missing(Endpoints.ROLES_PERMISOS_UPDATE, "Missing RolId");
    return Promise.reject(new Error("Missing RolId"));
  }

  const url = Endpoints.ROLES_PERMISOS_UPDATE.replace("{id}", rolId.toString());

  const response = await API().put(url, updatedPermisos);

  return response.data;
},

}

export default RolesPermisosApi;