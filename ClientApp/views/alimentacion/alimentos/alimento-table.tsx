import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
} from "react";
import { debounce } from "radash";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import {
    DataTableFilterMeta,
    DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../../components/card-table";
import { Reducers } from "#core";
import { IAlimento } from "#interfaces";
import AlimentoSidebarForm from "./alimento-sidebar-form";
import dayjs from "dayjs";

interface IAlimentoTableProps {
    dispatch: React.Dispatch<any>;
}

const AlimentoTable = ({ dispatch }: IAlimentoTableProps) => {
    const Alimento = AppQueryHooks.useFetchAlimentos();
    const [selectedAlimento, setSelectedDietaAplicada] = useState<IAlimento>();
    const cm = useRef<ContextMenu>(null);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedAlimentoId, setSelectedAlimentoId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedAlimento) {
                    setSelectedAlimentoId(selectedAlimento.AlimentoId);
                    setSidebarVisible(true); // Abre el sidebar
                }
            }
        },
    ];

    const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
        id: 0,
        visible: false,
    });
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const columns = useMemo<ICardTableProps<IAlimento>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Alimento",
                field: "Nombre",
                style: { minWidth: "10rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Unidad de medida",
                field: "UnidadMedida",
                style: { minWidth: "10rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Descripcion",
                field: "Descripcion",
                style: { minWidth: "20rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Creado Por",
                field: "NombreUsuario",
                style: { minWidth: "10rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Fecha de creacion",
                field: "FechaCreacion",
                style: { minWidth: "12rem" },
                body: (rowData: IAlimento | null) => {
                    if (!rowData?.FechaCreacion) return "";
                    return dayjs(rowData.FechaCreacion).format("DD/MM/YYYY");
                },
            },
        ],
        []
    );

    const filteredAlimentos = useMemo(() => {
        if (!Array.isArray(Alimento.data)) return [];
        return Alimento.data.filter((t: IAlimento) =>
            t.Nombre?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [Alimento.data, searchText]);

    return (
        <div className="h-full">
            <ContextMenu
                ref={cm}
                model={menuModel}
                onHide={() => setSelectedDietaAplicada(undefined)}
            />
            <CardTable<IAlimento>
                title="Alimentos"
                columns={columns}
                value={filteredAlimentos}
                skeletonLoading={Alimento.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <Button
                        key="btn_add"
                        onClick={() => {
                            setSelectedAlimentoId(null);
                            setSidebarVisible(true);
                        }}
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        label="Nuevo alimento"
                    />
                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "AlimentoId",
                    loading: Alimento.isFetching,
                    paginator: filteredAlimentos.length > 8,
                    contextMenuSelection: selectedAlimento,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IAlimento[]>
                    ) => setSelectedDietaAplicada(e.value),
                }}
            />
            <AlimentoSidebarForm
                id={selectedAlimentoId ?? undefined}
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                alimentoId={selectedAlimentoId ?? undefined}
            />
        </div>
    );
};

export default AlimentoTable;