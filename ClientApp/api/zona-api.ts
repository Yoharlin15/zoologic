import { Endpoints } from "../core";
import { Api, IZona, IZonaCurrent } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IZonaCurrent>) => Promise<IZonaCurrent>;
}

const ZonaApi: ApiCustom<IZona> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ZONAS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ZONAS_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.ZONAS_CREATE, data);
    return result.data;
  },

  update: async (updatedZona) => {
    if (!updatedZona.ZonaId)
      WarnUtils.missing(Endpoints.ZONAS_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedZona
    };

    const response = await API().put(
      `${Endpoints.ZONAS_UPDATE}/${updatedZona.ZonaId}`,
      payload
    );
    return response.data;
  }
}

export default ZonaApi;