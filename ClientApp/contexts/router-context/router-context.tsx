import React, { createContext, useContext, useCallback } from "react";
import { Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
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
  DietasAplicadasList,
  AlimentacionList,
  Salud,
  UsuariosList,
  AnimalDetailView,
  InventarioList,
  EmpleadosList,
  HabitatList,
  Roles,
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
import Departamentos from "ClientApp/views/settings/departamentos/departamentos";
import TratamientoDetalleWrapper from "ClientApp/views/salud/tratamientosAplicados/tratamiento-datails-view";
import { CatalogoEspecies } from "ClientApp/views/landing/CatalogoEspecies";
import TratamientosEspecies from "ClientApp/views/salud/tratamientoEspecie/tratamientoEspecie";
import VistaReportes from "ClientApp/views/reportes/reportes";
import { CustomSettingsLayout, SettingsLayout } from "ClientApp/components/layouts/settings";
import AlimentosEspeciesList from "ClientApp/views/alimentacion/alimentosEspecies/alimentoEspecie-list";
import MapaPage from "ClientApp/views/landing/MapaPage";

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

  const renderSettingsLayout = useCallback((children: React.ReactNode) => {
    return <CustomSettingsLayout>{children}</CustomSettingsLayout>;
  }, []);

  const routes: RouteObject[] = [
    {
      id: "landing-page",
      element: <ZoologicLandingPage />,
      path: Routes.LANDING_ROUTE,
    },
    {
      id: "mapa",
      element: <MapaPage />,
      path: Routes.MAPA_ROUTE
    },
    {
      id: "catalogo",
      element: <CatalogoEspecies />,
      path: Routes.CATALOGO_ROUE,
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
      children: [
        {
          path: "/",
          element: renderMainLayout(<Outlet />), // solo renderiza layout si pasa PrivateRoute
          children: [
            {
              path: Routes.DASHBOARD_ROUTE,
              element: (
                <PrivateRoute requiredPermission="Ver" requiredModule="Home">
                  <DashboardView />
                </PrivateRoute>
              ),
            },
            {
              path: Routes.EMPLEADOS_ROUTE,
              
              element: <EmpleadosList/>,
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
                  element: <Clases />,
                },
                {
                  path: Routes.PROCEDENCIAS_ROUTE,
                  element: <Procedencias />,
                },
              ],
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
                  element: <Tratamientos />,
                },
                {
                  path: Routes.EXAMENES_ROUTE,
                  element: <Examenes />,
                },
                {
                  path: Routes.TRATAMIENTOS_ESPECIES_ROUTE,
                  element: <TratamientosEspecies />,
                },
              ],
            },
            {
              path: Routes.NECROPSIAS_ROUTE,
              element: <NecropsiasList />,
            },
            {
              path: Routes.INVENTARIO_ROUTE,
              element: <InventarioList />,
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
              path: Routes.TRATAMIENTOS_DETALLES_ROUTE,
              element: <TratamientoDetalleWrapper />,
            },
            {
              path: Routes.DIETA_APLICADA_ROUTE,
              element: <DietasAplicadasList />,
            },
            {
              path: Routes.ALIMENTACION_ROUTE,
              element: <AlimentacionList />,
            },
            {
              path: Routes.ALIMENTACION_ESPECIES_ROUTE,
              element: <AlimentosEspeciesList />
            },
            {
              path: Routes.HABITAT_ROUTE,
              element: <HabitatList />,
            },
            {
              path: Routes.COMPORTAMIENTO_ROUTE,
              element: <ComportamientosList />,
            },
            {
              path: Routes.COMPORTAMIENTO_DETALLE_ROUTE,
              element: <ComportamientoLayout />,
              children: [
                {
                  path: Routes.DETALLE_COMPORTAMIENTO_ROUTE,
                  element: <DetallesComportamientos />,
                },
              ],
            },
            {
              path: Routes.REPORTES_ROUTE,
              element: <VistaReportes />,
            },
          ],
        },
        {
          path: Routes.SETTINGS_ROUTE,
          element: renderSettingsLayout(<Outlet />),
          children: [
            {
              path: Routes.ROLES_ROUTE,
              element: <Roles />,
            },
            {
              path: Routes.ESTADOS_ROUTE,
              element: <Estados />,
            },
            {
              path: Routes.CARGOS_ROUTE,
              element: <Cargos />,
            },
            {
              path: Routes.DEPARTAMENTOS_ROUTE,
              element: <Departamentos />,
            },
            {
              path: Routes.ZONAS_ROUTE,
              element: <Zonas />,
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
