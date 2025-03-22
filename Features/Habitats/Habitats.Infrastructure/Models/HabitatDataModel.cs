// using feedback_zoologic.Features.Especies.Infraestructure.Models;
// using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;

namespace feedback_zoologic.Features.Habitats.Infraestructure.Models {

    public class HabitatDataModel
    {
        public int HabitatId { get; set; }
        public string NombreHabitat { get; set; } = null!;
        public string Descripcion { get; set; } = null!; 
        public int UsuarioId { get; set; }
        public decimal Tamaño { get; set; }
        public int CapacidadMaxima { get; set; }
        public virtual UsuarioDataModel usuarios { get; set; } = null!;
        public virtual ICollection <EspecieDataModel> especies { get; set; } = null!;
        public virtual ICollection<TratamientoDataModel> tratamientos { get; set; } = null!;
    }
}