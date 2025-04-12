using feedback_zoologic.Features.Necropsias.Domain;
using feedback_zoologic.Features.Especies.Infraestructure.Models;

namespace feedback_zoologic.Features.Necropsias.Domain 
{
    public interface INecropsiaRepository 
    {
        Task<Necropsia[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Necropsia necropsia, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Necropsia necropsia, CancellationToken cancellationToken = default);
    }
}