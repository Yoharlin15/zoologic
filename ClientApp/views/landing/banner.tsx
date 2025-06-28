import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faLeaf } from "@fortawesome/free-solid-svg-icons";

const ZooBanner = () => {
  return (
    <div className="relative w-full bg-green-100 text-green-900 py-16 px-6 rounded-2xl flex flex-col items-center justify-center gap-6 text-center overflow-hidden">
      {/* Elementos decorativos */}
      
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">
          Bienvenido a <span className="text-green-600">Zoologic</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-green-700 leading-relaxed">
          Administra especies, cuida animales y controla tu zoológico de forma 
          eficiente y moderna con nuestra plataforma integral.
        </p>
      </div>
    </div>
  );
};

export default ZooBanner;