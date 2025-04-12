using MediatR;
using feedback_zoologic.Features.Dietas.Domain;
using feedback_zoologic.Features.Usuarios.Application.Common;

namespace feedback_zoologic.Features.Dietas.Application
{
    public class GetAllDietasQuery : IRequest<DietaResponse[]>
    {
        public class GetAllDietasQueryQueryHandler  : IRequestHandler<GetAllDietasQuery, DietaResponse[]>
        {
            private readonly IDietaRepository dietaRepository;

            public GetAllDietasQueryQueryHandler(
                IDietaRepository dietaRepository
                )
            {
                this.dietaRepository = dietaRepository;
            }

            public async Task<DietaResponse[]> Handle(
                GetAllDietasQuery request,
                CancellationToken cancellationToken)
            {
                var dietas = await dietaRepository.Get(cancellationToken);
                return dietas.Select(r => new DietaResponse
                {
                    DietaId = r.DietaId,
                    EspecieId = r.EspecieId,
                    EspecieNombre = r.EspecieNombre,
                    Alimento = r.Alimento,
                    Cantidad = r.Cantidad,
                    Frecuencia = r.Frecuencia,
                    UsuarioId= r.UsuarioId,
                    NombreUsuario = r.NombreUsuario
                }).ToArray();
            }
        }
    }
}