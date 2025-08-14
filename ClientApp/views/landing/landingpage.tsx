import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';
import { useFetchEspecies } from 'ClientApp/hooks/useFetch';
import Carrusel from './carrusel';
import { useAuth } from 'ClientApp/contexts/AuthContext/AuthContext';
import ComentariosForm from './Comentarios-Form';
import CarruselEspecies from './carrusel';

const LandingPage = () => {
  const navigate = useNavigate();
  const { token, nombreUsuario, logout, rolId } = useAuth();
  const { data: especies, isLoading, isError } = useFetchEspecies();

  const [tipoSolicitud, setTipoSolicitud] = useState<string | null>(null);
  const [detalleSolicitud, setDetalleSolicitud] = useState('');


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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 shadow-md py-4 px-6 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-4xl font-bold text-white">zoologic</div>

          {/* Botones derechos */}
          <div className="flex gap-4 ml-auto items-center">
            <div className="hidden md:flex items-center text-white font-semibold mt-2 text-lg">
              {nombreUsuario}
            </div>

            {/* 🔹 Mis compras: visible solo con sesión (y opcional por rol) */}
            {token && (rolId === 2) && (
              <>
                {/* móvil */}
                <Button
                  icon="pi pi-shopping-bag"
                  className="p-button-rounded p-button-outlined text-white border-white md:hidden"
                  onClick={() => navigate(Routes.VENTA_BOLETOS_ROUTE)}
                  tooltip="Mis compras"
                  tooltipOptions={{ position: 'bottom' }}
                />
                {/* desktop */}
                <Button
                  label="Mis compras"
                  icon="pi pi-shopping-bag"
                  className="p-button-rounded p-button-outlined text-white border-white hidden md:inline-flex"
                  onClick={() => navigate(Routes.VENTA_BOLETOS_ROUTE)}
                />
              </>
            )}
            {token ? (
              <>
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
      <div className="max-w-7xl mx-auto px-6 py-10 mt-4 mb-4">
        <Card
          title={
            <div className="flex items-center gap-3">
              <i className="pi pi-paw text-green-600 text-2xl"></i>
              <span className="text-2xl font-bold text-green-800">Nuestras Especies</span>
            </div>
          }
          className="shadow-xl border border-green-100 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-white"
        >
          {/* Carrusel con un padding interno para que respire */}
          <div className="px-2 sm:px-4 md:px-6">
            <CarruselEspecies />
          </div>

          {/* Botón centrado */}
          <div className="mt-2 flex justify-content-center">
            <Button
              label="Ver todas las especies"
              icon="pi pi-search"
              className="p-button-rounded p-button-lg bg-green-600 border-green-600 hover:bg-green-700"
              onClick={() => navigate(Routes.CATALOGO_ROUE)}
            />
          </div>
        </Card>
      </div>

      {/* Sección Mapa Interactivo */}
      <div className="bg-green-100 rounded-xl p-6 shadow-sm border border-green-300">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Explora Nuestro Mapa Interactivo</h3>
          <p className="text-gray-600 mb-6 mx-auto max-w-md">
            Descubre puntos de interés, ubicaciones clave y toda la información geográfica que necesitas de manera visual e intuitiva.
          </p>

          <Button
            label="Abrir Mapa"
            icon="pi pi-map"
            iconPos="right"
            className="p-button-lg bg-green-600 hover:bg-green-700 border-green-600 shadow-md hover:shadow-lg transition-all"
            onClick={() => navigate(Routes.MAPA_ROUTE)}
          />

          <p className="text-xs text-gray-600 mt-3">
            <i className="pi pi-info-circle mr-1"></i> Compatible con todos los dispositivos
          </p>
        </div>
      </div>

      {/* Sección promocional */}
      <section className="py-12 px-6 bg-green-600">
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
                    navigate(Routes.STEPS_ROUTE);
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
            <p className="text-md text-white mt-3">
              <i className="pi pi-info-circle mr-1"></i> No aceptamos reembolsos
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-4 py-8">
        <ComentariosForm
          className="w-full flex justify-center"
        />
      </div>

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
