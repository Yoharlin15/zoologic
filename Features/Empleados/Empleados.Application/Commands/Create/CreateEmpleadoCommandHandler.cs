using feedback_zoologic.Features.Empleados.Domain;
using MediatR;
using feedback_zoologic.Application.Commands.Create;

namespace feedback_zoologic.Features.Empleados.Application.Commands.Create
{
    public class CreateEmpleadoCommandHandler : IRequestHandler<CreateEmpleadoCommand, CreateEmpleadoResponse>
    {
        private readonly IEmpleadoRepository _repository;

        public CreateEmpleadoCommandHandler(IEmpleadoRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateEmpleadoResponse> Handle(CreateEmpleadoCommand request, CancellationToken cancellationToken)
        {
            var empleado = new Empleado(
                
                request.EmpleadoId,
                request.Nombres,
                request.Apellidos,
                request.Cedula,
                request.FechaNacimietno,
                request.Sexo,
                request.Telefono,
                request.Nacionalidad,
                request.Direccion,
                request.FechaLlegada
            );

            var result = new CreateEmpleadoResponse(await _repository.AddAsync(empleado));

            return result;
        }
    }
}
