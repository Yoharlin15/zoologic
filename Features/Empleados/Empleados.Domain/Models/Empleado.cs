namespace feedback_zoologic.Features.Empleados.Domain
{
    public class Empleado : Entity, IAggregateRoot
    {
        public Empleado
        (
            int empleadoId,
            string nombres,
            string apellidos,
            string cedula,
            DateTime fechaNacimiento,
            string sexo,
            string telefono,
            string nacionalidad,
            string direccion,
            DateTime fechaLlegada
        )

        {
            EmpleadoId = empleadoId;
            Nombres = nombres;
            Apellidos = apellidos;
            Cedula = cedula;
            FechaNacimiento = fechaNacimiento;
            Sexo = sexo;
            Telefono = telefono;
            Nacionalidad = nacionalidad;
            Direccion = direccion;
            FechaLlegada = fechaLlegada;
        }

        public int EmpleadoId { get; set; }
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string Sexo { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Nacionalidad { get; set; } = null!;
        public string Direccion {get; set;} = null!;
        public DateTime FechaLlegada {get; set;}
        
        public Empleado UpdateOrganizacionId(int empleadoId)
        {
            if(empleadoId != 0)
                EmpleadoId = empleadoId;
            return this;
        }
    }
}

