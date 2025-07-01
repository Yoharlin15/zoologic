import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
} from "react";
import { debounce } from "radash";
import { IComportamiento } from "#interfaces";
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
import { Reducers } from "#core";
import dayjs from "dayjs";
import ComportamientoSidebarCreate from "./comportamiento-sidebar-create";
import { SplitButton } from "primereact/splitbutton";

interface IComportamientoTableProps {
    dispatch: React.Dispatch<any>;
}

const ComportamientoTable = ({ dispatch }: IComportamientoTableProps) => {
    const comportamiento = AppQueryHooks.useFetchComportamientos();
    const [selectedComportamiento, setSelectedEmpleado] = useState<IComportamiento>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);
    const menu = useRef<Menu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedComportamientoId, setSelectedComportamientoId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedComportamiento) {
                    setSelectedComportamientoId(selectedComportamiento.ComportamientoId);
                    setSidebarUpdateVisible(true);
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

    const columns = useMemo<ICardTableProps<IComportamiento>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Animal (alias)",
                field: "Alias",
                style: { minWidth: "12rem" },
            },

            {
                filter: true,
                sortable: true,
                header: "Registrado por",
                field: "NombreUsuario",
                style: { minWidth: "12rem" },
            },

            {
                filter: true,
                sortable: true,
                header: "Fecha de registro",
                field: "Fecha",
                style: { minWidth: "12rem" },
                body: (rowData: IComportamiento | null) => {
                    if (!rowData?.Fecha) return "";
                    return dayjs(rowData.Fecha).format("DD/MM/YYYY");
                },
            },

            {
                filter: true,
                sortable: true,
                header: "Habitat",
                field: "Nombre",
                style: { minWidth: "12em" },
            },

            {
                filter: true,
                sortable: true,
                header: "Comportamiento",
                field: "DetallesComportamiento",
                style: { minWidth: "12em" },
            },
        ],
        []
    );

    const filteredComportamientos = useMemo(() => {
        if (!Array.isArray(comportamiento.data)) return [];
        return comportamiento.data.filter((t) =>
            t.Alias?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [comportamiento.data, searchText]);

    return (
        <div className="h-full">
            <ContextMenu
                ref={cm}
                model={menuModel}
                onHide={() => setSelectedEmpleado(undefined)}
            />
            <CardTable<IComportamiento>
                title="Reporte diario de comportamientos"
                columns={columns}
                value={filteredComportamientos}
                skeletonLoading={comportamiento.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <SplitButton
                        key="btn_add_split"
                        label="Registrar comportamiento"
                        severity="success"
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        color="primary"
                        onClick={() => {
                            setSelectedComportamientoId(null);
                            setSidebarCreateVisible(true);
                        }}
                        model={[
                            {
                                label: "Ir a vista especie",
                                icon: "pi pi-directions",
                                command: () => navigate("/detalleComportamiento"),
                            },
                        ]}
                    />

                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "ComportamientoId",
                    loading: comportamiento.isFetching,
                    paginator: filteredComportamientos.length > 8,
                    contextMenuSelection: selectedComportamiento,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IComportamiento[]>
                    ) => setSelectedEmpleado(e.value),
                }}
            />
            <ComportamientoSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                especieId={selectedComportamientoId ?? undefined}
            />
        </div>
    );
};

export default ComportamientoTable;