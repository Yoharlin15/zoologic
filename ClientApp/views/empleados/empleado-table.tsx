import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
    useCallback,
  } from "react";
  import { debounce } from "radash";
  import { IEmpleado } from "#interfaces";
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
  import { CardTable, EmpleadoCardTable, ICardTableEmpleadoProps } from "../../components/card-table";
import { fileURLToPath } from "url";

  interface IEmpleadoTableProps {
    dispatch: React.Dispatch<any>;
  }
  
  const EmpleadoTable = ({ dispatch }: IEmpleadoTableProps) => {
    const empleado = AppQueryHooks.useFetchEmpleados();
    const [selectedEmpleado, setSelectedEmpleado] = useState<IEmpleado>();
  
    const navigate = useNavigate();
  
    const cm = useRef<ContextMenu>(null);
  
    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<number | null>(null);
  
    const menuModel = [
      {
        
      },
      {
        label: "Editar",
        icon: "pi pi-pencil",
        command: () => {
          if (selectedEmpleado) {
            setSelectedEmpleadoId(selectedEmpleado.EmpleadoId);
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
  
    const columns = useMemo<ICardTableEmpleadoProps<IEmpleado>["columns"]>(
      () => [
        {
          filter: true,
          sortable: true,
          header: "EmpleadoId",
          field: "EmpleadoId",
          style: { minWidth: "10rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Nombres",
          field: "Nombres",
          style: { minWidth: "12rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Apellidos",
          field: "Apellidos",
          style: { minWidth: "12rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Cargo",
          field: "Cargo",
          style: { minWidth: "10rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Telefono",
          field: "Telefono",
          style: { minWidth: "10em" },
        },
        {
          filter: true,
          sortable: true,
          header: "FechaContratacion",
          field: "FechaContratacion",
          style: { minWidth: "15em" },
          
        }

      ],
      []
    );
  
    const filteredEmpleados = useMemo(() => {
      if (!Array.isArray(empleado.data)) return [];
      return empleado.data.filter((t) =>
        t.Nombres?.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [empleado.data, searchText]);
  
    return (
      <div className="h-full">
        <ContextMenu
          ref={cm}
          model={menuModel}
          onHide={() => setSelectedEmpleado(undefined)}
        />
        <EmpleadoCardTable<IEmpleado>
          title="Equipo del Zoologico"
          columns={columns}
          value={filteredEmpleados}
          skeletonLoading={empleado.isPending}
          onChangeSearch={debounce({ delay: 500 }, (e) =>
            setSearchText(e.target.value)
          )}
          renderHeadActions={[
            <Button
              key="btn_add"
              onClick={() => {
                setSelectedEmpleadoId(null);
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
            dataKey: "EmpleadoId",
            loading: empleado.isFetching,
            paginator: filteredEmpleados.length > 8,
            contextMenuSelection: selectedEmpleado,
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IEmpleado[]>
            ) => setSelectedEmpleado(e.value),
          }}
        />
      </div>
    );
  };
  
  export default EmpleadoTable;