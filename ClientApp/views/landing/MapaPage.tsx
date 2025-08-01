import React from 'react';
import MapaInteractivo from './mapa';


const MapaPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="landscape-required hidden md:block">
        <MapaInteractivo />
      </div>

      <div className="md:hidden block fixed inset-0 z-50 flex items-center justify-center bg-white text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gira tu dispositivo</h2>
          <p className="text-gray-600 mt-2">Para una mejor experiencia, por favor coloca tu dispositivo en orientación horizontal.</p>
        </div>
      </div>
    </div>
  );
};


export default MapaPage;
