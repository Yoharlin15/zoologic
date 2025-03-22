using AutoMapper;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Habitats.Application.Common;
using feedback_zoologic.Features.Habitats.Domain;

namespace feedback_zoologic.Features.Habitats.Application.Common
{
    public class HabitatResponse : IMapFrom<HabitatDataModel>
    {
        public int HabitatId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!; 
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public decimal Tamaño { get; set; }
        public int CapacidadMaxima { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<HabitatDataModel, HabitatResponse>();
            profile.CreateMap<HabitatDataModel, Habitat>();
        }
    }
}