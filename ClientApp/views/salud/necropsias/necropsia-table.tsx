import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
    useCallback,
  } from "react";
  import { debounce } from "radash";
  import { INecropsia } from "#interfaces";
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
  import { CardTable, ICardTableProps } from "../../../components/card-table";
  import { fileURLToPath } from "url";

  interface INecropsiaTableProps {
    dispatch: React.Dispatch<any>;
  }
  
  const NecropsiaTable = ({ dispatch }: INecropsiaTableProps) => {
    const necropsia = AppQueryHooks.useFetchNecropsias();
    const [selectedNecropsia, setSelectedNecropsia] = useState<INecropsia>();
  
    const navigate = useNavigate();
  
    const cm = useRef<ContextMenu>(null);
  
    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedTratamientoId, setSelectedNecropsiaId] = useState<number | null>(null);
  
    const menuModel = [
      {
        
      },
      {
        label: "Editar",
        icon: "pi pi-pencil",
        command: () => {
          if (selectedNecropsia) {
            setSelectedNecropsiaId(selectedNecropsia.NecropsiaId);
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
  
    const columns = useMemo<ICardTableProps<INecropsia>["columns"]>(
      () => [
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
          header: "Fecha de Muerte",
          field: "FechaMuerte",
          style: { minWidth: "10rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Procedencia",
          field: "Procedencia",
          style: { minWidth: "10em" },
        },
        {
          filter: true,
          sortable: true,
          header: "Tratado por",
          field: "NombreUsuario",
          style: { minWidth: "18em" },
        },
        {
            filter: true,
            sortable: true,
            header: "Fecha de Necropsia",
            field: "FechaNecropsia",
            style: { minWidth: "10rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Historia",
            field: "Historia",
            style: { minWidth: "10rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Examen",
            field: "Examen",
            style: { minWidth: "10rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Registrado por",
            field: "NombreUsuario",
            style: { minWidth: "10rem" },
        },
      ],
      []
    );
  
    const filteredNecropsias = useMemo(() => {
      if (!Array.isArray(necropsia.data)) return [];
      return necropsia.data.filter((t) =>
        t.NombreComun?.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [necropsia.data, searchText]);
  
    return (
      <div className="h-full p-4">
        <ContextMenu
          ref={cm}
          model={menuModel}
          onHide={() => setSelectedNecropsia(undefined)}
        />
        <CardTable<INecropsia>
          title="Necropsias realizadas"
          columns={columns}
          value={filteredNecropsias}
          skeletonLoading={necropsia.isPending}
          onChangeSearch={debounce({ delay: 500 }, (e) =>
            setSearchText(e.target.value)
          )}
          renderHeadActions={[
            <Button
              key="btn_add"
              onClick={() => {
                setSelectedNecropsiaId(null);
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
            dataKey: "NecropsiaId",
            loading: necropsia.isFetching,
            paginator: filteredNecropsias.length > 8,
            contextMenuSelection: selectedNecropsia,
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<INecropsia[]>
            ) => setSelectedNecropsia(e.value),
          }}
        />
      </div>
    );
  };
  
  export default NecropsiaTable;