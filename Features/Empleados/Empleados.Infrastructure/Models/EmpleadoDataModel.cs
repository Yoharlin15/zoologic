using feedback_zoologic.Features.Empleados.Infraestructure.Models;

namespace feedback_zoologic.Features.Empleados.Infraestructure.Models {

    public class EmpleadoDataModel
    {
        public int EmpleadoId { get; set; }
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string Sexo { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Nacionalidad { get; set; } = null!;
        public string Direccion {get; set;} = null!;
        public int CargoId { get; set; }
        public DateTime FechaContratacion {get; set;}
        public virtual CargoDataModel Cargos { get; set; } = null!;
    }
}