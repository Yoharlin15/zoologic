import React from "react";
import { Menu } from "primereact/menu";
import { Image } from "primereact/image";
import { MenuItem } from "primereact/menuitem";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";

const EspecieLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const createMenuItem = React.useCallback(
    (route: string, label: string, iconName: string): MenuItem => ({
      label,
      icon: `pi pi-${iconName}`,
      command: () => navigate(route),
    }),
    [navigate]
  );

  const items: MenuItem[] = [
    createMenuItem("familias", "Familias", "users"),
    createMenuItem("clases", "Clases", "book"),
    createMenuItem("procedencias", "Procedencias", "map"),
  ];

  return (
    <div className="flex h-full border-round-md overflow-hidden">
      <Menu model={items} className="w-fit p-0 border-round-md min-w-max" />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export const Settings: React.FC = () => (
  <div className="flex flex-1 flex-column align-items-center justify-content-center">
    <Image
      width="400rem"
      alt="settings"
      className="max-w-40rem mb-4"
      src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1749073522/Settings-amico_aylrzv.svg"
    />
    <span className="font-semibold md:text-lg xl:text-xl text-700 text-center">
      Seleccione una opción
    </span>
  </div>
);

export default EspecieLayout;