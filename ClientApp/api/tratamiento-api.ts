import { Endpoints } from "../core";
import { Api, ITratamiento} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const TratamientoApi: ApiCustom<ITratamiento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.TRATAMIENTOS_GET);
    return result.data;
  },
};

export default TratamientoApi;