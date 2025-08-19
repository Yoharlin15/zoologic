import { useQuery, useMutation } from "@tanstack/react-query";
import TipoBoletoApi from "ClientApp/api/tipoBoleto-api";
import { IValidacionBoleto } from "ClientApp/interfaces/venta";

export const useVerifyTicket = (code?: string) =>
  useQuery<IValidacionBoleto>({
    queryKey: ["verify-ticket", code],
    queryFn: () => TipoBoletoApi.verifyTicket(code!, false),
    enabled: !!code, // solo cuando haya code
});

export const useConfirmTicket = () =>
    useMutation({
    mutationFn: ({ code }: { code: string }) =>
    TipoBoletoApi.verifyTicket(code, true),
});
