using AutoMapper;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Application.Common;
using feedback_zoologic.Features.Especies.Domain;

namespace feedback_zoologic.Features.Especies.Application.Common
{
    public class EspecieResponse : IMapFrom<EspecieDataModel>
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

        public void Mapping(Profile profile) 
        {
            profile.CreateMap<EspecieDataModel, EspecieResponse>();
            profile.CreateMap<EspecieDataModel, Especie>();
        }
        
    }
}

