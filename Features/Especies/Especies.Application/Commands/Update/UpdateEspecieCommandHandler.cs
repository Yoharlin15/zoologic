using feedback_zoologic.Features.Especies.Domain;
using MediatR;
using feedback_zoologic.Features.Especies.Application.Commands.Update;

namespace feedback_zoologic.Features.Especies.Application.Commands.Update
{
    public class UpdateEspecieCommandHandler : IRequestHandler<UpdateEspecieCommand, UpdateEspecieResponse>
    {
        private readonly IEspecieRepository _repository;

        public UpdateEspecieCommandHandler(IEspecieRepository repository)
        {
            _repository = repository;
        }

        public async Task<UpdateEspecieResponse> Handle(UpdateEspecieCommand request, CancellationToken cancellationToken)
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

            var result = new UpdateEspecieResponse(await _repository.UpdateAsync(especie));

            return result;
        }
    }
}
