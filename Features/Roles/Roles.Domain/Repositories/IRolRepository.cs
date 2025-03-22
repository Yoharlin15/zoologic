// using feedback_zoologic.Features.Roles.Application.Common;
using feedback_zoologic.Features.Roles.Domain;
using feedback_zoologic.Features.Roles.Infraestructure.Models;

namespace feedback_zoologic.Features.Roles.Domain 
{
    public interface IRolRepository 
    {
        Task<Rol[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Rol rol, CancellationToken cancellationToken = default);
        // Task<int> UpdateAsync(Rol; rol, CancellationToken cancellationToken = default);
    }

}