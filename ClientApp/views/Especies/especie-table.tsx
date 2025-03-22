import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import { debounce } from "radash";
import { IEspecie } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import { Routes, Redurces } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate, generatePath } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { constants } from "buffer";
import { CardTable, ICardTableProps } from "../../components/card-table";
import EspecieSidebarCreate from "./especie-sidebar-Create";
import EspecieSidebarUpdate from "./especie-sidebar-Update";

interface IEspecieTableProps {
  dispatch: React.Dispatch<any>;
}

const EspecieTable = ({ dispatch }: IEspecieTableProps) => {
  const especie = AppQueryHooks.useFetchEspecies();
  const [selectedEspecie, setSelectedEspecie] = useState<IEspecie>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedEspecieId, setSelectedEspecieId] = useState<number | null>(null);

  const menuModel = [
    {
      
    },
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedEspecie) {
          setSelectedEspecieId(selectedEspecie.EspecieId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
  ];

  const [confirmState, confirmDispatch] = useReducer(Redurces.DialogsReducer, {
    id: 0,
    visible: false,
  });
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>(
  );

  const columns = useMemo<ICardTableProps<IEspecie>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        field: "EspecieId",
        header: "EspecieId",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Nombre Cientifico",
        field: "NombreCientifico",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Nombre Comun",
        field: "NombreComun",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Familia",
        field: "Familia",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Clase",
        field: "Clase",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Sexo",
        field: "Sexo",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de Llegada",
        field: "FechaLlegada", 
        type: "date", 
        dateFormat: "DD/MM/YYYY", 
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Procedencia",
        field: "Procedencia",
        style: { minWidth: "18rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Observaciones",
        field: "Observaciones",
        style: { minWidth: "25rem" },
      }
    ],
    []
  );

  const filteredEspecies = useMemo(() => {
    if (!Array.isArray(especie.data)) return [];
    return especie.data.filter((t) =>
      t.NombreComun?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [especie.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedEspecie(undefined)}
      />
      <CardTable<IEspecie>
        title="Especies"
        columns={columns}
        value={filteredEspecies}
        skeletonLoading={especie.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedEspecieId(null);
              setSidebarCreateVisible(true);
            }}
          >
            <i className="pi pi-plus mr-2"></i>
            <span className="hidden md:flex">Nueva Especie</span>
          </Button>,
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "EspecieId",
          loading: especie.isFetching,
          paginator: filteredEspecies.length > 8,
          contextMenuSelection: selectedEspecie,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IEspecie[]>
          ) => setSelectedEspecie(e.value),
        }}
      />
      <EspecieSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedEspecieId ?? undefined}
      />

      <EspecieSidebarUpdate
        visible={sidebarUpdateVisible}
        onHide={() => setSidebarUpdateVisible(false)}
        especieId={selectedEspecieId ?? undefined}
      />
    </div>
  );
};

export default EspecieTable;
