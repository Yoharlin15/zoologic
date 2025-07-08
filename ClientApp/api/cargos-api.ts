import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { ICargo, ICurrentCargo } from "ClientApp/interfaces/cargos";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<ICurrentCargo>) => Promise<ICurrentCargo>;
}

const CargoApi: ApiCustom<ICargo> = {

  getAll: async () => {
    const result = await API().get(Endpoints.CARGOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.CARGO_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.CARGOS_CREATE, data);
    return result.data;
  },

  update: async (updatedCargo) => {
    if (!updatedCargo.CargoId) {
      WarnUtils.missing(Endpoints.CARGOS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.CARGOS_UPDATE.replace("{id}", updatedCargo.CargoId.toString());

    const response = await API().put(url, updatedCargo);

    return response.data;
  }
};

export default CargoApi;