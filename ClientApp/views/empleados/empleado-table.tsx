import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IEmpleado } from "#interfaces";
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
import EmpleadoSidebarCreate from "./empleado-sidebar-form";
import EmpleadoSidebarForm from "./empleado-sidebar-form";

interface IEmpleadoTableProps {
  dispatch: React.Dispatch<any>;
}

const EmpleadoTable = ({ dispatch }: IEmpleadoTableProps) => {
  const empleado = AppQueryHooks.useFetchEmpleados();
  const [selectedEmpleado, setSelectedEmpleado] = useState<IEmpleado>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedEmpleado) {
          setSelectedEmpleadoId(selectedEmpleado.EmpleadoId);
          setSidebarVisible(true);
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
        header: "Fecha de nacimiento",
        field: "FechaNacimiento",
        style: { minWidth: "12rem" },
        body: (rowData: IEmpleado | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
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
        header: "Telefono",
        field: "Telefono",
        style: { minWidth: "12em" },
      },

      {
        filter: true,
        sortable: true,
        header: "Nacionalidad",
        field: "Nacionalidad",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Nacionalidad",
        field: "Nacionalidad",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Dirección",
        field: "Direccion",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Cargo",
        field: "CargoNombre",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de contratacion",
        field: "FechaContratacion",
        style: { minWidth: "12rem" },
        body: (rowData: IEmpleado | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Departamento",
        field: "NombreDepartamento",
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
    if (!Array.isArray(empleado.data)) return [];
    return empleado.data.filter((t) =>
      t.Sexo?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [empleado.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedEmpleado(undefined)}
      />
      <CardTable<IEmpleado>
        title="Lista de Empleados"
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
              setSidebarVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo empleado"
          />

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
      <EmpleadoSidebarForm
        id={selectedEmpleadoId ?? undefined} // importante para edición
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        animalId={undefined}
      />
    </div>
  );
};

export default EmpleadoTable;