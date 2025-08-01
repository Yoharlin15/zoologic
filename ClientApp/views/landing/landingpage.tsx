import React from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';
import MapaInteractivo from './mapa';
import { useFetchEspecies } from 'ClientApp/hooks/useFetch';
import { IEspecie } from '#interfaces';

const LandingPage = () => {
  const navigate = useNavigate();
  const { data: especies, isLoading, isError } = useFetchEspecies();

  const handleLoginClick = () => {
    navigate(Routes.login_ROUTE);
  };

  const carouselTemplate = (especie: IEspecie) => {
    return (
      <div className="relative mx-auto" style={{ maxWidth: '700px' }}>
        <img
          src={especie.FotoUrl || "https://via.placeholder.com/700x400?text=Imagen+no+disponible"}
          alt={especie.NombreComun}
          className="w-full h-auto rounded-lg shadow-md object-cover"
          style={{ height: '400px' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/700x400?text=Imagen+no+disponible';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-xl font-bold">{especie.NombreComun}</h3>
          <p className="text-sm italic">{especie.NombreCientifico}</p>
        </div>
      </div>
    );
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

  // Filtrar especies que tienen imagen
  const especiesConImagen = especies?.filter(especie => especie.FotoUrl) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header modificado */}
      <div className="bg-green-800 shadow-md py-4 px-6 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-4xl font-bold text-white mr-4">zoologic</div>

          <div className="flex gap-4">
            {/* Catálogo */}
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
              className="p-button-rounded p-button-outlined text-white border-white hidden md:flex"
              onClick={() => navigate(Routes.CATALOGO_ROUE)}
            />

            {/* Iniciar Sesión */}
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
              className="p-button-rounded p-button-outlined text-white border-white hidden md:flex"
              onClick={handleLoginClick}
            />
          </div>

        </div>
      </div>

      {/* Carrusel de Especies */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Nuestras Especies</h2>
        {especiesConImagen.length > 0 ? (
          <div className="px-4">
            <Carousel
              value={especiesConImagen}
              numVisible={1}
              numScroll={1}
              itemTemplate={carouselTemplate}
              className="custom-carousel"
              circular
              autoplayInterval={3000}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No hay especies disponibles para mostrar</p>
          </div>
        )}
      </section>

      <div className="text-center mb-6">
        <Button
          label="Ver Mapa Interactivo"
          icon="pi pi-map"
          className="p-button-rounded p-button-lg bg-green-600 border-green-600 hover:bg-green-700"
          onClick={() => navigate(Routes.MAPA_ROUTE)}
        />
      </div>


      {/* Sección de Boletas con imagen al lado */}
      <section className="py-12 px-6 bg-indigo-50 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <img
              src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1750957578/Ecommerce_web_page-bro_x5jps9.svg"
              alt="Boletas"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">No te quedes sin tu entrada</h2>
            <p className="text-lg text-gray-600 mb-6">
              Evita las molestias y el tiempo perdido en largas filas. Adquiere tus boletas en línea de forma rápida, segura y desde la comodidad de tu hogar.
            </p>
            <Button
              label="Comprar Boletas"
              icon="pi pi-ticket"
              className="p-button-rounded p-button-lg bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 zoologic. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;