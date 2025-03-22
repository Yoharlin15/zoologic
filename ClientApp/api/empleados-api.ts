import { Endpoints } from "../core";
import { Api, IEmpleado} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const EmpleadoApi: ApiCustom<IEmpleado> = {

  getAll: async () => {
    const result = await API().get(Endpoints.EMPLEADOS_GET);
    return result.data;
  },
};

export default EmpleadoApi;