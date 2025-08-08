import React from "react";
import { Ripple } from "primereact/ripple";
import { useMediaQuery } from "usehooks-ts";
import { classNames } from "primereact/utils";
import { useNavigate } from 'react-router-dom';
import { Routes } from "#core";
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
  style?: React.CSSProperties;
  type?: 'divider' | 'item';
}

interface ISidebarItemsProps {
  items: ISidebarItem[];
  collapsed?: boolean;
}

interface ILayoutContentProps {
  removePadding: boolean;
  children?: React.ReactNode;
  withStyledContainer?: boolean;
  headerProps?: IHeaderProps;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const MainSettingsLayout = ({
  children,
  sideBarItems,
  activeTabIndex,
  removePadding = false,
}: IMainLayoutProps) => {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  return (
    <LayoutContainer>
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {isMobile && sidebarVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-4"
          onClick={closeSidebar}
        />
      )}

      <LayoutSidebar 
        isMobile={isMobile} 
        visible={isMobile ? sidebarVisible : true}
        collapsed={!isMobile && sidebarCollapsed}
      >
        <SidebarItems
          items={sideBarItems.map((item, index) => {
            return {
              ...item,
              onClick: () => {
                item.onClick?.();
                closeSidebar();
              },
              active: activeTabIndex === index,
            };
          })}
          collapsed={sidebarCollapsed}
        />
      </LayoutSidebar>
      <LayoutContent
        headerProps={{title: "Configuraciones generales del sistema"}}
        removePadding={removePadding}
        withStyledContainer
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      >
        {children}
      </LayoutContent>
    </LayoutContainer>
  );
};

const LayoutContainer = ({ children }: React.PropsWithChildren) => (
  <div className="min-h-screen flex relative surface-ground">{children}</div>
);

const LayoutSidebar = ({ 
  children, 
  isMobile = false, 
  visible = false,
  collapsed = false
}: { 
  children: React.ReactNode;
  isMobile?: boolean;
  visible?: boolean;
  collapsed?: boolean;
}) => {
  const sidebarStyle: React.CSSProperties = {
    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, width 0.3s ease',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden'
  };

  if (isMobile) {
    sidebarStyle.width = '250px';
    sidebarStyle.position = 'fixed';
    sidebarStyle.top = '0';
    sidebarStyle.left = '0';
    sidebarStyle.height = '100vh';
    sidebarStyle.zIndex = '5';
    sidebarStyle.transform = visible ? 'translateX(0)' : 'translateX(-100%)';
  } else {
    sidebarStyle.width = collapsed ? '70px' : '280px';
    sidebarStyle.position = 'sticky';
    sidebarStyle.height = '100vh';
  }

  return (
    <div
      id="app-sidebar"
      className="flex-shrink-0 border-right-1 surface-border select-none"
      style={sidebarStyle}
    >
      <div className="flex flex-column h-full w-full">{children}</div>
    </div>
  );
};

const SidebarItems = ({ items, collapsed = false }: ISidebarItemsProps) => {
  return (
    <div className="overflow-y-auto px-2 py-7 flex-1">
      <ul className="list-none m-0 p-0 flex flex-column gap-1">
        {items.map((item) => (
          <li key={item.label}>
            <a
              onClick={item.onClick}
              className={classNames(
                "flex align-items-center cursor-pointer p-3 border-round transition-all transition-duration-200",
                {
                  "bg-green-100": item.active,
                  "text-green-700": item.active,
                  "hover:surface-100": !item.active,
                  "w-full": true,
                  "justify-content-center": collapsed,
                  "px-2": collapsed
                }
              )}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex align-items-center justify-content-center" 
                   style={{ width: collapsed ? '30px' : '40px' }}>
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
                    color: item.active ? '#15803d' : 'var(--text-color-secondary)',
                    width: '24px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                )}
              </div>
              {!collapsed && (
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
  children,
  headerProps,
  removePadding,
  withStyledContainer = true,
  onToggleSidebar,
  sidebarCollapsed
}: ILayoutContentProps) => {
  const { title } = headerProps || {};
  const navigate = useNavigate();
  const renderStyledContainer = (children: React.ReactNode) => (
    <div className="border-3 border-solid surface-border border-round surface-section flex-auto w-full">
      {children}
    </div>
  );

  const handleGoBack = () => {
    navigate(Routes.ChooseOptions);
  };

  return (
    <div className="flex flex-column relative flex-auto max-h-screen">
      {/* HEADER */}
      <div
        style={{ height: "60px" }}
        className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border absolute top-0 w-full z-5 bg-gray-100 shadow-3"
      >
        <div className="flex align-items-center">
          {/* Botón de hamburguesa visible en todas las vistas */}
          <button
            onClick={onToggleSidebar}
            className="p-ripple p-2 border-none bg-transparent cursor-pointer text-600 hover:text-900 mr-3"
          >
            <i className={`pi ${sidebarCollapsed ? 'pi-times' : 'pi-bars'} text-[28px]`}></i>
            <Ripple />
          </button>
          <span className="font-semibold text-lg text-700 flex">{title}</span>
        </div>
        
        <Button 
          label="Volver" 
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