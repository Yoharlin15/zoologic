using AutoMapper;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;
using feedback_zoologic.Features.Zonas.Application.Common;
using feedback_zoologic.Features.Zonas.Domain;

namespace feedback_zoologic.Features.Zonas.Application.Common
{
    public class ZonaResponse : IMapFrom<ZonaDataModel>
    {
        public int ZonaId { get; set; }
        public string NombreZona { get; set; } = null!;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ZonaDataModel, ZonaResponse>();
            profile.CreateMap<ZonaDataModel, Zona>();
        }
    }
}