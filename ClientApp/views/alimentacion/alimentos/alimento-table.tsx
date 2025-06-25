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
import { Reducers } from "#core";
import { IAlimento } from "#interfaces";
import AlimentoSidebarCreate from "./alimento-sidebar-create";

interface IAlimentoTableProps {
    dispatch: React.Dispatch<any>;
}

const AlimentoTable = ({ dispatch }: IAlimentoTableProps) => {
    const Alimento = AppQueryHooks.useFetchAlimentos();
    const [selectedAlimento, setSelectedDietaAplicada] = useState<IAlimento>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedAlimentoId, setSelectedAlimentoId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedAlimento) {
                    setSelectedAlimentoId(selectedAlimento.AlimentoId);
                    setSidebarUpdateVisible(true); // Abre el sidebar
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
                style: { minWidth: "12rem" },
            },

            {
                filter: true,
                sortable: true,
                header: "Descripcion",
                field: "Descripcion",
                style: { minWidth: "12rem" },
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
                            setSidebarCreateVisible(true);
                        }}
                    >
                        <i className="pi pi-plus mr-2"></i>
                        <span className="hidden md:flex">Agregar alimento</span>
                    </Button>,
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
            <AlimentoSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                alimentoId={selectedAlimentoId ?? undefined}
            />
        </div>
    );
};

export default AlimentoTable;