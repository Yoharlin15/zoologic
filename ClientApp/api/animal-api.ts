import { Endpoints } from "../core";
import { Api, IAnimal, IAnimalAnulate, IAnimalCurrent, IAnimalEstado } from "#interfaces";
import API from "./api";
import { WarnUtils } from "#utils";

interface ApiCustom<T> extends Omit<Api<T>, "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  getAnimalByEspecieId?: (id: number) => Promise<any>;
  getHabitatByAnimalId: (id: number) => Promise<any>;
  getAnimalReportes?: (id: number) => Promise<any>;
  update?: (data: Partial<IAnimalCurrent>) => Promise<IAnimalCurrent>;
  asignarHabitat?: (data: Partial<IAnimalCurrent>) => Promise<IAnimalCurrent>;
  updateEstado?: (data: Partial<IAnimalEstado>) => Promise<IAnimalEstado>;
  delete?: (data: Partial<IAnimalAnulate>) => Promise<IAnimalAnulate>;
}

const AnimalApi: ApiCustom<IAnimal> = {

  getAll: async () => {
    const result = await API().get(Endpoints.ANIMALES_GET);
    return result.data;
  },

  getById: async (id: number) => {
    const result = await API().get(`${Endpoints.ANIMALES_GETBYID}/${id}`);
    return result.data;
  },

  getAnimalByEspecieId: async (id: number) => {
    const result = await API().get(`${Endpoints.ANIMALES_BY_ESPECIEID}/${id}`);
    return result.data;
  },

  getHabitatByAnimalId: async (id: number) => {
    const result = await API().get(`${Endpoints.ANIMALES_BY_HABITATID}/${id}`);
    return result.data;
  },

  getAnimalReportes: async (params) => {
  console.log("🟢 Llamando a la API con filtros:", params);
  const result = await API().get(Endpoints.ANIMALES_REPORTES, { params });
  console.log("🟢 Datos recibidos del backend:", result.data);
  return result.data;
},

  create: async (data) => {
    const result = await API().post(Endpoints.ANIMALES_CREATE, data);
    return result.data;
  },

  update: async (updatedAnimal) => {
    if (!updatedAnimal.AnimalId) {
      WarnUtils.missing(Endpoints.ANIMLAES_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ANIMLAES_UPDATE.replace("{id}", updatedAnimal.AnimalId.toString());

    const response = await API().put(url, updatedAnimal);

    return response.data;
  },

  updateEstado: async (updatedAnimal) => {
    if (!updatedAnimal.AnimalId) {
      WarnUtils.missing(Endpoints.ANIMLAES_ESTADO_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ANIMLAES_ESTADO_UPDATE.replace("{id}", updatedAnimal.AnimalId.toString());

    const response = await API().put(url, updatedAnimal);

    return response.data;
  },

  asignarHabitat: async (updatedAnimal) => {
    if (!updatedAnimal.AnimalId) {
      WarnUtils.missing(Endpoints.ANIMALES_HABITATS_UPDATE, "Missing update ID");
      return Promise.reject(new Error("Missing update ID"));
    }

    const url = Endpoints.ANIMALES_HABITATS_UPDATE.replace("{id}", updatedAnimal.AnimalId.toString());

    const response = await API().put(url, updatedAnimal);

    return response.data;
  },

  delete: async (deletedAnimal) => {
    if (!deletedAnimal.AnimalId) {
      WarnUtils.missing(Endpoints.ANIMALES_DELETE, "Missing EmpleadoId");
      return Promise.reject(new Error("Missing EmpleadoId"));
    }

    const url = Endpoints.ANIMALES_DELETE.replace(
      "{id}",
      deletedAnimal.AnimalId.toString()
    );

    const response = await API().delete(url);
    return response.data;
  },
};

export default AnimalApi;