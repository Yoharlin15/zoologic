import { WarnUtils } from "#utils";
import { Endpoints } from "../core";
import { Api, IProcedencia, IProcedenciaCurrent } from "../interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    update?: (data: Partial<IProcedenciaCurrent>) => Promise<IProcedenciaCurrent>;
}

const ProcedenciaApi: ApiCustom<IProcedencia> = {

    getAll: async () => {
        const result = await API().get(Endpoints.PROCEDENCIAS_GET);
        return result.data;
    },

    create: async (data) => {
        const result = await API().post(Endpoints.PROCEDENCIAS_CREATE, data);
        return result.data;
    },

    update: async (updatedProcedencia) => {
    if (!updatedProcedencia.ProcedenciaId)
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");

    const payload = {
      procedencia: updatedProcedencia
    };

    const response = await API().put(
      `${Endpoints.FAMILIAS_CREATE}/${updatedProcedencia.ProcedenciaId}`,
      payload
    );
    return response.data;
  }
};

export default ProcedenciaApi;