using MediatR;
using feedback_zoologic.Features.Necropsias.Domain;
using feedback_zoologic.Features.Necropsias.Application.Common;

namespace feedback_zoologic.Features.Necropsias.Application
{
    public class GetAllNecropsiasQuery : IRequest<NecropsiaResponse[]>
    {
        public class GetAllNecropsiasQueryQueryHandler  : IRequestHandler<GetAllNecropsiasQuery, NecropsiaResponse[]>
        {
            private readonly INecropsiaRepository necropsiaRepository;

            public GetAllNecropsiasQueryQueryHandler(
                INecropsiaRepository necropsiaRepository
                )
            {
                this.necropsiaRepository = necropsiaRepository;
            }

            public async Task<NecropsiaResponse[]> Handle(
                GetAllNecropsiasQuery request,
                CancellationToken cancellationToken)
            {
                var necropsias = await necropsiaRepository.Get(cancellationToken);
                return necropsias.Select(r => new NecropsiaResponse 
                {
                    NecropsiaId = r.NecropsiaId,
                    EspecieId = r.EspecieId,
                    EspecieNombre = r.EspecieNombre,
                    FechaMuerte = r.FechaMuerte,
                    Procedencia = r.Procedencia,
                    FechaNecropsia = r.FechaNecropsia,
                    Historia = r.Historia,
                    ExamenId = r.ExamenId,
                    NombreExamen = r.NombreExamen,
                    UsuarioId = r.UsuarioId,
                    NombreUsuario = r.NombreUsuario

                }).ToArray();
            }
        }
    }
}