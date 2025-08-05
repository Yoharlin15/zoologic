import { IEspecie } from "#interfaces";
import { useFetchEspecies } from "ClientApp/hooks/useFetch";
import { Carousel } from "primereact/carousel";

const Carrusel = () => {
  const carouselTemplate = (especie: IEspecie) => {
    return (
      <div className="relative mx-auto" style={{ maxWidth: "700px" }}>
        <img
          src={especie.FotoUrl || "https://via.placeholder.com/700x400?text=Imagen+no+disponible"}
          alt={especie.NombreComun}
          className="w-full h-auto rounded-lg shadow-md object-cover"
          style={{ height: "400px" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/700x400?text=Imagen+no+disponible";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-xl font-bold">{especie.NombreComun}</h3>
          <p className="text-sm italic">{especie.NombreCientifico}</p>
        </div>
      </div>
    );
  };

  const { data: especies, isLoading, isError } = useFetchEspecies();
  const especiesConImagen = especies?.filter((especie) => especie.FotoUrl) || [];

  return (
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
            showIndicators={false}
            showNavigators={true}
          />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay especies disponibles para mostrar</p>
        </div>
      )}
    </section>
  );
};

export default Carrusel;

