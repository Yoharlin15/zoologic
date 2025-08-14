import { Tags } from "#core";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import CompraApi from "ClientApp/api/compra-api";

//Compras
// Tipo de la respuesta real del endpoint
type ComprasData = Awaited<ReturnType<typeof CompraApi.getAll>>;
const COMPRAS_KEY = [Tags.COMPRAS] as const;

export const useFetchCompras = (
  options?: Omit<
    UseQueryOptions<ComprasData, Error, ComprasData, typeof COMPRAS_KEY>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ComprasData, Error, ComprasData, typeof COMPRAS_KEY>({
    queryKey: COMPRAS_KEY,
    queryFn: CompraApi.getAll,
    ...options,
  });
};

//CompraByUsuarioId
type CompraByUsuarioData = Awaited<
  ReturnType<NonNullable<typeof CompraApi.getCompraByUsuarioId>>
>;

// Query key helper
const compraByUserKey = (id: number) => [Tags.COMPRAS, id] as const;

export const useFetchCompraByUsuarioId = (
  id: number | null | undefined,
  options?: Omit<
    UseQueryOptions<
      CompraByUsuarioData,
      Error,
      CompraByUsuarioData,
      ReturnType<typeof compraByUserKey>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    CompraByUsuarioData,
    Error,
    CompraByUsuarioData,
    ReturnType<typeof compraByUserKey>
  >({
    queryKey: compraByUserKey(id ?? -1),            // -1 como sentinel cuando no hay id
    enabled: !!id && (options?.enabled ?? true),    // bloquea si no hay id; respeta enabled externo
    queryFn: async () => {
      if (!id) throw new Error("Falta id");
      if (!CompraApi.getCompraByUsuarioId)
        throw new Error("Método no implementado");
      return CompraApi.getCompraByUsuarioId(id);
    },
    ...options, // después para que no pisen queryKey/queryFn
  });
};
