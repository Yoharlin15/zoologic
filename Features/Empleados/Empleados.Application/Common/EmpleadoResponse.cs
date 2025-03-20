using AutoMapper;
using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using feedback_zoologic.Features.Empleados.Application.Common;
using feedback_zoologic.Features.Empleados.Domain;

namespace feedback_zoologic.Features.Empleados.Application.Common
{
    public class EmpleadoResponse : IMapFrom<EmpleadoDataModel>
    {
        public int EmpleadoId { get; set; }
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public string Sexo { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Nacionalidad { get; set; } = null!;
        public string Direccion {get; set;} = null!;
        public DateTime FechaLlegada {get; set;}

        public void Mapping(Profile profile) 
        {
            profile.CreateMap<EmpleadoDataModel, EmpleadoResponse>();
            profile.CreateMap<EmpleadoDataModel, Empleado>();
        }
    }
}

