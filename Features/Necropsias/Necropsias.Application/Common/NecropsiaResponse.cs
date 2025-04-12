using AutoMapper;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using feedback_zoologic.Features.Necropsias.Domain;

namespace feedback_zoologic.Features.Necropsias.Application.Common
{
    public class NecropsiaResponse : IMapFrom<NecropsiaDataModel>
    {
        public int NecropsiaId { get; set; }
        public int EspecieId { get; set; }
        public string EspecieNombre {get; set; } = null!; 
        public DateTime FechaMuerte {get; set;}
        public string Procedencia {get; set;} = null!;
        public DateTime FechaNecropsia { get; set; }
        public string Historia {get; set; } = null!;
        public int ExamenId {get; set;}
        public string NombreExamen {get; set;} = null!;
        public int UsuarioId {get; set;}
        public string NombreUsuario {get; set;} = null!;

        public void Mapping(Profile profile) 
        {
            profile.CreateMap<NecropsiaDataModel, NecropsiaResponse>()
                .ForMember(dest => dest.EspecieNombre, opt => opt.MapFrom(src => src.especies.NombreComun))
                .ForMember(dest => dest.NombreExamen, opt => opt.MapFrom(src => src.examenes.Examen))
                .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.usuarios.NombreUsuario));

            profile.CreateMap<NecropsiaDataModel, Necropsia>()
                .ForMember(dest => dest.EspecieNombre, opt => opt.MapFrom(src => src.especies.NombreComun))
                .ForMember(dest => dest.NombreExamen, opt => opt.MapFrom(src => src.examenes.Examen))
                .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.usuarios.NombreUsuario));
        }
    }
}