import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IComentario } from "ClientApp/interfaces/comentario";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const ComentarioApi: ApiCustom<IComentario> = {

  getAll: async () => {
    const result = await API().get(Endpoints.COMENTARIO_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.COMENTARIO_CREATE, data);
    return result.data;
  },
}

export default ComentarioApi;