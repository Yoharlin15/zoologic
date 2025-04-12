using feedback_zoologic.Features.Animales.Infraestructure.Models;
using feedback_zoologic.Features.Dietas.Infraestructure.Models;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;

namespace feedback_zoologic.Features.Especies.Infraestructure.Models {

    public class EspecieDataModel
    {
        public int EspecieId { get; set; }
        public string NombreCientifico { get; set; } = null!;
        public string NombreComun { get; set; } = null!;
        public string Familia { get; set; } = null!;
        public string Clase { get; set; } = null!;
        public string Procedencia { get; set; } = null!;
        public int ZonaId { get; set; }
        public virtual ZonaDataModel zonas { get; set; } = null!;
        public virtual ICollection<AnimalDataModel> animales { get; set; } = new HashSet<AnimalDataModel>();    
    }
}