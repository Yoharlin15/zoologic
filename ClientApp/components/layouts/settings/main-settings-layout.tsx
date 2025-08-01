import React from "react";
import { Ripple } from "primereact/ripple";
import { useMediaQuery } from "usehooks-ts";
import { classNames } from "primereact/utils";
import { useNavigate } from 'react-router-dom';
import { Routes } from "#core";
import { title } from "process";
import { Button } from "primereact/button";

interface IMainLayoutProps {
  sideBarItems: ISidebarItem[];
  activeTabIndex?: number;
  removePadding?: boolean;
  headerProps: IHeaderProps;
  children: React.ReactNode;
}

interface IHeaderProps {
  title: string;
}

interface ISidebarItem {
  icon?: string | React.ReactNode;
  label?: string;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties; // Acepta un objeto de estilo
  type?: 'divider' | 'item'; // Puedes añadir más tipos según lo necesites
}

interface ISidebarItemsProps {
  items: ISidebarItem[];
}

interface ILayoutContentProps {
  removePadding: boolean;
  children?: React.ReactNode;
  withStyledContainer?: boolean;
  btnRef: React.MutableRefObject<null>;
  headerProps?: IHeaderProps; 
}

const MainSettingsLayout = ({
  children,
  headerProps,
  sideBarItems,
  activeTabIndex,
  removePadding = false,
}: IMainLayoutProps) => {
  const btnRef = React.useRef(null);

  return (
    <LayoutContainer>
      <LayoutSidebar>
        <SidebarItems
          items={sideBarItems.map((item, index) => {
            return {
              ...item,
              onClick: item.onClick,
              active: activeTabIndex === index,
            };
          })}
        />
      </LayoutSidebar>
      <LayoutContent
        btnRef={btnRef}
        headerProps={{title: "Configuraciones generales del sistema"}}
        removePadding={removePadding}
        withStyledContainer
      >
        {children}
      </LayoutContent>
    </LayoutContainer>
  );
};

const LayoutContainer = ({ children }: React.PropsWithChildren) => (
  <div className="min-h-screen flex relative surface-ground">{children}</div>
);

const LayoutSidebar = ({ children }: React.PropsWithChildren) => (
  <div
    id="app-sidebar"
    className="h-screen hidden lg:flex flex-shrink-0 sticky left-0 top-0 z-1 border-right-1 surface-border select-none"
    style={{
      width: '280px',
      boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      backgroundColor: '#f5f5f5' // Fondo gris claro
    }}
  >
    <div className="flex flex-column h-full w-full">{children}</div>
  </div>
);

const SidebarItems = ({ items }: ISidebarItemsProps) => {
  const isLaptop = useMediaQuery("(max-width: 1200px)");
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto px-3 py-5 flex-1">
      <ul className="list-none m-0 p-0 flex flex-column gap-1">
        {items.map((item) => (
          <li key={item.label}>
            <a
              onClick={item.onClick}
              className={classNames(
                "flex align-items-center cursor-pointer p-3 border-round transition-all transition-duration-200",
                {
                  "bg-green-100": item.active, // Verde claro cuando está activo
                  "text-green-700": item.active, // Texto verde oscuro para contraste
                  "hover:surface-100": !item.active,
                  "w-full": true
                }
              )}
            >
              <div className="flex align-items-center justify-content-center" style={{ width: '40px' }}>
                {typeof item.icon === 'string' ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    style={{
                      width: "24px",
                      filter: item.active ? "brightness(0) saturate(100%) invert(39%) sepia(71%) saturate(576%) hue-rotate(87deg) brightness(92%) contrast(89%)" : "none"
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '1.25rem',
                    color: item.active ? '#15803d' : 'var(--text-color-secondary)', // Verde oscuro cuando está activo
                    width: '24px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                )}
              </div>
              {!isLaptop && (
                <span className={classNames("font-medium ml-3", {
                  "text-green-700": item.active,
                  "text-600": !item.active,
                })}>
                  {item.label}
                </span>
              )}
              <Ripple />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LayoutContent = ({
  btnRef,
  children,
  headerProps,
  removePadding,
  withStyledContainer = true,
}: ILayoutContentProps) => {
  const { title } = headerProps || {};
  const navigate = useNavigate();
  const renderStyledContainer = (children: React.ReactNode) => (
    <div className="border-3 border-solid surface-border border-round surface-section flex-auto w-full">
      {children}
    </div>
  );

  const handleGoBack = () => {
    navigate("/dashboard"); // Redirige a la vista de Dashboard
  };

  return (
    <div className="flex flex-column relative flex-auto max-h-screen">
      {/* HEADER */}
      <div
        style={{ height: "60px" }}
        className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border absolute top-0 w-full z-5 bg-gray-100 shadow-3"
      >
        <span className="font-semibold text-lg text-700 flex">{title}</span>
        <Button 
          label="Volver al Dashboard" 
          icon="pi pi-arrow-left" 
          onClick={handleGoBack} 
          className="p-button-text p-button-secondary"
        />
      </div>
      {/* CONTENT */}
      <div
        style={{ marginTop: 60 }}
        className={`${!removePadding ? "p-5" : ""} flex flex-column flex-auto absolute overflow-y-auto max-h-full top-0 bottom-0 left-0 right-0`}
      >
        {withStyledContainer ? renderStyledContainer(children) : children}
      </div>
    </div>
  );
};

export default MainSettingsLayout;
