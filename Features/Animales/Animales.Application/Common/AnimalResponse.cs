using AutoMapper;
using feedback_zoologic.Features.Animales.Infraestructure.Models;
using feedback_zoologic.Features.Animales.Domain;

namespace feedback_zoologic.Features.Empleados.Application.Common
{
    public class AnimalResponse : IMapFrom<AnimalDataModel>
    {
        public int AnimalId { get; set; }
        public int EspecieId { get; set; }
        public string Sexo { get; set; } = null!;
        public DateTime FechaNacimiento {get; set; }
        public string Observaciones { get; set; } = null!;
        public int ZonaId { get; set; }
        public int CreadoPor { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<AnimalDataModel, AnimalResponse>();              

            profile.CreateMap<AnimalDataModel, Animal>();                  
        }
    }
}

