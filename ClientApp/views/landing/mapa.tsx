import React, { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useFetchZonas } from "ClientApp/hooks/useFetch";
import { IZona } from "#interfaces";

const zonaCoordenadas: Record<number, { top: string; left: string; icono: string }> = {
  1: { top: "68%", left: "20%", icono: "🏢" }, // Oficinas administrativas
  2: { top: "90%", left: "28%", icono: "🦜" }, // Guacamayo azul y rojo
  3: { top: "70%", left: "30%", icono: "🦢" }, // Cisnes, flamencos, patos y pelícano
  4: { top: "45%", left: "28%", icono: "🌊" }, // Gran lago
  5: { top: "63%", left: "59%", icono: "🦌" }, // Eland del cabo
  6: { top: "70%", left: "50%", icono: "🐦" }, // Emu
  7: { top: "75%", left: "70%", icono: "🦢" }, // Casuario y avestruz
  8: { top: "68%", left: "70%", icono: "🐐" }, // Isla de cabra audad, marabú y muflones
  9: { top: "63%", left: "75%", icono: "🐵" }, // Isla de monos
  10: { top: "77%", left: "77%", icono: "🦏" }, // Rinoceronte blanco y avestruz
  11: { top: "83%", left: "84%", icono: "🐪" }, // Camello y nilgai
  12: { top: "93%", left: "90%", icono: "🐃" }, // Bisontes 
  13: { top: "75%", left: "95%", icono: "🍹" }, // Bar Don Coquí
  14: { top: "67%", left: "88%", icono: "🦎" }, // Iguana Ricordi
  15: { top: "46%", left: "90%", icono: "🐟" }, // Carpa Koi
  16: { top: "42%", left: "84%", icono: "🐐" }, // Cabras enanas
  17: { top: "58%", left: "84%", icono: "🦍" }, // Chimpancé
  18: { top: "47%", left: "81%", icono: "🐅" }, // Tigres Bengalas
  19: { top: "35%", left: "78%", icono: "🦁" }, // Leones
  20: { top: "27%", left: "75%", icono: "🐆" }, // Hiena manchada
  21: { top: "25%", left: "60%", icono: "🦤" }, // Lemures
  22: { top: "54%", left: "78%", icono: "🐵" }, // Monos
  23: { top: "68%", left: "80%", icono: "🐦" }, // Cigüeñas
  24: { top: "46%", left: "70%", icono: "🦛" }, // Hipopótamos
  25: { top: "36%", left: "72%", icono: "🐆" }, // Jaguares
  26: { top: "30%", left: "64%", icono: "🐊" }, // Cocodrilos y Zooshow
  27: { top: "50%", left: "60%", icono: "🦜" }, // Aves Psitácidas
  28: { top: "44%", left: "60%", icono: "🦅" }, // Gavilán de Hispaniola, Maura Guaraguao y Cuyaya
  29: { top: "51%", left: "55%", icono: "🐃" }, // Búfalos de agua y vacas Ankole-Watusi
  30: { top: "58%", left: "51%", icono: "🦓" }, // Cebras
  31: { top: "23%", left: "55%", icono: "🦌" }, // Venados Rojos
  32: { top: "13%", left: "52%", icono: "🐴" }, // Paseo de ponys
  33: { top: "27%", left: "46%", icono: "🐍" }, // Serpentario anfibio
  34: { top: "15%", left: "61%", icono: "🦉" }, // Proyecto de lechuzas
  35: { top: "30%", left: "35%", icono: "🦣" }, // Pabellón de mamíferos de la española
  36: { top: "30%", left: "45%", icono: "🌳" }, // Área de Picnic
  37: { top: "35%", left: "50%", icono: "🐥" }, // Zoo infantil / enfermería
};

const MapaInteractivo = () => {
  const { data: zonas } = useFetchZonas();
  const [info, setInfo] = useState<IZona | null>(null);
  const op = useRef<OverlayPanel | null>(null);
  const [hoveredZona, setHoveredZona] = useState<number | null>(null);

  const showInfo = (event: React.MouseEvent<HTMLDivElement>, zona: IZona) => {
    setInfo(zona);
    op.current?.toggle(event);
  };
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: '1000px' }}>
      <h1 className="text-center text-2xl font-bold mt-5">Mapa Interactivo del Zoologico</h1>
      <p className="text-center text-sm text-gray-800 mt-0 mb-0">Haz click sobre las diferentes Zonas para ver detalles</p>
      <div className="relative w-full flex justify-center mt-2">
        <img 
          src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1743033412/mapa-ai-brush-removebg-sdiso5wx_hnk3bt.png" 
          alt="Mapa del Zoológico"
          className="w-full h-auto block"
          style={{ minWidth: '800px', maxWidth: "100%", marginBottom: -30}}
        />
        {zonas &&
          zonas.map((zona) => {
            const coordenadas = zonaCoordenadas[zona.ZonaId];
            if (!coordenadas) return null;
            
            const isHovered = hoveredZona === zona.ZonaId;
            
            return (
              <div
                key={zona.ZonaId}
                className={`absolute cursor-pointer transition-all duration-300 ease-in-out ${
                  isHovered ? "z-10" : ""
                }`}
                style={{ 
                  top: coordenadas.top, 
                  left: coordenadas.left,
                  fontSize: isHovered ? "4.5rem" : "3.5rem",
                  transform: "translate(-50%, -50%)",
                  filter: isHovered ? "drop-shadow(0 0 12px rgba(0,0,0,0.6))" : "none",
                  willChange: "transform, filter",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
                }}
                onMouseEnter={() => setHoveredZona(zona.ZonaId)}
                onMouseLeave={() => setHoveredZona(null)}
                onClick={(e) => showInfo(e, zona)}
              >
                <span 
                  className="block" 
                  style={{
                    transform: isHovered ? "scale(1.6)" : "scale(1)",
                    transition: "transform 0.3s ease"
                  }}
                >
                  {coordenadas.icono}
                </span>
              </div>
            );
          })}
      </div>

      <OverlayPanel ref={op}>
        {info && (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Zona {info.ZonaId}</h3>
            <p className="text-gray-700">{info.NombreZona}</p>
          </div>
        )}
      </OverlayPanel>
    </div>
  );
};

export default MapaInteractivo;
