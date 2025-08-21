import React from "react";
import { Ripple } from "primereact/ripple";
import { useMediaQuery } from "usehooks-ts";
import { classNames } from "primereact/utils";
import { useNavigate } from 'react-router-dom';
import { Routes } from "#core";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";
import { useComments } from "ClientApp/views/comentario/CommentsContext";

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
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  isMobile: boolean;
  onOpenComments: () => void;
  unreadComments: number;
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

interface LayoutSidebarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  isMobile?: boolean;
  visible?: boolean;
}

interface SidebarItemsProps extends ISidebarItemsProps {
  collapsed?: boolean;
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
  const { src, onClick, clickable } = logoProps;
  const btnRef = React.useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 992px)");
  const { unreadComments, setUnreadComments } = useComments();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // limpia estado + localStorage (ya lo haces en el provider)
    navigate(Routes.LANDING_ROUTE, { replace: true });
  };


  const handleConfigNavigation = () => {
    navigate(Routes.SETTINGS_ROUTE);
  };

  const handleProfileNavigation = () => {
    navigate(Routes.PROFILE_ROUTE);
  };

  const handleOpenComments = () => {
    setUnreadComments(0);
    navigate(Routes.COMMENTS_ROUTE);
  }

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

  const headerPropsWithActions = {
    ...headerProps,
    dropdown: {
      ...headerProps.dropdown,
      accountAction: headerProps.dropdown?.accountAction || handleProfileNavigation,
      logoutAction: headerProps.dropdown?.logoutAction || handleLogout,
      configAction: headerProps.dropdown?.configAction || handleConfigNavigation,
    },
  };

  React.useEffect(() => {
    const handleNewComment = () => setUnreadComments((n) => n + 1);
    window.addEventListener("comments:new", handleNewComment);
    return () => window.removeEventListener("comments:new", handleNewComment);
  }, []);

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
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        visible={sidebarVisible}
      >
        <div className="flex flex-column h-full">
          <div className="flex justify-content-center align-items-center border-bottom-2 surface-border" style={{ height: sidebarCollapsed ? '70px' : '120px', padding: '0 1rem' }}>
            {/* Mostrar el logo grande cuando el sidebar está expandido */}
            {!sidebarCollapsed && !isMobile && (
              <Logo
                src={src}
                height={160}  // Logo grande cuando el sidebar está expandido
                onClick={onClick}
                clickable={clickable || !!onClick}
              />
            )}
            {/* Mostrar el logo pequeño cuando el sidebar está colapsado */}
            {sidebarCollapsed && !isMobile && (
              <Logo
                src={src}
                height={50}  // Logo pequeño cuando el sidebar está colapsado
                onClick={onClick}
                clickable={clickable || !!onClick}
              />
            )}
          </div>

          <SidebarItems
            items={sideBarItems.map((item, index) => ({
              ...item,
              onClick: () => {
                item.onClick?.();
                closeSidebar();
              },
              active: activeTabIndex === index,
            }))}
            collapsed={sidebarCollapsed}
          />
        </div>
      </LayoutSidebar>

      <LayoutContent
        btnRef={btnRef}
        headerProps={headerPropsWithActions}
        removePadding={removePadding}
        withStyledContainer={withStyledContainer}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
        isMobile={isMobile}
        onOpenComments={handleOpenComments}
        unreadComments={unreadComments}
      >
        {children}
      </LayoutContent>
    </LayoutContainer>
  );
};

const LayoutContainer = ({ children }: React.PropsWithChildren) => (
  <div className="min-h-screen flex relative bg-gray-200">{children}</div>
);

const LayoutSidebar = ({ children, collapsed = false, isMobile = false, visible = false }: LayoutSidebarProps) => {
  const sidebarStyle: React.CSSProperties = {
    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, width 0.3s ease',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
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
    sidebarStyle.width = collapsed ? '70px' : '250px';
    sidebarStyle.position = 'sticky';
    sidebarStyle.height = '100vh';
  }

  return (
    <div
      id="app-sidebar"
      className="flex-shrink-0 border-right-1 surface-border select-none"
      style={sidebarStyle}
    >
      {children}
    </div>
  );
};

const Logo = ({ src, height = 80, onClick, clickable = false }: ILogoProps) => (
  <div className="flex align-items-center justify-content-center" style={{ height }}>
    <img
      src={src}
      alt="logo"
      onClick={onClick}
      style={{
        height: '100%',
        objectFit: 'contain',
        transition: 'opacity 0.3s ease'
      }}
      className={clickable ? "cursor-pointer" : undefined}
    />
  </div>
);

const SidebarItems = ({ items, collapsed = false }: SidebarItemsProps) => {
  return (
    <div className="overflow-y-auto flex-1" style={{ padding: '0.5rem' }}>
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
                <span className={classNames("font-medium ml-2", {
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
  sidebarCollapsed,
  onToggleSidebar,
  onOpenComments,
  isMobile,
  unreadComments
}: ILayoutContentProps) => {
  const { title, dropdown } = headerProps;
  const renderStyledContainer = (children: React.ReactNode) => (
    <div className="border-3 border-solid surface-border border-round surface-section flex-auto w-full">
      {children}
    </div>
  );

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { nombreUsuario, rolId } = useAuth();

  return (
    <div className="flex flex-column relative flex-auto max-h-screen">
      {/* HEADER */}
      <div
        style={{ height: "60px" }}
        className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border absolute top-0 w-full z-5 bg-gray-100 shadow-3"
      >
        <div className="flex align-items-center">
          <button
            onClick={onToggleSidebar}
            className="p-ripple p-2 border-none bg-transparent cursor-pointer text-600 hover:text-900 mr-3"
          >
            <i className="pi pi-bars text-[28px]"></i>
            <Ripple />
          </button>
          <span className="font-semibold text-lg text-700 flex">{title}</span>
        </div>

        <div className="relative flex justify-content-center">
          {rolId === 1 && (
            <button
              onClick={onOpenComments}
              className="p-ripple p-2 border-none bg-transparent cursor-pointer text-600 hover:text-900 mr-3"
              title="Ver comentarios de clientes"
            >
              <div className="relative inline-flex items-center justify-center">
                {/* Ícono */}
                <i className="pi pi-comments text-2xl leading-none align-middle"></i>

                {/* Badge circular mejorado */}
                {unreadComments > 0 && (
                  <span className="
                    absolute top-0 right-0
                    transform translate-x-1/2 -translate-y-1/2
                    bg-red-500 text-white text-xs font-semibold
                    rounded-full h-5 w-5 min-w-5
                    flex items-center justify-center
                    ring-2 ring-white
                    shadow-sm
                  ">
                    {unreadComments > 99 ? "99+" : unreadComments}
                  </span>
                )}
              </div>
              <Ripple />
            </button>
          )}

          <a
            ref={btnRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-ripple cursor-pointer text-700 select-none mt-2"
          >
            <div className="hidden lg:flex align-items-center">
              <div className="p-overlay-badge flex">
                {dropdown?.avatarSrc && (
                  <img
                    alt="avatar"
                    src={dropdown.avatarSrc}
                    style={{ width: 32, height: 32, borderRadius: 100 }}
                  />
                )}
              </div>
              <div className="font-semibold text-lg text-900 flex ml-2">
                {nombreUsuario || dropdown?.title}
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
                  <span className="font-medium">Perfil</span>
                  <Ripple />
                </a>
              </li>
              {rolId === 1 && (
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
              )}
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