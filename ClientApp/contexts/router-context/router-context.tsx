import React, { createContext, useContext, useCallback } from "react";
import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes } from "#core";
import { isAuthenticated } from "#utils";
import { CustomMainLayout } from "#components";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

import {
  ZoologicLandingPage,
  LoginView,
  SignupView,
  VerifyView,
  DashboardView,
  AnimalesList,
  Salud,
  UsuariosList,
  Ejemplares,
  AnimalDetailView,
  InventarioList,
  EmpleadosList,
  HabitatList,
  Settings,
  Roles,
  SettingsLayout,
} from "#views";

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
      id: "landing-page",
      element: <ZoologicLandingPage />,
      path: Routes.LANDING_ROUTE,
    },
    {
      id: "login-view",
      element: <LoginView />,
      path: Routes.login_ROUTE,
    },
    {
      id: "signup-view",
      element: <SignupView />,
      path: Routes.SIGNUP_ROUTE,
    },
    {
      id: "verify-view",
      element: <VerifyView />,
      path: Routes.Verify_Route,
    },
    {
      path: "/",
      element: <PrivateRoute />, // Aquí se valida si está autenticado
      children: [
        {
          path: "/",
          element: renderMainLayout(<Outlet />), // solo renderiza layout si pasa PrivateRoute
          children: [
            {
              path: Routes.DASHBOARD_ROUTE,
              element: <DashboardView />,
            },
            {
              path: Routes.EMPLEADOS_ROUTE,
              element: <EmpleadosList />,
            },
            {
              path: Routes.EJEMPLARES_ROUTE,
              element: <Ejemplares />,
            },
            {
              path: Routes.SALUD_ROUTE,
              element: <Salud />,
            },
            {
              path: Routes.INVENTARIO_ROUTE,
              element: <InventarioList />,
            },
            {
              path: Routes.INVENTARIO_ROUTE,
              element: <AnimalesList />,
            },
            {
              path: Routes.USUARIOS_ROUTE,
              element: <UsuariosList />,
            },
            {
              path: Routes.DETAILS_ROUTE,
              element: <AnimalDetailView />,
            },
            {
              path: Routes.HABITAT_ROUTE,
              element: <HabitatList />
            },
            {
              id: "settings-root",
              path: Routes.SETTINGS_ROUTE,
              element: <SettingsLayout />, // Aquí se incluye el layout con el menú
              children: [
                {
                  path: "",
                  id: "settings",
                  element: <Settings />,
                },
                {
                  id: "roles",
                  path: Routes.ROLES_ROUTE,
                  element: <Roles />,
                },
              ],
            },

          ],
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