using MediatR;
using feedback_zoologic.Features.Especies.Application.Common;
using feedback_zoologic.Features.Tratamientos.Domain;

namespace feedback_zoologic.Features.Tratamientos.Application
{
    public class GetAllTratamientosQuery : IRequest<TratamientoResponse[]>
    {
        public class GetAllTratamientosQueryQueryHandler  : IRequestHandler<GetAllTratamientosQuery, TratamientoResponse[]>
        {
            private readonly ITratamientoRepository tratamientoRepository;

            public GetAllTratamientosQueryQueryHandler(
                ITratamientoRepository tratamientoRepository
                )
            {
                this.tratamientoRepository = tratamientoRepository;
            }

            public async Task<TratamientoResponse[]> Handle(
                GetAllTratamientosQuery request,
                CancellationToken cancellationToken)
            {
                var tratamientos = await tratamientoRepository.Get(cancellationToken);
                return tratamientos.Select(r => new TratamientoResponse
                {
                    TratamientoId = r.TratamientoId,
                    NombreTratamiento = r.NombreTratamiento,
                    EspecieId = r.EspecieId,
                    NombreComun = r.NombreComun,
                    ZonaId = r.ZonaId,
                    NombreZona = r.NombreZona,
                    FechaEntrada = r.FechaEntrada,
                    FechaSalida = r.FechaSalida,
                    UsuarioId = r.UsuarioId,
                    NombreUsuario = r.NombreUsuario,
                    Razon = r.Razon,
                    Procedencia = r.Procedencia,
                }).ToArray();
            }
        }
    }
}