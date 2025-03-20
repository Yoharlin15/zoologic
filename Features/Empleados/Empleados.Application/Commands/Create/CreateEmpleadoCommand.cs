using MediatR;

namespace feedback_zoologic.Application.Commands.Create 
{
    public class CreateEmpleadoCommand : IRequest<CreateEmpleadoResponse> 
    {
        public int EmpleadoId { get; set; } 
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public DateTime FechaNacimietno { get; set; }
        public string Sexo { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Nacionalidad { get; set; } = null!;
        public string Direccion {get; set;} = null!;
        public DateTime FechaLlegada {get; set;}
    }
}