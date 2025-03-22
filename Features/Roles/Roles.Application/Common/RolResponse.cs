using AutoMapper;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Application.Common;
using feedback_zoologic.Features.Roles.Domain;

namespace feedback_zoologic.Features.Roles.Application.Common
{
    public class RolResponse : IMapFrom<RolDataModel>
    {
        public int RolId { get; set; }
        public string Nombre { get; set; } = null!;

        public void Mapping(Profile profile) 
        {
            profile.CreateMap<RolDataModel, RolResponse>();
            profile.CreateMap<RolDataModel, Rol>();
        }
    }
}

