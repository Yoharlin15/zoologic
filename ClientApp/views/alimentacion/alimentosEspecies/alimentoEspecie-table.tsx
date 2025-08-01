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
import { IAlimentoEspecie } from "#interfaces";
import AlimentoEspecieSidebarCreate from "./alimentoEspecie-sidebar-create";

interface IAlimentoEspecieTableProps {
    dispatch: React.Dispatch<any>;
}

const AlimentoEspecieTable = ({ dispatch }: IAlimentoEspecieTableProps) => {
    const AlimentoEspecie = AppQueryHooks.useFetchAlimentosEspecies();
    const [selectedAlimentoEspecie, setSelectedAlimentoEspecie] = useState<IAlimentoEspecie>();

    const navigate = useNavigate();

    const cm = useRef<ContextMenu>(null);

    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedAlimentoEspecieId, setSelectedAlimentoEspecieId] = useState<number | null>(null);

    const menuModel = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                if (selectedAlimentoEspecie) {
                    setSelectedAlimentoEspecieId(selectedAlimentoEspecie.AliementoEspecieId);
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

    const columns = useMemo<ICardTableProps<IAlimentoEspecie>["columns"]>(
        () => [
            {
                filter: true,
                sortable: true,
                header: "Alimento",
                field: "AlimentoNombre",
                style: { minWidth: "12rem" },
            },

            {
                filter: true,
                sortable: true,
                header: "Especie",
                field: "NombreComun",
                style: { minWidth: "12rem" },
            },
        ],
        []
    );

    const filteredAlimentosEspecies = useMemo(() => {
        if (!Array.isArray(AlimentoEspecie.data)) return [];
        return AlimentoEspecie.data.filter((t: IAlimentoEspecie) =>
            t.AlimentoNombre?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [AlimentoEspecie.data, searchText]);

    return (
        <div className="h-full">
            <ContextMenu
                ref={cm}
                model={menuModel}
                onHide={() => setSelectedAlimentoEspecie(undefined)}
            />
            <CardTable<IAlimentoEspecie>
                title="Alimentos segun las especies"
                columns={columns}
                value={filteredAlimentosEspecies}
                skeletonLoading={AlimentoEspecie.isPending}
                onChangeSearch={debounce({ delay: 500 }, (e) =>
                    setSearchText(e.target.value)
                )}
                renderHeadActions={[
                    <Button
                        key="btn_add"
                        onClick={() => {
                            setSelectedAlimentoEspecieId(null);
                            setSidebarCreateVisible(true);
                        }}
                        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
                        label="Nuevo alimento"
                    />
                ]}
                tableProps={{
                    rows: 8,
                    size: "small",
                    filters,
                    dataKey: "AlimentoEspecieId",
                    loading: AlimentoEspecie.isFetching,
                    paginator: filteredAlimentosEspecies.length > 8,
                    contextMenuSelection: selectedAlimentoEspecie,
                    onContextMenu: (e) => cm.current?.show(e.originalEvent),
                    onContextMenuSelectionChange: (
                        e: DataTableSelectionSingleChangeEvent<IAlimentoEspecie[]>
                    ) => setSelectedAlimentoEspecie(e.value),
                }}
            />
            <AlimentoEspecieSidebarCreate
                visible={sidebarCreateVisible}
                onHide={() => setSidebarCreateVisible(false)}
                alimentoEspecieId={selectedAlimentoEspecieId ?? undefined}
            />
        </div>
    );
};

export default AlimentoEspecieTable;