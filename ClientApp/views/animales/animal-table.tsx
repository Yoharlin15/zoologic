import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IAnimal } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
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
import AnimalSidebarForm from "./animal-sidebar-form";
import HabitatModalUpdate from "./animal-habitat-form";
import ChangeStateModal from "./ChangeStateModal";

interface IAnimalTableProps {
  dispatch: React.Dispatch<any>;
}

const AnimalTable = ({ dispatch }: IAnimalTableProps) => {
  const [habitatModalVisible, setHabitatModalVisible] = useState(false);
  const [animalIdToAssignHabitat, setAnimalIdToAssignHabitat] = useState<number | undefined>(undefined);
  const [especieIdToAssignHabitat, setEspecieIdToAssignHabitat] = useState<number | undefined>(undefined);

  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [animalIdToChangeState, setAnimalIdToChangeState] = useState<number | undefined>(undefined);

  const animal = AppQueryHooks.useFetchAnimales();
  const updateAnimalEstado = AppMutationHooks.useUpdateAnimalEstado(); // Hook para actualizar estado
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedAnimal) {
          setSelectedAnimalId(selectedAnimal.AnimalId);
          setSidebarVisible(true);
        }
      },
    },
    {
      label: "Detalles",
      icon: "pi pi-objects-column",
      command: () => {
        if (selectedAnimal) {
          navigate(`/animales/${selectedAnimal.AnimalId}`);
        }
      },
    },
    {
      label: "Cambiar estado",
      icon: "pi pi-flag",
      command: () => {
        if (selectedAnimal) {
          setAnimalIdToChangeState(selectedAnimal.AnimalId);
          setStateModalVisible(true);
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

  const columns = useMemo<ICardTableProps<IAnimal>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Codigo",
        field: "IdentificadorUnico",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Identificador",
        field: "TipoIdentificador",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Animal(Alias)",
        field: "Alias",
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
        header: "Sexo",
        field: "Sexo",
        style: { minWidth: "10rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de nacimiento",
        field: "FechaNacimiento",
        style: { minWidth: "18rem" },
        body: (rowData: IAnimal | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
      },
      {
        filter: true,
        sortable: true,
        header: "Creado por",
        field: "NombreUsuario",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de creacion",
        field: "FechaCreacion",
        style: { minWidth: "18rem" },
        body: (rowData: IAnimal | null) => {
          if (!rowData?.FechaCreacion) return "";
          return dayjs(rowData.FechaCreacion).format("DD/MM/YYYY");
        },
      },
    ],
    []
  );

  const filteredAnimales = useMemo(() => {
    if (!Array.isArray(animal.data)) return [];
    return animal.data.filter((t) =>
      t.IdentificadorUnico?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [animal.data, searchText]);

  const handleStateChange = async (AnimalId: number, newState: string) => {
    try {
      // Ejecutamos la mutación para actualizar el estado
      await updateAnimalEstado.mutateAsync({
        AnimalId,
        EstadoId: parseInt(newState) // Convertimos a número si es necesario
      });
      
      // Actualizamos la lista de animales
      await animal.refetch();
      
      // Mostramos mensaje de éxito
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          severity: "success",
          summary: "Éxito",
          detail: "Estado del animal actualizado correctamente",
        },
      });
    } catch (error) {
      // Mostramos mensaje de error
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          severity: "error",
          summary: "Error",
          detail: "No se pudo actualizar el estado del animal",
        },
      });
    } finally {
      // Cerramos el modal
      setStateModalVisible(false);
    }
  };

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
              setSidebarVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo Animal"
          />
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
      
      <AnimalSidebarForm
        id={selectedAnimalId ?? undefined}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        especieId={undefined}
      />
      
      <HabitatModalUpdate
        visible={habitatModalVisible}
        idAnimal={animalIdToAssignHabitat}
        especieId={especieIdToAssignHabitat}
        onHide={() => setHabitatModalVisible(false)}
      />

      <ChangeStateModal
        visible={stateModalVisible}
        animalId={animalIdToChangeState}
        onHide={() => setStateModalVisible(false)}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default AnimalTable;