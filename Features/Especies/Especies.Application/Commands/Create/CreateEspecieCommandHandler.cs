using feedback_zoologic.Features.Especies.Domain;
using MediatR;
using feedback_zoologic.Application.Commands.Create;

namespace feedback_zoologic.Features.Especies.Application.Commands.Create
{
    public class CreateEspecieCommandHandler : IRequestHandler<CreateEspecieCommand, CreateEspecieResponse>
    {
        private readonly IEspecieRepository _repository;

        public CreateEspecieCommandHandler(IEspecieRepository repository)
        {
            _repository = repository;
        }

        public async Task<CreateEspecieResponse> Handle(CreateEspecieCommand request, CancellationToken cancellationToken)
        {
            var especie = new Especie(
                
                request.EspecieId,
                request.NombreCientifico,
                request.NombreComun,
                request.Familia,
                request.Clase,
                request.Sexo,
                request.Peso,
                request.FechaLlegada,
                request.Procedencia,
                request.Observaciones,
                request.HabitatId
            );

            var result = new CreateEspecieResponse(await _repository.AddAsync(especie));

            return result;
        }
    }
}
