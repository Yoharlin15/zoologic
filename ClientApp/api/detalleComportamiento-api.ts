import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IComportamiento } from "#interfaces";

interface ApiCustom<T> extends Omit<Api<T>, "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    getById?: (id: number) => Promise<any>;
}

const DetalleComportamientoAPi: ApiCustom<IComportamiento> = {

    getAll: async () => {
        const result = await API().get(Endpoints.DETALLECOMPORTAMIENTO_GET);
        return result.data;
    },

    create: async (data) => {
        const result = await API().post(Endpoints.DETALLECOMPORTAMIENTO_CREATE, data);
        return result.data;
    },
}

export default DetalleComportamientoAPi