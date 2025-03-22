using AutoMapper;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Application.Common;
using feedback_zoologic.Features.Usuarios.Domain;

namespace feedback_zoologic.Features.Usuarios.Application.Common
{
    public class UsuarioResponse : IMapFrom<UsuarioDataModel>
    {
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Contraseña { get; set; } = null!;
        public int RolId { get; set; }  
        public string RolNombre { get; set; } = null!;
        public void Mapping(Profile profile) 
        {
            profile.CreateMap<UsuarioDataModel, UsuarioResponse>()
                .ForMember(dest => dest.RolNombre, opt => opt.MapFrom(src => src.roles.Nombre));                    

            profile.CreateMap<UsuarioDataModel, Usuario>()
                .ForMember(dest => dest.RolNombre, opt => opt.MapFrom(src => src.roles.Nombre));                
        }
    }
}