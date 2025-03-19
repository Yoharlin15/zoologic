using feedback_zoologic.Features.Especies.Application.Common;
using feedback_zoologic.Features.Especies.Domain;
using feedback_zoologic.Features.Especies.Infraestructure.Models;

namespace feedback_zoologic.Features.Especies.Domain 
{
    public interface IEspecieRepository 
    {
        Task<Especie[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Especie especie, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Especie especie, CancellationToken cancellationToken = default);
    }

}