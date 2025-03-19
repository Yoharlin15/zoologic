import React, { createContext, useContext, useCallback } from "react";
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { CustomMainLayout } from "#components";
import EspeciesList from "ClientApp/views/Especies/especie-list";
import { Routes } from "#core";
import { LoginView } from "#views";

interface IRouterContextProps {
  routes: RouteObject[];
}

const RouterContext = createContext<IRouterContextProps>({ 
  routes: [],
});

export const useRouterContext = () => useContext(RouterContext);

const Provider = () => {
  const renderMainLayout = useCallback((children: React.ReactNode) => {
    return <CustomMainLayout>{children}</CustomMainLayout>;
  }, []);

  const routes: RouteObject[] = [
    {
      id: "login-view",
      element: <LoginView />,
      path: Routes.BASE_ROUTE,
    },
    {
      path: "/",
      element: renderMainLayout(<Outlet />),
      children: [
        {
          path: Routes.ESPECIES_TYPES_ROUTE,
          element: <EspeciesList />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RouterContext.Provider value={{ routes }}>
      <RouterProvider router={router} />
    </RouterContext.Provider>
  );
};

export default Provider;