import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IAnimal } from "#interfaces";
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

import AnimalSidebarCreate from "./animal-sidebar-form";
import { Reducers } from "#core";
import AnimalSidebarForm from "./animal-sidebar-form";
import HabitatModalUpdate from "./animal-habitat-form";

interface IAnimalTableProps {
  dispatch: React.Dispatch<any>;
}

const AnimalTable = ({ dispatch }: IAnimalTableProps) => {

  const [habitatModalVisible, setHabitatModalVisible] = useState(false);
  const [animalIdToAssignHabitat, setAnimalIdToAssignHabitat] = useState<number | undefined>(undefined);
  const [especieIdToAssignHabitat, setEspecieIdToAssignHabitat] = useState<number | undefined>(undefined);


  const animal = AppQueryHooks.useFetchAnimales();
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
      label: "Asignar habitat",
      icon: "pi pi-clipboard",
      command: () => {
        if (selectedAnimal) {
          setAnimalIdToAssignHabitat(selectedAnimal.AnimalId);
          setEspecieIdToAssignHabitat(selectedAnimal.EspecieId);
          setHabitatModalVisible(true);
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
        style: { minWidth: "12rem" },
        body: (rowData: IAnimal | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Padre",
        field: "Padre",
        style: { minWidth: "15em" },
      },
      {
        filter: true,
        sortable: true,
        header: "Madre",
        field: "Madre",
        style: { minWidth: "15em" },
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
        id={selectedAnimalId ?? undefined} // importante para edición
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

    </div>
  );
};

export default AnimalTable;