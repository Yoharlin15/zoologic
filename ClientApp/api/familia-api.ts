import { WarnUtils } from "#utils";
import { Endpoints } from "../core";
import { Api, IFamilia, IFamiliaCurrent } from "../interfaces";
import API from "./api";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    update?: (data: Partial<IFamiliaCurrent>) => Promise<IFamiliaCurrent>;
}

const FamiliaApi: ApiCustom<IFamilia> = {

    getAll: async () => {
        const result = await API().get(Endpoints.FAMILIAS_GET);
        return result.data;
    },

    create: async (data) => {
        const result = await API().post(Endpoints.FAMILIAS_CREATE, data);
        return result.data;
    },

    update: async (updatedFamilia) => {
    if (!updatedFamilia.FamiliaId)
      WarnUtils.missing(Endpoints.ROLES_UPDATE, "Missing update ID");

    const payload = {
      estado: updatedFamilia
    };

    const response = await API().put(
      `${Endpoints.FAMILIAS_CREATE}/${updatedFamilia.FamiliaId}`,
      payload
    );
    return response.data;
  }
};

export default FamiliaApi;