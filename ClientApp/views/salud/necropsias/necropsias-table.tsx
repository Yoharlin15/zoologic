import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { INecropsia } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../../components/card-table";
import dayjs from "dayjs";
import { Reducers } from "#core";
import { SplitButton } from "primereact/splitbutton";

interface INecropsiaTableProps {
  dispatch: React.Dispatch<any>;
}

const NecropsiaTable = ({ dispatch }: INecropsiaTableProps) => {
  const navigate = useNavigate();
  const necropsia = AppQueryHooks.useFetchNecropsias();
  const [selectedNecropsia, setSelectedNecropsia] = useState<INecropsia>();
  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedNecropsiaId, setSelectedNecropsiaId] = useState<number | null>(null);

  const menuModel = [
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
  const [filters, setFilters] = useState<DataTableFilterMeta>({});

  const columns = useMemo<ICardTableProps<INecropsia>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Animal(alias)",
        field: "Alias",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Causa de muerte",
        field: "CausaMuerte",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de muerte",
        field: "FechaMuerte",
        style: { minWidth: "12rem" },
        body: (rowData: INecropsia | null) => {
          if (!rowData?.FechaMuerte) return "";
          return dayjs(rowData.FechaMuerte).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de necropsia",
        field: "FechaNecropsia",
        style: { minWidth: "12rem" },
        body: (rowData: INecropsia | null) => {
          if (!rowData?.FechaNecropsia) return "";
          return dayjs(rowData.FechaNecropsia).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Examen realizado",
        field: "Examen",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Realizada por",
        field: "NombreUsuario",
        style: { minWidth: "12rem" },
      },
    ],
    []
  );

  const filteredNecropsias = useMemo(() => {
    if (!Array.isArray(necropsia.data)) return [];
    return necropsia.data.filter((t) =>
      t.Alias?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [necropsia.data, searchText]);

  return (
    <div className="h-full">
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
          <SplitButton
            key="btn_add_split"
            label="Nueva necropsia"
            severity="success"
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            color="primary"
            onClick={() => {
              setSelectedNecropsiaId(null);
              setSidebarCreateVisible(true);
            }}
            model={[
              {
                label: "Ir a vista salud",
                icon: "pi pi-directions",
                command: () => navigate("/menu"),
              },
            ]}
          />

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
      {/* <TratamientoAplicadoSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedTratamientoAplicadoId ?? undefined}
      /> */}
    </div>
  );
};

export default NecropsiaTable;