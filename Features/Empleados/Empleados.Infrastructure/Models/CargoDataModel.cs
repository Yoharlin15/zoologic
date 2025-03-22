using feedback_zoologic.Features.Empleados.Infraestructure.Models;

namespace feedback_zoologic.Features.Empleados.Infraestructure.Models {

    public class CargoDataModel
    {
        public int CargoId { get; set; }
        public string Cargo { get; set; } = null!;
        public virtual ICollection<EmpleadoDataModel> Empleados { get; set; } = null!;
    }
}