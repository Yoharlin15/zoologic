import { Endpoints } from "../core";
import { Api, IDetalleComportamiento, IDetalleComportamientoCurrent, IRolCurrent, IRoles } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  update?: (data: Partial<IDetalleComportamientoCurrent>) => Promise<IDetalleComportamientoCurrent>;
}

const DetalleComportamientoAPi: ApiCustom<IDetalleComportamiento> = {

  getAll: async () => {
    const result = await API().get(Endpoints.DETALLECOMPORTAMIENTO_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.DETALLECOMPORTAMIENTO_GETBYID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.DETALLECOMPORTAMIENTO_CREATE, data);
    return result.data;
  },

  update: async (updated) => {
    if (!updated.DetalleComportamientoId)
      WarnUtils.missing(Endpoints.DETALLECOMPORTAMIENTO_UPDATE, "Missing update ID");

    const payload = {
      estado: updated
    };

    const response = await API().put(
      `${Endpoints.DETALLECOMPORTAMIENTO_UPDATE}/${updated.DetalleComportamientoId}`,
      payload
    );
    return response.data;
  }
}

export default DetalleComportamientoAPi;