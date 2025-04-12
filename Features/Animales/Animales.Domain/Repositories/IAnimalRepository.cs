using feedback_zoologic.Features.Animales.Domain;
using feedback_zoologic.Features.Animales.Infraestructure.Models;

namespace feedback_zoologic.Features.Animales.Domain 
{
    public interface IAnimalRepository 
    {
        Task<Animal[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Animal animal, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Animal animal, CancellationToken cancellationToken = default);
    }
}