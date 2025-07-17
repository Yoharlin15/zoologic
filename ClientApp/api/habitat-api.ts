  import { Endpoints } from "../core";
  import { Api } from "#interfaces";
  import API from "./api";
  import { IHabitat, IHabitatCurrent } from "ClientApp/interfaces/habitat";
  import { WarnUtils } from "#utils";

  interface ApiCustom<T> extends Omit<Api<T>, "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    getById?: (id: number) => Promise<any>;
    getHabitatByEspecieId?: (id: number) => Promise<any>;
    update?: (data: Partial<IHabitatCurrent>) => Promise<IHabitatCurrent>;
  }

  const HabitatApi: ApiCustom<IHabitat> = {

    getAll: async () => {
      const result = await API().get(Endpoints.HABITATS_GET);
      return result.data;
    },

    getById: async (id: number) => {
      const result = await API().get(`${Endpoints.HABITATS_GETBYID}/${id}`);
      return result.data;
    },

    getHabitatByEspecieId: async (id: number) => {
      const result = await API().get(`${Endpoints.HABITATS_BY_ESPECIEID}/${id}`);
      return result.data;
    },

    create: async (data) => {
      const result = await API().post(Endpoints.HABITATS_CREATE, data);
      return result.data;
    },

    update: async (updatedHabitat) => {
      if (!updatedHabitat.HabitatId) {
        WarnUtils.missing(Endpoints.HABITATS_UPDATE, "Missing update ID");
        return Promise.reject(new Error("Missing update ID"));
      }

      const url = Endpoints.HABITATS_UPDATE.replace("{id}", updatedHabitat.HabitatId.toString());

      const response = await API().put(url, updatedHabitat);

      return response.data;
    },
  }

  export default HabitatApi;