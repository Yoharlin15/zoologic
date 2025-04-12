using feedback_zoologic.Features.Especies.Infraestructure.Models;

namespace feedback_zoologic.Features.Animales.Infraestructure.Models {

    public class AnimalDataModel 
    {
        public int AnimalId { get; set; }
        public int EspecieId { get; set; }
        public string Sexo { get; set; } = null!;
        public DateTime FechaNacimiento {get; set; }
        public string Observaciones { get; set; } = null!;
        public int ZonaId { get; set; }
        public int CreadoPor { get; set; }
        public virtual EspecieDataModel especies { get; set; } = null!;
    }
}