import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IEspecie } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../../components/card-table";
import { SplitButton } from 'primereact/splitbutton';
import EspecieSidebarForm from "./especie-sidebar-form";
import CardTableImage, { ICardTableImageProps } from "ClientApp/components/card-table/card-table-image";

interface IEspecieTableProps {
  dispatch: React.Dispatch<any>;
}

const EspecieTable = ({ dispatch }: IEspecieTableProps) => {

  const especie = AppQueryHooks.useFetchEspecies();
  const [selectedEspecie, setSelectedEspecie] = useState<IEspecie>();

  const cm = useRef<ContextMenu>(null);
  const navigate = useNavigate();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedEspecieId, setSelectedEspecieId] = useState<number | null>(null);

  const menuModel = [
    {},
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedEspecie) {
          setSelectedEspecieId(selectedEspecie.EspecieId);
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
  const [filters, setFilters] = useState<DataTableFilterMeta>();

  const columns = useMemo<ICardTableImageProps<IEspecie>["columns"]>(
    () => [
      {
        header: "Imagen",
        field: "FotoUrl", // este campo debe existir en los datos de especie
        isImage: true,
        style: { minWidth: "5rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Nombre Cientifico",
        field: "NombreCientifico",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Nombre Comun",
        field: "NombreComun",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Familia",
        field: "FamiliaNombre",
        style: { minWidth: "6rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Clase",
        field: "ClaseNombre",
        style: { minWidth: "6rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Procedencia",
        field: "ProcedenciaNombre",
        style: { minWidth: "6rem" },
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
      <CardTableImage<IEspecie>
        title="Lista de Especies"
        columns={columns}
        value={filteredEspecies}
        skeletonLoading={especie.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <SplitButton
            key="btn_add_split"
            label="Nueva especie"
            severity="success"
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            color="primary"
            onClick={() => {
              setSelectedEspecieId(null);
              setSidebarVisible(true);
            }}
            model={[
              {
                label: "Ir a vista especie",
                icon: "pi pi-directions",
                command: () => navigate("/especie"),
              },
            ]}
          />
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
      <EspecieSidebarForm
        id={selectedEspecieId ?? undefined} // importante para edición
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        especieId={undefined}
      />
    </div>
  );
};

export default EspecieTable;
