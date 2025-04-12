using feedback_zoologic.Features.Zonas.Domain;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;

namespace feedback_zoologic.Features.Zonas.Domain 
{
    public interface IZonaRepository 
    {
        Task<Zona[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Zona zona, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Zona zona, CancellationToken cancellationToken = default);
    }
}