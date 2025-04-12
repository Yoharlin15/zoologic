using AutoMapper;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Domain;

namespace feedback_zoologic.Features.Especies.Application.Common
{
    public class TratamientoResponse : IMapFrom<TratamientoDataModel>
    {
        public int TratamientoId { get; set; }
        public string NombreTratamiento { get; set; } = null!;
        public int EspecieId { get; set; }
        public string NombreComun { get; set; } = null!;
        public string ZonaId { get; set; } = null!;
        public string NombreZona { get; set; } = null!;
        public DateTime FechaEntrada { get; set; }
        public DateTime FechaSalida { get; set; }
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set;} = null!;
        public string Razon { get; set; } = null!;
        public string Procedencia {get ; set;} = null!;

        public void Mapping(Profile profile) 
        {
            profile.CreateMap<TratamientoDataModel, TratamientoResponse>()
                .ForMember(dest => dest.NombreComun, opt => opt.MapFrom(src => src.especies.NombreComun))
                .ForMember(dest => dest.NombreZona, opt => opt.MapFrom(src => src.zonas.NombreZona))
                .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.usuarios.NombreUsuario));

            profile.CreateMap<TratamientoDataModel, Tratamiento>()
                .ForMember(dest => dest.NombreComun, opt => opt.MapFrom(src => src.especies.NombreComun))
                .ForMember(dest => dest.NombreZona, opt => opt.MapFrom(src => src.zonas.NombreZona))
                .ForMember(dest => dest.NombreUsuario, opt => opt.MapFrom(src => src.usuarios.NombreUsuario));
        }
        
    }
}

