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
import EmpleadoSidebarCreate from "./empleado-sidebar-create";

interface IEmpleadoTableProps {
  dispatch: React.Dispatch<any>;
}

const EmpleadoTable = ({ dispatch }: IEmpleadoTableProps) => {
  const animal = AppQueryHooks.useFetchEmpleados();
  const [selectedAnimal, setSelectedEmpleado] = useState<IEmpleado>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedEmpeladoId, setSelectedAnimalId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedAnimal) {
          setSelectedAnimalId(selectedAnimal.EmpleadoId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
    {
      label: "Detalles",
      icon: "pi pi-objects-column",
      command: () => {
        if (selectedAnimal) {
          navigate(`/animales/${selectedAnimal.EmpleadoId}`);
        }
      },
    }
  ];

  const optionsMenuModel = [
    {
      label: "Especies",
      icon: "pi pi-info-circle",
      command: () => {
        console.log("Opción 1 Especies");
      },
    },
    {
      label: "Opción 2",
      icon: "pi pi-cog",
      command: () => {
        console.log("Opción 2 seleccionada");
      },
    },
    {
      label: "Opción 3",
      icon: "pi pi-external-link",
      command: () => {
        console.log("Opción 3 seleccionada");
      },
    },
  ];

  const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({});

  const columns = useMemo<ICardTableProps<IEmpleado>["columns"]>(
    () => [
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
        header: "Cedula",
        field: "Cedula",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Telefono",
        field: "Telefono",
        style: { minWidth: "12em" },
      },

      {
        filter: true,
        sortable: true,
        header: "Usuario",
        field: "NombreUsuario",
        style: { minWidth: "12em" },
      },

      {
        filter: true,
        sortable: true,
        header: "Estado",
        field: "NombreEstado",
        style: { minWidth: "10fem" },
      },
      
    ],
    []
  );

  const filteredEmpleados = useMemo(() => {
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
        onHide={() => setSelectedEmpleado(undefined)}
      />
      <Menu model={optionsMenuModel} popup ref={menu} />
      <CardTable<IEmpleado>
        title="Lista de Empleados"
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
            label="Nuevo empleado"
          />
          
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "AnimalId",
          loading: animal.isFetching,
          paginator: filteredEmpleados.length > 8,
          contextMenuSelection: selectedAnimal,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IEmpleado[]>
          ) => setSelectedEmpleado(e.value),
        }}
      />
      <EmpleadoSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedEmpeladoId ?? undefined}
      />
    </div>
  );
};

export default EmpleadoTable;