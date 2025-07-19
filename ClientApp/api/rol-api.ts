import { Endpoints } from "../core";
import { Api, IRolCurrent, IRoles, IUsuario, IUsuarioCurrent } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getUsuarioById?: (id: number) => Promise<any>;
  update?: (data: Partial<IRolCurrent>) => Promise<IRolCurrent>;
  updateUsuario?: (data: Partial<IUsuarioCurrent>) => Promise<IUsuarioCurrent>;
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

  getUsuarioById: async (id: number) => {
    const result = await API().get(`${Endpoints.USUARIOS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ROLES_CREATE, data);
    return result.data;
  },

  update: async (updatedRol) => {
    if (!updatedRol.RolId) {
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ROLES_UPDATE.replace("{id}", updatedRol.RolId.toString());

    const response = await API().put(url, updatedRol);

    return response.data;
  },

  updateUsuario: async (updatedUsuario) => {
    if (!updatedUsuario.UsuarioId) {
      WarnUtils.missing(Endpoints.USUARIOS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.USUARIOS_UPDATE.replace("{id}", updatedUsuario.UsuarioId.toString());

    const response = await API().put(url, updatedUsuario);

    return response.data;
  }
}

export default RolApi;