using feedback_zoologic.Features.Dietas.Domain;
using feedback_zoologic.Features.Dietas.Infraestructure.Models;

namespace feedback_zoologic.Features.Dietas.Domain 
{
    public interface IDietaRepository 
    {
        Task<Dieta[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Dieta dieta, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Dieta dieta, CancellationToken cancellationToken = default);
    }
}