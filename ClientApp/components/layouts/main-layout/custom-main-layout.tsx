import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./main-layout";
import { Routes } from "#core";
import { LayoutUtils } from "#utils";

const CustomMainLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const activeTabMap: Record<string, number> = React.useMemo(
    () => ({
      [Routes.ESPECIES_TYPES_ROUTE]: 1,
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
        title: "zoologic"
      }}
      sideBarItems={[
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304833/Home_dcqk1d.png",
          label: "Home",
          onClick: () => navigate("/admin"),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304737/Wildlife_Animals_fxudan.png",
          label: "Especies",
          onClick: () => 
            navigate(`${Routes.ESPECIES_TYPES_ROUTE}`) ,
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304871/Health_ndhcm3.png",
          label: "Salud Animal",
          onClick: () => navigate("/admin/projects"),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304891/Meat_ydus0f.png",          
          label: "Dietas",
          onClick: () => navigate("/admin/users"),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304919/Lake_tfidcc.png",          
          label: "Habitats",
          onClick: () => navigate(""),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304948/Lion_uhpmqu.png",          
          label: "Comportamiento",
          onClick: () => navigate(""),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742304976/Training_muzn4r.png",          
          label: "Adiestramiento",
          onClick: () => navigate(""),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742305000/Tickets_w13ows.png",          
          label: "Venta de Boletos",
          onClick: () => navigate("/admin/"),
        },
        {
          icon: "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742305023/Report_uj0rj6.png",         
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
