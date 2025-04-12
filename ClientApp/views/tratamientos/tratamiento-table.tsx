import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
    useCallback,
  } from "react";
  import { debounce } from "radash";
  import { ITratamiento } from "#interfaces";
  import { AppQueryHooks } from "#hooks";
  import { Button } from "primereact/button";
  import { Calendar } from "primereact/calendar";
  import { Skeleton } from "primereact/skeleton";
  import { Routes, Reducers } from "#core";
  import { ContextMenu } from "primereact/contextmenu";
  import { useNavigate, generatePath } from "react-router-dom";
  import {
    DataTableFilterMeta,
    DataTableSelectionSingleChangeEvent,
  } from "primereact/datatable";
  
  import { ColumnFilterElementTemplateOptions } from "primereact/column";
  import { constants } from "buffer";
  import { CardTable, ICardTableProps } from "../../components/card-table";
  import { fileURLToPath } from "url";

  interface ITratamientoTableProps {
    dispatch: React.Dispatch<any>;
  }
  
  const TratamientoTable = ({ dispatch }: ITratamientoTableProps) => {
    const tratamiento = AppQueryHooks.useFetchTratamientos();
    const [selectedTratamiento, setSelectedTratamiento] = useState<ITratamiento>();
  
    const navigate = useNavigate();
  
    const cm = useRef<ContextMenu>(null);
  
    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedTratamientoId, setSelectedTratamientoId] = useState<number | null>(null);
  
    const menuModel = [
      {
        
      },
      {
        label: "Editar",
        icon: "pi pi-pencil",
        command: () => {
          if (selectedTratamiento) {
            setSelectedTratamientoId(selectedTratamiento.TratamientoId);
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
    const [filters, setFilters] = useState<DataTableFilterMeta>(
    );
  
    const columns = useMemo<ICardTableProps<ITratamiento>["columns"]>(
      () => [
        {
          filter: true,
          sortable: true,
          header: "ID",
          field: "TratamientoId",
          style: { minWidth: "10rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Tratamiento",
          field: "NombreTratamiento",
          style: { minWidth: "17rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Especie",
          field: "NombreComun",
          style: { minWidth: "16rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Habitat",
          field: "NombreHabitat",
          style: { minWidth: "10rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "FechaEntrada",
          field: "FechaSalida",
          style: { minWidth: "10em" },
        },
        {
          filter: true,
          sortable: true,
          header: "Tratado por",
          field: "NombreUsuario",
          style: { minWidth: "18em" },
          
        }

      ],
      []
    );
  
    const filteredTratamientos = useMemo(() => {
      if (!Array.isArray(tratamiento.data)) return [];
      return tratamiento.data.filter((t) =>
        t.NombreComun?.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [tratamiento.data, searchText]);
  
    return (
      <div className="h-full p-4">
        <ContextMenu
          ref={cm}
          model={menuModel}
          onHide={() => setSelectedTratamiento(undefined)}
        />
        <CardTable<ITratamiento>
          title="Tratamientos realizados"
          columns={columns}
          value={filteredTratamientos}
          skeletonLoading={tratamiento.isPending}
          onChangeSearch={debounce({ delay: 500 }, (e) =>
            setSearchText(e.target.value)
          )}
          renderHeadActions={[
            <Button
              key="btn_add"
              onClick={() => {
                setSelectedTratamientoId(null);
                setSidebarCreateVisible(true);
              }}
            >
              <i className="pi pi-plus mr-2"></i>
              <span className="hidden md:flex">Nueva Empleado</span>
            </Button>,
          ]}
          tableProps={{
            rows: 8,
            size: "small",
            filters,
            dataKey: "TratamientoId",
            loading: tratamiento.isFetching,
            paginator: filteredTratamientos.length > 8,
            contextMenuSelection: selectedTratamiento,
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<ITratamiento[]>
            ) => setSelectedTratamiento(e.value),
          }}
        />
      </div>
    );
  };
  
  export default TratamientoTable;