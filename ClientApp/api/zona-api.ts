import { Endpoints } from "../core";
import { Api, IZona} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const ZonaApi: ApiCustom<IZona> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ZONAS_GET);
    return result.data;
  },
};

export default ZonaApi;