import React from "react";
import { renderTooltip } from "#utils";
import { Ripple } from "primereact/ripple";
import { useMediaQuery } from "usehooks-ts";
import { classNames } from "primereact/utils";
import { StyleClass } from "primereact/styleclass";


interface IMainLayoutProps {
  logoProps: ILogoProps;
  //     renderActions?: () => React.ReactNode;
  activeTabIndex?: number;
  removePadding?: boolean;
  //   breadcrumb: {
  //     items: {
  //       href?: string;
  //       title: string | React.ReactNode;
  //     }[];
  headerProps: IHeaderProps;
  //     hide?: boolean;
  children: React.ReactNode;
  //   };
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
  icon: string;
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
  //   breadcrumb,
  withStyledContainer,
  removePadding = false,
}: IMainLayoutProps) => {
  const { src, onClick, clickable, height = 180 } = logoProps;
  const btnRef = React.useRef(null);

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
        headerProps={headerProps}
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
    className="surface-section h-screen flex flex-shrink-0 sticky left-0 top-0 z-1 border-right-1 surface-border select-none"
  >
    <div className="flex flex-column h-full">{children}</div>
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
    <div className="overflow-y-auto px-3 py-5">
      <ul className="list-none m-0 p-0 flex flex-column justify-content-between xl:justify-content-start mb-5 xl:mb-0">
        {items.map((item) => (
          <li key={item.label} className={item.label}>
            {isLaptop && renderTooltip(item.label, item.label, "right")}
            <a
              onClick={item.onClick}
              className={classNames(
                "xl:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors mb-2",
                {
                  "surface-200": item.active,
                }
              )}
            >
              <div
                className={classNames("flex xl:mr-1", {
                  "text-700": item.active,
                  "text-600": !item.active,
                })}
              >
                <img
                  src={item.icon} // Aquí pasas la ruta del icono personalizado
                  alt={item.label}
                  style={{ width: "40px", marginRight: "8px" }}
                />

              </div>
              <span
                className={classNames("font-medium hidden xl:block", {
                  "text-700": item.active,
                  "text-600": !item.active,
                })}
              >
                {item.label}
              </span>
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
    <div className="border-2 border-dashed surface-border border-round surface-section flex-auto w-full">
      {children}
    </div>
  );
  return (
    <div className="flex flex-column relative flex-auto max-h-screen">
      {/* HEADER */}
      <div
        style={{ height: "60px" }}
        className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border absolute top-0 w-full z-5"
      >
        <span className="font-semibold text-lg text-700 flex">{title}</span>
        <StyleClass
          selector="@next"
          nodeRef={btnRef}
          leaveToClassName="hidden"
          enterFromClassName="hidden"
          enterActiveClassName="fadein"
          leaveActiveClassName="fadeout"
        >
          <a
            ref={btnRef}
            className="p-ripple cursor-pointer text-700 select-none"
          >
            <div className="hidden lg:flex align-items-center">
              <div className="p-overlay-badge flex">
                <img
                  alt="avatar"
                  src={dropdown?.avatarSrc}
                  style={{ width: 32, height: 32, borderRadius: 100 }}
                />
                {/* <Badge severity="danger" /> */}
              </div>
              <div className="font-semibold text-lg text-900 flex ml-2">
                {dropdown?.title}
              </div>
              <StyleClass
                nodeRef={btnRef}
                selector=".chevron-icon"
                toggleClassName="chevron-down"
              />
              <div className="flex chevron-icon">
                
              </div>
            </div>
            <div className="lg:hidden">
              
            </div>
          </a>
        </StyleClass>
        <ul className="list-none p-0 m-0 hidden select-none surface-section border-1  surface-border right-0 top-100 z-1 shadow-2 absolute border-round-lg w-16rem">
          <li>
            <a
              onClick={dropdown?.accountAction}
              className="p-ripple flex p-3 align-items-center hover:surface-100 font-medium border-round cursor-pointer
        transition-duration-150 transition-colors w-full text-600 hover:text-900 "
            >
              <div className="flex text-base mr-2">
                
              </div>
              <span className="font-medium">Cuenta</span>
              <Ripple />
            </a>
          </li>
          {/* <li className="border-top-1 surface-border">
            <a
              className="p-ripple flex p-3 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
        transition-duration-150 transition-colors w-full"
            >
              <div className="flex text-base mr-2 p-overlay-badge">
                <Icon size={30} name="bell" />
                <Badge severity="danger" />
              </div>
              <span className="font-medium">Notificaciones</span>
              <Ripple />
            </a>
          </li> */}
          {Boolean(dropdown?.configAction) && (
            <li className="border-top-1 surface-border">
              <a
                onClick={dropdown?.configAction}
                className="p-ripple flex p-3 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
        transition-duration-150 transition-colors w-full"
              >
                <div className="flex text-base mr-2">
                  
                </div>
                <span className=" font-medium">Configuración</span>
                <Ripple />
              </a>
            </li>
          )}
          <li className="border-top-1 surface-border">
            <a
              onClick={dropdown?.logoutAction}
              className="p-ripple flex p-3 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
        transition-duration-150 transition-colors w-full"
            >
              <div className="flex text-base mr-2">
                
              </div>
              <span className="font-medium">Cerrar sesión</span>
              <Ripple />
            </a>
          </li>
        </ul>
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
