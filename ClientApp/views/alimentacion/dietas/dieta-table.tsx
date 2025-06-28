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

// import HabitatSidebarCreate from "./Habitat-sidebar-create";
import { Reducers, Routes } from "#core";
import { IDieta } from "ClientApp/interfaces/alimentacion";
import DietaSidebarCreate from "./dieta-sidebar-create";

interface IDietaTableProps {
    dispatch: React.Dispatch<any>;
}

const DietaTable = ({ dispatch }: IDietaTableProps) => {
    const Dieta = AppQueryHooks.useFetchDietas();
    const [selectedDieta, setSelectedDieta] = useState<IDieta>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedDietaId, setSelectedDietaId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedDieta) {
                    setSelectedDietaId(selectedDieta.DietaId);
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

    const columns = useMemo<ICardTableProps<IDieta>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Dieta",
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

    const filteredDietas = useMemo(() => {
        if (!Array.isArray(Dieta.data)) return [];
        return Dieta.data.filter((t) =>
            t.Nombre?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [Dieta.data, searchText]);

    return (
        <div className="h-full">

            <CardTable<IDieta>
                title="Dietas"
                columns={columns}
                value={filteredDietas}
                skeletonLoading={Dieta.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <Button
                        key="btn_add"
                        onClick={() => {
                            setSelectedDietaId(null);
                            setSidebarCreateVisible(true);
                        }}
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        label="Nueva dieta"
                    />
                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "DietaId",
                    loading: Dieta.isFetching,
                    paginator: filteredDietas.length > 8,
                    contextMenuSelection: selectedDieta,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IDieta[]>
                    ) => setSelectedDieta(e.value),
                }}
            />
            <DietaSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                dietaId={selectedDietaId ?? undefined}
            />
        </div>
    );
};

export default DietaTable;