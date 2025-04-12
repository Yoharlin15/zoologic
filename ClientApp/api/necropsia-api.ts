import { Endpoints } from "../core";
import { Api, INecropsia} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const NecropsiaApi: ApiCustom<INecropsia> = {

  getAll: async () => {
    const result = await API().get(Endpoints.NECROPSIAS_GET);
    return result.data;
  },
};

export default NecropsiaApi;