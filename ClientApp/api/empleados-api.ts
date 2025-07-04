import { Endpoints } from "../core";
import { Api, IEmpleado} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
}

const EmpleadoApi: ApiCustom<IEmpleado> = {

  getAll: async () => {
    const result = await API().get(Endpoints.EMPLEADOS_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.EMPLEADOS_CREATE, data);
    return result.data;
  }
};

export default EmpleadoApi;