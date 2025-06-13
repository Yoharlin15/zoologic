import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { PadreApi } from "../../api";

export const useFetchPadres = () => {
    return useQuery({
        queryKey: [Tags.PADRES],
        queryFn: PadreApi.getAll,
    });
};