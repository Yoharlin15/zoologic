using feedback_zoologic.Features.Especies.Infraestructure.Models;

namespace feedback_zoologic.Features.Especies.Infraestructure.Models {

    public class EspecieDataModel
    {
        public int EspecieId { get; set; }
        public string NombreCientifico { get; set; } = null!;
        public string NombreComun { get; set; } = null!;
        public string Familia { get; set; } = null!;
        public string Clase { get; set; } = null!;
        public string Sexo { get; set; } = null!;
        public string Peso { get; set; } = null!;
        public DateTime FechaLlegada { get; set; }
        public string Procedencia { get; set; } = null!;
        public string Observaciones {get; set;} = null!;
    }
}