using MediatR;
using feedback_zoologic.Features.Zonas.Application.Common;
using feedback_zoologic.Features.Zonas.Domain;

namespace feedback_zoologic.Features.Zonas.Application
{
    public class GetAllZonasQuery : IRequest<ZonaResponse[]>
    {
        public class GetAllZonasQueryQueryHandler  : IRequestHandler<GetAllZonasQuery, ZonaResponse[]>
        {
            private readonly IZonaRepository zonaRepository;

            public GetAllZonasQueryQueryHandler(
                IZonaRepository zonaRepository
                )
            {
                this.zonaRepository = zonaRepository;
            }

            public async Task<ZonaResponse[]> Handle(
                GetAllZonasQuery request,
                CancellationToken cancellationToken)
            {
                var habitats = await zonaRepository.Get(cancellationToken);
                return habitats.Select(r => new ZonaResponse
                {
                    ZonaId = r.ZonaId,
                    NombreZona = r.NombreZona,
                }).ToArray();
            }
        }
    }
}