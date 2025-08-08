import React from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';
import { useFetchEspecies } from 'ClientApp/hooks/useFetch';
import Carrusel from './carrusel';
import { useAuth } from 'ClientApp/contexts/AuthContext/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { token, nombreUsuario, logout } = useAuth();
  const { data: especies, isLoading, isError } = useFetchEspecies();

  const handleLoginClick = () => {
    navigate(Routes.login_ROUTE);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <i className="pi pi-spinner pi-spin text-4xl text-primary"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
          Error al cargar las especies
        </div>
      </div>
    );
  }

  const especiesConImagen = especies?.filter(especie => especie.FotoUrl) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 shadow-md py-4 px-6 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-4xl font-bold text-white">zoologic</div>

          {/* Botones derechos */}
          <div className="flex gap-4 ml-auto items-center">
            {/* Botón Catálogo */}
            <Button
              icon="pi pi-book"
              className="p-button-rounded p-button-outlined text-white border-white md:hidden"
              onClick={() => navigate(Routes.CATALOGO_ROUE)}
              tooltip="Catálogo"
              tooltipOptions={{ position: 'bottom' }}
            />
            <Button
              label="Catálogo"
              icon="pi pi-book"
              className="p-button-rounded p-button-outlined text-white border-white hidden md:inline-flex"
              onClick={() => navigate(Routes.CATALOGO_ROUE)}
            />

            {/* Condicional: Usuario logueado o no */}
            {token ? (
              <>
                <div className="hidden md:flex items-center text-white font-semibold mt-2">
                  👋 {nombreUsuario}
                </div>
                <Button
                  icon="pi pi-sign-out"
                  className="p-button-rounded p-button-outlined text-white border-white md:hidden"
                  onClick={logout}
                  tooltip="Cerrar sesión"
                  tooltipOptions={{ position: 'bottom' }}
                />
                <Button
                  label="Cerrar sesión"
                  icon="pi pi-sign-out"
                  className="p-button-rounded p-button-outlined text-white border-white hidden md:inline-flex"
                  onClick={logout}
                />
              </>
            ) : (
              <>
                <Button
                  icon="pi pi-user"
                  className="p-button-rounded p-button-outlined text-white border-white md:hidden"
                  onClick={handleLoginClick}
                  tooltip="Iniciar sesión"
                  tooltipOptions={{ position: 'bottom' }}
                />
                <Button
                  label="Iniciar Sesión"
                  icon="pi pi-user"
                  className="p-button-rounded p-button-outlined text-white border-white hidden md:inline-flex"
                  onClick={handleLoginClick}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Carrusel de especies */}
      <Carrusel />

      {/* Botón Mapa Interactivo */}
      <div className="text-center mb-6 mt-6">
        <Button
          label="Ver Mapa Interactivo"
          icon="pi pi-map"
          className="p-button-rounded p-button-lg bg-green-600 border-green-600 hover:bg-green-700"
          onClick={() => navigate(Routes.MAPA_ROUTE)}
        />
      </div>

      {/* Sección promocional */}
      <section className="py-12 px-6 bg-green-600 mt-8">
        <div className="max-w-8xl mx-auto flex flex-col items-center">
          <div className="w-full md:w-3/4 lg:w-1/2 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Planifica Tu Visita Hoy</h2>
            <p className="text-xl text-white mb-8">
              No te pierdas la oportunidad de vivir una experiencia inolvidable. ¡Te esperamos!
            </p>
            <div className="flex justify-content-center mb-4">
              <Button
                onClick={() => {
                  if (!token) {
                    navigate(Routes.login_ROUTE);
                  } else {
                    navigate(Routes.TICKETS_ROUTE);
                  }
                }}
                className="p-button-rounded p-button-lg bg-white text-green-600 border-white hover:bg-white hover:text-green-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                style={{ fontWeight: '600' }}
              >
                <i className="pi pi-ticket"></i>
                <span>Comprar Entradas Ahora</span>
                <i className="pi pi-arrow-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 zoologic. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
