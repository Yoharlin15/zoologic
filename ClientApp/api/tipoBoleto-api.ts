import { Endpoints } from "../core";
import { Api } from "#interfaces";
import API from "./api";
import { ITipoBoleto, IValidacionBoleto } from "ClientApp/interfaces/venta";

interface ApiCustom<T> extends Omit<Api<T>, "create" | "update"> {
  create?: (data: any) => Promise<any>;
  nullify?: (id: number) => Promise<number>;
  activate?: (id: number) => Promise<number>;
  getById?: (id: number) => Promise<any>;
  verifyTicket: (code: string, confirm?: boolean) => Promise<IValidacionBoleto>;
}

const TipoBoletoApi: ApiCustom<ITipoBoleto> = {

  getAll: async () => {
    const result = await API().get(Endpoints.TIPOBOLETO_GET);
    return result.data;
  },

  create: async (data) => {
    const result = await API().post(Endpoints.TIPOBOLETO_CREATE, data);
    return result.data;
  },

  verifyTicket: async (code: string, confirm = false) => {
    const res = await API().get(Endpoints.VERIFY_TICKET, {
      params: { code, confirm },
    });
    return res.data as IValidacionBoleto;
  },
}

export default TipoBoletoApi;