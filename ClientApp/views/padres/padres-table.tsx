import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
} from "react";
import { debounce } from "radash";
import { IAnimal, IEmpleado } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import {
    DataTableFilterMeta,
    DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../components/card-table";
import dayjs from "dayjs";
import { Reducers } from "#core";
import { IPadre } from "ClientApp/interfaces/padre";
import PadreSidebarCreate from "./padres-sidebar-create";

interface IPadreTableProps {
    dispatch: React.Dispatch<any>;
}

const PadreTable = ({ dispatch }: IPadreTableProps) => {
    const animal = AppQueryHooks.useFetchPadres();
    const [selectedPadre, setSelectedPadre] = useState<IPadre>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);
    const menu = useRef<Menu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedPadreId, setSelectedAnimalId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedPadre) {
                    setSelectedAnimalId(selectedPadre.AnimalPadreId);
                    setSidebarUpdateVisible(true); // Abre el sidebar
                }
            },
        },
        {
            label: "Detalles",
            icon: "pi pi-objects-column",
            command: () => {
                if (selectedPadre) {
                    navigate(`/animales/${selectedPadre.AnimalPadreId}`);
                }
            },
        }
    ];

    const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
        id: 0,
        visible: false,
    });
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const columns = useMemo<ICardTableProps<IPadre>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Padre alias",
                field: "PadreAlias",
                style: { minWidth: "12rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Madre alias",
                field: "MadreAlias",
                style: { minWidth: "12rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Especie",
                field: "NombreComun",
                style: { minWidth: "12rem" },
            },
            {
                filter: true,
                sortable: true,
                header: "Fecha de nacimiento de la cria",
                field: "FechaNacimientoCrias",
                style: { minWidth: "12rem" },
                body: (rowData: IPadre | null) => {
                    if (!rowData?.FechaNacimientoCrias) return "";
                    return dayjs(rowData.FechaNacimientoCrias).format("DD/MM/YYYY");
                },
            },
            {
                filter: true,
                sortable: true,
                header: "Numero de crias",
                field: "NumeroCrias",
                style: { minWidth: "10fem" },
            },
        ],
        []
    );

    const filteredEmpleados = useMemo(() => {
        if (!Array.isArray(animal.data)) return [];
        return animal.data.filter((t) =>
            t.PadreAlias?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [animal.data, searchText]);

    return (
        <div className="h-full">
            <ContextMenu
                ref={cm}
                model={menuModel}
                onHide={() => setSelectedPadre(undefined)}
            />
            <Menu model={menuModel} popup ref={menu} />
            <CardTable<IPadre>
                title="Lista de padres"
                columns={columns}
                value={filteredEmpleados}
                skeletonLoading={animal.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <Button
                        key="btn_add"
                        onClick={() => {
                            setSelectedAnimalId(null);
                            setSidebarCreateVisible(true);
                        }}
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        label="Nuevos padres"
                    />
                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "AnimalId",
                    loading: animal.isFetching,
                    paginator: filteredEmpleados.length > 8,
                    contextMenuSelection: selectedPadre,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IPadre[]>
                    ) => setSelectedPadre(e.value),
                }}
            />
            <PadreSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                padreId={selectedPadreId ?? undefined}
            />
        </div>
    );
};

export default PadreTable;