using feedback_zoologic.Features.Tratamientos.Domain;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;

namespace feedback_zoologic.Features.Tratamientos.Domain 
{
    public interface ITratamientoRepository 
    {
        Task<Tratamiento[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Tratamiento tratamiento, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Tratamiento tratamiento, CancellationToken cancellationToken = default);
    }
}