import React from "react";
import { renderTooltip } from "#utils";
import { Ripple } from "primereact/ripple";
import { useMediaQuery } from "usehooks-ts";
import { classNames } from "primereact/utils";
import { useNavigate } from 'react-router-dom';
import { Routes } from "#core";


interface IMainLayoutProps {
  logoProps: ILogoProps;
  activeTabIndex?: number;
  removePadding?: boolean;
  headerProps: IHeaderProps;
  children: React.ReactNode;
  sideBarItems: ISidebarItem[];
  withStyledContainer?: boolean;
}

interface ILogoProps {
  clickable?: boolean;
  onClick?: () => void;
  height?: React.CSSProperties["height"];
  src?: React.ComponentProps<"img">["src"];
}

interface ISidebarItem {
  icon: string | React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface ISidebarItemsProps {
  items: ISidebarItem[];
}

interface ILayoutContentProps {
  removePadding: boolean;
  headerProps: IHeaderProps;
  children?: React.ReactNode;
  withStyledContainer?: boolean;
  btnRef: React.MutableRefObject<null>;
}

interface IHeaderProps {
  title: string;
  dropdown?: {
    title?: string;
    avatarSrc?: React.ComponentProps<"img">["src"];
    logoutAction?: () => void;
    accountAction?: () => void;
    configAction?: () => void;
  };
}

const MainLayout = ({
  children,
  logoProps,
  headerProps,
  sideBarItems,
  activeTabIndex,
  withStyledContainer,
  removePadding = false,
}: IMainLayoutProps) => {
  const { src, onClick, clickable, height = 180 } = logoProps;
  const btnRef = React.useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(Routes.LANDING_ROUTE, { replace: true });
  };

  const handleConfigNavigation = () => {
    navigate(Routes.SETTINGS_ROUTE);
  };

  const headerPropsWithActions = {
    ...headerProps,
    dropdown: {
      ...headerProps.dropdown,
      logoutAction: headerProps.dropdown?.logoutAction || handleLogout,
      configAction: headerProps.dropdown?.configAction || handleConfigNavigation,
    },
  };

  return (
    <LayoutContainer>
      <LayoutSidebar>
        <Logo
          src={src}
          height={height}
          onClick={onClick}
          clickable={clickable || !!onClick}
        />
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
        headerProps={headerPropsWithActions}
        removePadding={removePadding}
        withStyledContainer={withStyledContainer}
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

const Logo = ({ src, height, onClick, clickable = false }: ILogoProps) => (
  <div
    style={{ height: 140 }}
    className="flex align-items-center xl:px-5 flex-shrink-0 justify-content-center border-bottom-1 surface-border"
  >
    <img
      src={src}
      alt="logo"
      onClick={onClick}
      style={{ height }}
      className={clickable ? "cursor-pointer" : undefined}
    />
  </div>
);

const SidebarItems = ({ items }: ISidebarItemsProps) => {
  const isLaptop = useMediaQuery("(max-width: 1200px)");

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
  const { title, dropdown } = headerProps;
  const renderStyledContainer = (children: React.ReactNode) => (
    <div className="border-3 border-solid surface-border border-round surface-section flex-auto w-full">
      {children}
    </div>
  );

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="flex flex-column relative flex-auto max-h-screen">
      {/* HEADER */}
      <div
        style={{ height: "60px" }}
        className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border absolute top-0 w-full z-5 bg-gray-100 shadow-3"
      >
        <span className="font-semibold text-lg text-700 flex">{title}</span>

        <div className="relative">
          <a
            ref={btnRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-ripple cursor-pointer text-700 select-none"
          >
            <div className="hidden lg:flex align-items-center">
              <div className="p-overlay-badge flex">
                {/* <img
                alt="avatar"
                src={dropdown?.avatarSrc}
                style={{ width: 32, height: 32, borderRadius: 100 }}
              /> */}
              </div>
              <div className="font-semibold text-lg text-900 flex ml-2">
                {dropdown?.title}
              </div>
              <div className="flex">
                <i
                  className={`pi pi-chevron-${dropdownOpen ? "down" : "right"} text-[28px]`}
                ></i>
              </div>
            </div>
            <div className="lg:hidden">
              <i className="pi pi-ellipsis-v text-[28px]"></i>
            </div>
          </a>

          {dropdownOpen && (
            <ul className="list-none p-0 m-0 select-none surface-section border-1 surface-border right-0 top-100 z-1 shadow-2 absolute border-round-lg w-16rem">
              <li>
                <a
                  onClick={() => {
                    dropdown?.accountAction?.();
                    setDropdownOpen(false);
                  }}
                  className="p-ripple flex p-3 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors w-full text-600 hover:text-900"
                >
                  <div className="flex text-base mr-2">
                    <i className="pi pi-user text-[28px]"></i>
                  </div>
                  <span className="font-medium">Cuenta</span>
                  <Ripple />
                </a>
              </li>
              <li className="border-top-1 surface-border">
                <a
                  onClick={() => {
                    dropdown?.configAction?.();
                    setDropdownOpen(false);
                  }}
                  className="p-ripple flex p-3 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors w-full"
                >
                  <div className="flex text-base mr-2">
                    <i className="pi pi-cog text-[28px]"></i>
                  </div>
                  <span className="font-medium">Configuración</span>
                  <Ripple />
                </a>
              </li>
              <li className="border-top-1 surface-border">
                <a
                  onClick={() => {
                    dropdown?.logoutAction?.();
                    setDropdownOpen(false);
                  }}
                  className="p-ripple flex p-3 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors w-full"
                >
                  <div className="flex text-base mr-2">
                    <i className="pi pi-sign-out text-[28px]"></i>
                  </div>
                  <span className="font-medium">Cerrar sesión</span>
                  <Ripple />
                </a>
              </li>
            </ul>
          )}
        </div>
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

export default MainLayout;