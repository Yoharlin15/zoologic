import { Endpoints } from "../core";
import { Api, IAnimal} from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";


interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
}

const AnimalApi: ApiCustom<IAnimal> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ANIMALES_GET);
    return result.data;
  },
};

export default AnimalApi;