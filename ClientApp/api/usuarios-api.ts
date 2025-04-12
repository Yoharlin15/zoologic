import { Endpoints } from "../core";
import { Api, IUsuario } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const UsuarioApi: ApiCustom<IUsuario> = {

  getAll: async () => {
    const result = await API().get(Endpoints.USUARIOS_GET);
    return result.data;
  },
};

export default UsuarioApi;