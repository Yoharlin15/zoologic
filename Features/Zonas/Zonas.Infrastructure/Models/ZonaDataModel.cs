using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;

namespace feedback_zoologic.Features.Zonas.Infraestructure.Models {

    public class ZonaDataModel
    {
        public int ZonaId { get; set; }
        public string NombreZona {get; set;} = null!;
        public virtual ICollection <EspecieDataModel> especies { get; set; } = null!;
        public virtual ICollection<TratamientoDataModel> tratamientos { get; set; } = null!;
    }
}