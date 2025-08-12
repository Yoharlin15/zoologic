import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./main-layout";
import { Routes } from "#core";
import { LayoutUtils } from "#utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";  // Importa el contexto de autenticación

const CustomMainLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { permisos } = useAuth();  // Obtén los permisos desde el contexto de autenticación

  const activeTabMap: Record<string, number> = React.useMemo(
    () => ({
      [Routes.DASHBOARD_ROUTE]: 0,
      [Routes.EMPLEADOS_ROUTE]: 1,
      [Routes.EJEMPLARES_ROUTE]: 2,
      [Routes.SALUD_ROUTE]: 3,
      [Routes.DIETA_APLICADA_ROUTE]: 4,
      [Routes.ALIMENTACION_ROUTE]: 4,
      [Routes.HABITAT_ROUTE]: 5,
      [Routes.COMPORTAMIENTO_ROUTE]: 6,
      [Routes.VENTA_BOLETOS_ROUTE]: 7,
      [Routes.USUARIOS_ROUTE]: 8,
      [Routes.REPORTES_ROUTE]: 9,
    }),
    []
  );

  // Filtrar módulos según los permisos
  const filterSidebarItems = () => {
    const allowedModules = permisos
      .filter((permiso) => permiso.Acciones.Ver) // Solo módulos que tengan permiso para "Ver"
      .map((permiso) => permiso.ModuloNombre); // Obtener los nombres de los módulos permitidos

    const sidebarItems = [
      {
        icon: <FontAwesomeIcon icon="home" />,
        label: "Home",
        path: Routes.DASHBOARD_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="user-tie" />,
        label: "Empleados",
        path: Routes.EMPLEADOS_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="paw" />,
        label: "Animales",
        path: Routes.EJEMPLARES_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="heart-pulse" />,
        label: "Salud animal",
        path: Routes.SALUD_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="bowl-food" />,
        label: "Dietas",
        path: Routes.DIETA_APLICADA_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="tree" />,
        label: "Habitats",
        path: Routes.HABITAT_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="hippo" />,
        label: "Comportamiento",
        path: Routes.COMPORTAMIENTO_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="ticket" />,
        label: "Venta de boletos",
        path: Routes.VENTA_BOLETOS_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="user-gear" />,
        label: "Usuarios",
        path: Routes.USUARIOS_ROUTE,
      },
      {
        icon: <FontAwesomeIcon icon="chart-column" />,
        label: "Reportes",
        path: Routes.REPORTES_ROUTE,
      },
    ];

    // Filtra los ítems que el usuario tiene permitido ver
    return sidebarItems.filter((item) => allowedModules.includes(item.label));
  };

  const sidebarItems = filterSidebarItems();

  return (
    <MainLayout
      activeTabIndex={LayoutUtils.getTabIndexFromPathname(pathname, activeTabMap)}
      logoProps={{
        clickable: true,
        src: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1741974209/Captura_de_pantalla_2025-03-14_133841-removebg-preview_ibdy4g.png",
      }}
      headerProps={{
        title: "ZOOLOGIC - Panel de Administrador",
      }}
      sideBarItems={sidebarItems.map((item) => ({
        icon: item.icon,
        label: item.label,
        onClick: () => navigate(item.path),
      }))}
    >
      {children}
    </MainLayout>
  );
};

export default CustomMainLayout;
