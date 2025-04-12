using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;

namespace feedback_zoologic.Features.Tratamientos.Infraestructure.Models {

    public class TratamientoDataModel
    {
        public int TratamientoId { get; set; }
        public string NombreTratamiento { get; set; } = null!;
        public int EspecieId { get; set; }
        public int HabitatId { get; set; }
        public DateTime FechaEntrada { get; set; }
        public DateTime FechaSalida { get; set; }
        public int UsuarioId { get; set; }
        public string Razon { get; set; } = null!;
        public string Procedencia {get ; set;} = null!;
        public virtual EspecieDataModel especies { get; set; } = null!;
        public virtual ZonaDataModel zonas { get; set; } = null!;
        public virtual UsuarioDataModel usuarios { get; set; } = null!;
    }
}
