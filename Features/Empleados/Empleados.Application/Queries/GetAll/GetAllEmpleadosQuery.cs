using MediatR;
using feedback_zoologic.Features.Empleados.Application.Common;
using feedback_zoologic.Features.Empleados.Domain;

namespace feedback_zoologic.Features.Empleados.Application
{
    public class GetAllEmpleadosQuery : IRequest<EmpleadoResponse[]>
    {
        public class GetAllEmpleadosQueryQueryHandler  : IRequestHandler<GetAllEmpleadosQuery, EmpleadoResponse[]>
        {
            private readonly IEmpleadoRepository empleadoRepository;

            public GetAllEmpleadosQueryQueryHandler(
                IEmpleadoRepository especieRepository
                )
            {
                this.empleadoRepository = especieRepository;
            }

            public async Task<EmpleadoResponse[]> Handle(
                GetAllEmpleadosQuery request,
                CancellationToken cancellationToken)
            {
                var empleados = await empleadoRepository.Get(cancellationToken);
                return empleados.Select(r => new EmpleadoResponse
                {
                    EmpleadoId = r.EmpleadoId,
                    Nombres = r.Nombres,
                    Apellidos = r.Apellidos,
                    Cedula = r.Cedula,
                    FechaNacimiento = r.FechaNacimiento,
                    Sexo = r.Sexo,  
                    Telefono = r.Telefono,
                    Nacionalidad = r.Nacionalidad,
                    Direccion = r.Direccion,
                    FechaContratacion = r.FechaContratacion,
                    CargoId = r.CargoId,
                    CargoNombre = r.Cargo,

                }).ToArray();
            }
        }
    }
}