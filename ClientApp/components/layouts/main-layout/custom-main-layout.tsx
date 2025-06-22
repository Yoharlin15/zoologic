import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./main-layout";
import { Routes } from "#core";
import { LayoutUtils } from "#utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomMainLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
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
    }),
    []
  );

  return (
    <MainLayout
      activeTabIndex={LayoutUtils.getTabIndexFromPathname(
        pathname,
        activeTabMap
      )}
      logoProps={{
        clickable: true,
        src: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1741974209/Captura_de_pantalla_2025-03-14_133841-removebg-preview_ibdy4g.png",
      }}
      headerProps={{
        title: "ZOOLOGIC - Panel de Administrador"
      }}
      sideBarItems={[
        {
          icon: <FontAwesomeIcon icon="home" />,
          label: "Home",
          onClick: () => navigate(`${Routes.DASHBOARD_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="user-tie" />,
          label: "Empleados",
          onClick: () => navigate(`${Routes.EMPLEADOS_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="paw" />,
          label: "Animales",
          onClick: () => navigate(`${Routes.EJEMPLARES_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="heart-pulse" />,
          label: "Salud Animal",
          onClick: () => navigate(`${Routes.SALUD_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="bowl-food" />,
          label: "Dietas",
          onClick: () => navigate(`${Routes.DIETA_APLICADA_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="tree" />,
          label: "Habitats",
          onClick: () => navigate(`${Routes.HABITAT_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="hippo" />,
          label: "Comportamiento",
          onClick: () => navigate(`${Routes.COMPORTAMIENTO_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="person-chalkboard" />,
          label: "Adiestramiento",
          onClick: () => navigate(""),
        },
        {
          icon: <FontAwesomeIcon icon="users" />,
          label: "Visitantes",
          onClick: () => navigate(""),
        },
        {
          icon: <FontAwesomeIcon icon="ticket" />,
          label: "Venta de Boletos",
          onClick: () => navigate("/admin/"),
        },
        {
          icon: <FontAwesomeIcon icon="user-gear" />,
          label: "Usuarios",
          onClick: () => navigate(`${Routes.USUARIOS_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="chart-column" />,
          label: "Reportes",
          onClick: () => navigate("/admin/"),
        },
      ]}
    >
      {children}
    </MainLayout>
  );
};

export default CustomMainLayout;