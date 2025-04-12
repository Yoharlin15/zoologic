import React, {
    useState,
    useRef,
    useMemo,
    useReducer,
    useCallback,
  } from "react";
  import { debounce } from "radash";
  import { IAnimal } from "#interfaces";
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

  interface IAnimalTableProps {
    dispatch: React.Dispatch<any>;
  }
  
  const AnimalTable = ({ dispatch }: IAnimalTableProps) => {
    const animal = AppQueryHooks.useFetchAnimales();
    const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>();
  
    const navigate = useNavigate();
  
    const cm = useRef<ContextMenu>(null);
  
    const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
    const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);
  
    const menuModel = [
      {
        
      },
      {
        label: "Editar",
        icon: "pi pi-pencil",
        command: () => {
          if (selectedAnimal) {
            setSelectedAnimalId(selectedAnimal.AnimalId);
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
  
    const columns = useMemo<ICardTableProps<IAnimal>["columns"]>(
      () => [
        {
            filter: true,
            sortable: true,
            header: "ID",
            field: "AnimalId",
            style: { minWidth: "10rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Especie",
            field: "EspecieId",
            style: { minWidth: "12rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Sexo",
            field: "Sexo",
            style: { minWidth: "12rem" },
        },
        {
          filter: true,
          sortable: true,
          header: "Fecha de Llegada",
          field: "FechaNacimiento", 
          type: "date", 
          dateFormat: "DD/MM/YYYY", 
          style: { minWidth: "18rem" },
        },
        {
            filter: true,
            sortable: true,
            header: "Observaciones",
            field: "Observaciones",
            style: { minWidth: "10em" },
        },
        {
            filter: true,
            sortable: true,
            header: "Zona",
            field: "ZonaId",
            style: { minWidth: "15em" },
        },
        {
            filter: true,
            sortable: true,
            header: "Creador",
            field: "CreadoPor",
            style: { minWidth: "15em" },
        }
      ],
      []
    );
  
    const filteredAnimales = useMemo(() => {
      if (!Array.isArray(animal.data)) return [];
      return animal.data.filter((t) =>
        t.Sexo?.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [animal.data, searchText]);
  
    return (
      <div className="h-full">
        <ContextMenu
          ref={cm}
          model={menuModel}
          onHide={() => setSelectedAnimal(undefined)}
        />
        <CardTable<IAnimal>
          title="Lista de Animales"
          columns={columns}
          value={filteredAnimales}
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
            >
              <i className="pi pi-plus mr-2"></i>
              <span className="hidden md:flex">Nuevo Animal</span>
            </Button>,
          ]}
          tableProps={{
            rows: 8,
            size: "small",
            filters,
            dataKey: "AnimalId",
            loading: animal.isFetching,
            paginator: filteredAnimales.length > 8,
            contextMenuSelection: selectedAnimal,
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IAnimal[]>
            ) => setSelectedAnimal(e.value),
          }}
        />
      </div>
    );
  };
  
  export default AnimalTable;