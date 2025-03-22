using MediatR;

namespace feedback_zoologic.Application.Commands.Create 
{
    public class CreateEspecieCommand : IRequest<CreateEspecieResponse> 
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
        public int HabitatId { get; set; }
    }
}