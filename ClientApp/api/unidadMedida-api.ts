import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { IUnidadMedida } from "ClientApp/interfaces/alimentacion";


interface ApiCustom<T> extends Omit<Api<T>, "update"> {
    create?: (data: any) => Promise<any>;
    nullify?: (id: number) => Promise<number>;
    activate?: (id: number) => Promise<number>;
    getById?: (id: number) => Promise<any>;
}

const UnidadMedidaApi: ApiCustom<IUnidadMedida> = {

    getAll: async () => {
        const result = await API().get(Endpoints.UNIDAD_MEDIDA_GET);
        return result.data;
    },
};

export default UnidadMedidaApi;