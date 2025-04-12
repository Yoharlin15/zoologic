using feedback_zoologic.Features.Especies.Application.Common;
using MediatR;
using feedback_zoologic.Features.Especies.Domain;

namespace feedback_zoologic.Features.Especies.Application
{
    public class GetAllEspeciesQuery : IRequest<EspecieResponse[]>
    {
        public class GetAllEspeciesQueryQueryHandler  : IRequestHandler<GetAllEspeciesQuery, EspecieResponse[]>
        {
            private readonly IEspecieRepository especieRepository;

            public GetAllEspeciesQueryQueryHandler(
                IEspecieRepository especieRepository
                )
            {
                this.especieRepository = especieRepository;
            }

            public async Task<EspecieResponse[]> Handle(
                GetAllEspeciesQuery request,
                CancellationToken cancellationToken)
            {
                var especies = await especieRepository.Get(cancellationToken);
                return especies.Select(r => new EspecieResponse
                {
                    EspecieId = r.EspecieId,
                    NombreCientifico = r.NombreCientifico,
                    NombreComun = r.NombreComun,
                    Familia = r.Familia,
                    Clase = r.Clase,
                    Procedencia = r.Procedencia,
                    ZonaId = r.ZonaId,
                    NombreZona = r.NombreZona,
                }).ToArray();
            }
        }
    }
}