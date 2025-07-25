import { Endpoints } from "../core";
import { Api, IEmpleado, IEmpleadoAnulate, IEmpleadoCurrent } from "#interfaces";
import { WarnUtils } from "#utils";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  delete?: (data: Partial<IEmpleadoAnulate>) => Promise<IEmpleadoAnulate>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getEmpleadoByEstadoId?: (id: number) => Promise<any>;
  update?: (data: Partial<IEmpleadoCurrent>) => Promise<IEmpleadoCurrent>;
}

const EmpleadoApi: ApiCustom<IEmpleado> = {

  getAll: async () => {
    const result = await API().get(Endpoints.EMPLEADOS_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.EMPLEADOS_GETBYID}/${id}`);
    return result.data;
  },

  getEmpleadoByEstadoId: async (id: number) => {
    const result = await API().get(`${Endpoints.EMPLEADOS_BY_ESTADOID}/${id}`);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.EMPLEADOS_CREATE, data);
    return result.data;
  },

  update: async (updatedEmpleado) => {
    if (!updatedEmpleado.EmpleadoId) {
      WarnUtils.missing(Endpoints.EMPLEADOS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.EMPLEADOS_UPDATE.replace("{id}", updatedEmpleado.EmpleadoId.toString());

    const response = await API().put(url, updatedEmpleado);

    return response.data;
  },

  delete: async (deletedEmpleado) => {
    if (!deletedEmpleado.EmpleadoId) {
      WarnUtils.missing(Endpoints.EMPLEADOS_DELETE, "Missing EmpleadoId");
      return Promise.reject(new Error("Missing EmpleadoId"));
    }

    const url = Endpoints.EMPLEADOS_DELETE.replace(
      "{id}",
      deletedEmpleado.EmpleadoId.toString()
    );

    const response = await API().delete(url);
    return response.data;
  },

  activate: async (id: number) => {
    if (!id) {
      WarnUtils.missing(Endpoints.EMPLEADOS_ACTIVATE, "Missing EmpleadoId");
      return Promise.reject(new Error("Missing EmpleadoId"));
    }

    const url = Endpoints.EMPLEADOS_ACTIVATE.replace("{id}", id.toString());
    const response = await API().put(url);
    return response.data;
  },
};

export default EmpleadoApi;