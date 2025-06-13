import { Endpoints } from "../core";
import { Api, IEstado} from "#interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const EstadoApi: ApiCustom<IEstado> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ESTADO_GET);
    return result.data;
  },
}

export default EstadoApi;