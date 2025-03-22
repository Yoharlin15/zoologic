using MediatR;
using feedback_zoologic.Features.Habitats.Application.Common;
using feedback_zoologic.Features.Habitats.Domain;

namespace feedback_zoologic.Features.Empleados.Application
{
    public class GetAllHabitatsQuery : IRequest<HabitatResponse[]>
    {
        public class GetAllHabitatsQueryQueryHandler  : IRequestHandler<GetAllHabitatsQuery, HabitatResponse[]>
        {
            private readonly IHabitatRepository habitatRepository;

            public GetAllHabitatsQueryQueryHandler(
                IHabitatRepository habitatRepository
                )
            {
                this.habitatRepository = habitatRepository;
            }

            public async Task<HabitatResponse[]> Handle(
                GetAllHabitatsQuery request,
                CancellationToken cancellationToken)
            {
                var habitats = await habitatRepository.Get(cancellationToken);
                return habitats.Select(r => new HabitatResponse
                {
                    HabitatId = r.HabitatId,
                    Nombre = r.Nombre,
                    Descripcion = r.Descripcion,
                    UsuarioId = r.UsuarioId,
                    Tamaño = r.Tamaño,
                    CapacidadMaxima = r.CapacidadMaxima,
                }).ToArray();
            }
        }
    }
}