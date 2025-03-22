using feedback_zoologic.Features.Habitats.Domain;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;

namespace feedback_zoologic.Features.Habitats.Domain 
{
    public interface IHabitatRepository 
    {
        Task<Habitat[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Habitat habitat, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Habitat habitat, CancellationToken cancellationToken = default);
    }
}