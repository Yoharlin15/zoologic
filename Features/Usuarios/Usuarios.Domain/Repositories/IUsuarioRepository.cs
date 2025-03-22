// using feedback_zoologic.Features.Usuarios.Application.Common;
using feedback_zoologic.Features.Usuarios.Domain;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;

namespace feedback_zoologic.Features.Usuarios.Domain 
{
    public interface IUsuarioRepository 
    {
        Task<Usuario[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Usuario usuario, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Usuario usuario, CancellationToken cancellationToken = default);
    }

}