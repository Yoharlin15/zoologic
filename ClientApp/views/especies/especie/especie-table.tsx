import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
  useEffect
} from "react";
import { debounce } from "radash";
import { IClase, IEspecie, IFamilia, IProcedencia } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Button } from "primereact/button";
import CardTableImage, { ICardTableImageProps } from "ClientApp/components/card-table/card-table-image";
import { SplitButton } from 'primereact/splitbutton';
import { CascadeSelect, CascadeSelectChangeEvent } from "primereact/cascadeselect";
import { useFetchCategorias } from "ClientApp/hooks/useFetch";
import EspecieSidebarForm from "./especie-sidebar-form";

interface IEspecieTableProps {
  dispatch: React.Dispatch<any>;
}

interface ICategoriaOption {
  name: string;
  code: string;
  items: Array<{
    name: string;
    code: number;
  }>;
}

interface IFiltroCategoria {
  code: 'Familia' | 'Clase' | 'Procedencia';
  item: {
    code: number;
    name: string;
  };
}

const EspecieTable = ({ dispatch }: IEspecieTableProps) => {
  const especie = AppQueryHooks.useFetchEspecies();
  const { data: categoriasData, isLoading, error } = useFetchCategorias();

  const [selectedEspecie, setSelectedEspecie] = useState<IEspecie>();
  const [selectedEspecieId, setSelectedEspecieId] = useState<number | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>();

  const [filtroCategoria, setFiltroCategoria] = useState<IFiltroCategoria | null>(null);

  const cm = useRef<ContextMenu>(null);
  const navigate = useNavigate();

  // Debug: Verificar cambios en el filtro
  useEffect(() => {
    console.log('Filtro actualizado:', filtroCategoria);
  }, [filtroCategoria]);

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

  // Transformar los datos de categorías para el CascadeSelect
  const categoriasOptions = useMemo<ICategoriaOption[]>(() => {
    if (!categoriasData) return [];

    // Función para eliminar duplicados y mapear items
    const processCategory = <T extends { [key: string]: any }>(
      items: T[],
      idKey: string,
      nameKey: string
    ) => {
      const seen = new Set();
      return items
        ?.filter(item => item && item[idKey] && item[nameKey])
        ?.filter(item => {
          const duplicate = seen.has(item[idKey]);
          seen.add(item[idKey]);
          return !duplicate;
        })
        ?.map(item => ({
          name: item[nameKey],
          code: item[idKey]
        })) || [];
    };

    return [
      {
        name: "Familias",
        code: "Familia",
        items: processCategory<IFamilia>(categoriasData.Familias, 'FamiliaId', 'FamiliaNombre')
      },
      {
        name: "Clases",
        code: "Clase",
        items: processCategory<IClase>(categoriasData.Clases, 'ClaseId', 'ClaseNombre')
      },
      {
        name: "Procedencias",
        code: "Procedencia",
        items: processCategory<IProcedencia>(categoriasData.Procedencias, 'ProcedenciaId', 'ProcedenciaNombre')
      }
    ];
  }, [categoriasData]);

  const columns = useMemo<ICardTableImageProps<IEspecie>["columns"]>(
    () => [
      {
        header: "Imagen",
        field: "FotoUrl",
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
      },
    ],
    []
  );

  const filteredEspecies = useMemo(() => {
    if (!especie.data || !Array.isArray(especie.data)) return [];

    return especie.data.filter((t: IEspecie) => {
      // Filtro por texto de búsqueda
      const coincideBusqueda = searchText
        ? t.NombreComun?.toLowerCase().includes(searchText.toLowerCase()) ||
        t.NombreCientifico?.toLowerCase().includes(searchText.toLowerCase())
        : true;

      // Filtro por categoría
      let coincideFiltro = true;
      if (filtroCategoria) {
        const propiedadId = `${filtroCategoria.code}Id` as keyof IEspecie;
        const propiedadNombre = `${filtroCategoria.code}Nombre` as keyof IEspecie;

        // Comparamos tanto por ID como por nombre por si hay inconsistencias
        const valorEspecieId = t[propiedadId];
        const valorEspecieNombre = t[propiedadNombre];
        const valorFiltroId = filtroCategoria.item.code;
        const valorFiltroNombre = filtroCategoria.item.name;

        coincideFiltro = (
          (Number(valorEspecieId) === Number(valorFiltroId)) ||
          (String(valorEspecieNombre).toLowerCase() === String(valorFiltroNombre).toLowerCase())
        );
      }

      return coincideBusqueda && coincideFiltro;
    });
  }, [especie.data, searchText, filtroCategoria]);

  const limpiarFiltros = () => {
    setSearchText("");
    setFiltroCategoria(null);
  };

  const handleCategoriaChange = (e: CascadeSelectChangeEvent) => {
    const selectedItem = e.value;

    if (!selectedItem) {
      setFiltroCategoria(null);
      return;
    }

    const grupoEncontrado = categoriasOptions.find(grupo =>
      grupo.items.some(item => item.code === selectedItem.code)
    );

    if (grupoEncontrado) {
      setFiltroCategoria({
        code: grupoEncontrado.code as 'Familia' | 'Clase' | 'Procedencia',
        item: {
          code: Number(selectedItem.code), // Asegurar que es número
          name: selectedItem.name
        }
      });
    } else {
      setFiltroCategoria(null);
    }
  };

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
          <div key="filter-actions" className="flex gap-4 items-center">
            {isLoading ? (
              <div className="w-80 p-inputtext p-component">
                <i className="pi pi-spinner pi-spin mr-2"></i>
                Cargando categorías...
              </div>
            ) : error ? (
              <div className="w-80 p-inputtext p-component text-red-500">
                <i className="pi pi-exclamation-triangle mr-2"></i>
                Error al cargar categorías
              </div>
            ) : (
              <CascadeSelect
                value={filtroCategoria?.item ?? null}
                options={categoriasOptions}
                optionLabel="name"
                optionGroupLabel="name"
                optionGroupChildren={["items"]}
                className="w-80"
                placeholder="Filtrar por categoría"
                onChange={handleCategoriaChange}
                breakpoint="767px"
              />
            )}

            <SplitButton
              key="btn_add_split"
              label="Nueva especie"
              severity="success"
              className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
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

            {filtroCategoria && (
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text"
                tooltip="Limpiar filtros"
                tooltipOptions={{ position: 'top' }}
                onClick={limpiarFiltros}
              />
            )}
          </div>
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
        id={selectedEspecieId ?? undefined}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        especieId={undefined}
      />
    </div>
  );
};

export default EspecieTable;