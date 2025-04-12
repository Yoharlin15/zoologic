using MediatR;
using feedback_zoologic.Features.Animales.Domain;
using feedback_zoologic.Features.Empleados.Application.Common;

namespace feedback_zoologic.Features.Animales.Application
{
    public class GetAllAnimalesQuery : IRequest<AnimalResponse[]>
    {
        public class GetAllAnimalesQueryQueryHandler  : IRequestHandler<GetAllAnimalesQuery, AnimalResponse[]>
        {
            private readonly IAnimalRepository animalRepository;

            public GetAllAnimalesQueryQueryHandler(
                IAnimalRepository animalRepository
                )
            {
                this.animalRepository = animalRepository;
            }

            public async Task<AnimalResponse[]> Handle(
                GetAllAnimalesQuery request,
                CancellationToken cancellationToken)
            {
                var animales = await animalRepository.Get(cancellationToken);
                return animales.Select(r => new AnimalResponse
                {
                    AnimalId = r.AnimalId,
                    EspecieId = r.EspecieId,
                    Sexo = r.Sexo,
                    FechaNacimiento = r.FechaNacimiento,
                    Observaciones = r.Observaciones,
                    ZonaId = r.ZonaId,
                    CreadoPor = r.CreadoPor,
                }).ToArray();
            }
        }
    }
}