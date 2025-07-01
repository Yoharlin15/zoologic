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
  Ejemplares,
  AnimalesList,
  DietasAplicadasList,
  AlimentacionList,
  Salud,
  UsuariosList,
  AnimalDetailView,
  InventarioList,
  EmpleadosList,
  HabitatList,
  Settings,
  Roles,
  SettingsLayout,
  Estados,
  ComportamientosList,
  Cargos,
} from "#views";
import EspecieLayout from "ClientApp/views/especies/especie";
import Familias from "ClientApp/views/especies/familia/familia";
import Clases from "ClientApp/views/especies/clase/clase";
import Procedencias from "ClientApp/views/especies/procedencia/procedencia";
import Zonas from "ClientApp/views/settings/zonas/zonas";
import Tratamientos from "ClientApp/views/salud/tratamiento/tratamiento";
import SaludLayout from "ClientApp/views/salud/opciones";
import NecropsiasList from "ClientApp/views/salud/necropsias/necropsias-list";
import Examenes from "ClientApp/views/salud/examenes/examen";
import ComportamientoLayout from "ClientApp/views/comportamientos/comportamiento";
import DetallesComportamientos from "ClientApp/views/comportamientos/detalleComportamiento/detalleComportamiento";

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
              path: Routes.ESPECIE_ROUTE,
              element: <EspecieLayout />,
              children: [
                {
                  path: Routes.FAMILIAS_ROUTE,
                  element: <Familias />,
                },
                {
                  path: Routes.CLASES_ROUTE,
                  element: <Clases />
                },
                {
                  path: Routes.PROCEDENCIAS_ROUTE,
                  element: <Procedencias />
                }
              ]
            },
            {
              path: Routes.SALUD_ROUTE,
              element: <Salud />,
            },
            {
              path: Routes.SALUD_MENU_ROUTE,
              element: <SaludLayout />,
              children: [
                {
                  path: Routes.TRATAMIENTOS_ROUTE,
                  element: <Tratamientos />
                },
                {
                  path: Routes.EXAMENES_ROUTE,
                  element: <Examenes />
                }
              ]
            },
            {
              path: Routes.NECROPSIAS_ROUTE,
              element: <NecropsiasList />
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
              path: Routes.DIETA_APLICADA_ROUTE,
              element: <DietasAplicadasList />
            },
            {
              path: Routes.ALIMENTACION_ROUTE,
              element: <AlimentacionList />
            },
            {
              path: Routes.HABITAT_ROUTE,
              element: <HabitatList />
            },
            {
              path: Routes.COMPORTAMIENTO_ROUTE,
              element: <ComportamientosList />,
            },

            {
              path: Routes.DETALLE_COMPORTAMIENTO_ROUTE,
              element: <ComportamientoLayout />,
              children: [
                {
                  path: Routes.COMPORTAMIENTO_DETALLE_ROUTE,
                  element: <DetallesComportamientos />
                }
              ]
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
                {
                  id: "estados",
                  path: Routes.ESTADOS_ROUTE,
                  element: <Estados />
                },
                {
                  id: "cargos",
                  path: Routes.CARGOS_ROUTE,
                  element: <Cargos />,
                },
                {
                  id: "zonas",
                  path: Routes.ZONAS_ROUTE,
                  element: <Zonas />
                }
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