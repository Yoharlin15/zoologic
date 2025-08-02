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
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import {
    DataTableFilterMeta,
    DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../../components/card-table";

// import HabitatSidebarCreate from "./Habitat-sidebar-create";
import { Reducers, Routes } from "#core";
import { IDietaAplicada } from "ClientApp/interfaces/alimentacion";
import dayjs from "dayjs";
import DietaAplicadaSidebarCreate from "./dietaAplicada-sidebar-create";
import { SplitButton } from "primereact/splitbutton";

interface IDietaAplicadaTableProps {
    dispatch: React.Dispatch<any>;
}

const DietaAplicadaTable = ({ dispatch }: IDietaAplicadaTableProps) => {
    const DietaAplicada = AppQueryHooks.useFetchDietasAplicadas();
    const [selectedDietaAplicada, setSelectedDietaAplicada] = useState<IDietaAplicada>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedDietaAplicadaId, setSelectedDietaAplicadaId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedDietaAplicada) {
                    setSelectedDietaAplicadaId(selectedDietaAplicada.DietaAplicadaId);
                    setSidebarUpdateVisible(true); // Abre el sidebar
                }
            },
        },
    ];

    const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
        id: 0,
        visible: false,
    });
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const columns = useMemo<ICardTableProps<IDietaAplicada>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Animal (identificador)",
                field: "IdentificadorUnico",
                style: { minWidth: "12rem" },
            },

            {
                filter: true,
                sortable: true,
                header: "Alimento",
                field: "Nombre",
                style: { minWidth: "12rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Cantidad",
                field: "Cantidad",
                style: { minWidth: "12rem" },
                body: (rowData) =>
                    rowData?.Cantidad != null
                        ? `${rowData.Cantidad} ${rowData.UnidadMedida ?? ""}`
                        : "Sin cantidad",

            },
            {
                filter: true,
                sortable: true,
                header: "Fecha de aplicacion",
                field: "FechaAplicacion",
                style: { minWidth: "12rem" },
                body: (rowData: IDietaAplicada | null) => {
                    if (!rowData?.FechaAplicacion) return "";
                    return dayjs(rowData.FechaAplicacion).format("DD/MM/YYYY");
                },
            },
        ],
        []
    );

    const filteredDietasAplicadas = useMemo(() => {
        if (!Array.isArray(DietaAplicada.data)) return [];
        return DietaAplicada.data.filter((t) =>
            t.IdentificadorUnico?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [DietaAplicada.data, searchText]);

    return (
        <div className="h-full">
            <ContextMenu
                ref={cm}
                model={menuModel}
                onHide={() => setSelectedDietaAplicada(undefined)}
            />
            <CardTable<IDietaAplicada>
                title="Record general de dietas aplicadas"
                columns={columns}
                value={filteredDietasAplicadas}
                skeletonLoading={DietaAplicada.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <SplitButton
                        key="btn_add_split"
                        label="Aplicar dieta"
                        severity="success"
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        color="primary"
                        onClick={() => {
                            setSelectedDietaAplicadaId(null);
                            setSidebarCreateVisible(true);
                        }}
                        model={[
                            {
                                label: "Ir a vista especie",
                                icon: "pi pi-directions",
                                command: () => navigate("/alimentacion"),
                            },
                        ]}
                    />,
                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "DietaAplicadaId",
                    loading: DietaAplicada.isFetching,
                    paginator: filteredDietasAplicadas.length > 8,
                    contextMenuSelection: selectedDietaAplicada,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IDietaAplicada[]>
                    ) => setSelectedDietaAplicada(e.value),
                }}
            />
            <DietaAplicadaSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                dietaAplicadaId={selectedDietaAplicadaId ?? undefined}
            />
        </div>
    );
};

export default DietaAplicadaTable;