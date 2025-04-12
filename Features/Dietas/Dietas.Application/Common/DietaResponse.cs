using AutoMapper;
using feedback_zoologic.Features.Dietas.Infraestructure.Models;
using feedback_zoologic.Features.Dietas.Domain;

namespace feedback_zoologic.Features.Usuarios.Application.Common
{
    public class DietaResponse : IMapFrom<DietaDataModel>
    {
       public int DietaId { get; set; }
        public int EspecieId { get; set; }
        public string EspecieNombre {get; set;} = null!;
        public string Alimento {get; set;} = null!;
        public string Cantidad {get; set;} = null!;
        public string Frecuencia {get; set;} = null!;
        public int UsuarioId {get; set;}
        public string NombreUsuario {get; set;} = null!;
        public void Mapping(Profile profile) 
        {
            profile.CreateMap<DietaDataModel, DietaResponse>()
                .ForMember(dest => dest.EspecieNombre, opt => opt.MapFrom(src => src.especies.NombreComun));                    

            profile.CreateMap<DietaDataModel, Dieta>()
                .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.usuarios.NombreUsuario));                
        }
    }
}