using feedback_zoologic.Features.Empleados.Application.Common;
using feedback_zoologic.Features.Empleados.Domain;
using feedback_zoologic.Features.Empleados.Infraestructure.Models;

namespace feedback_zoologic.Features.Empleados.Domain 
{
    public interface IEmpleadoRepository 
    {
        Task<Empleado[]> Get(CancellationToken cancellationToken = default);
        Task<int> AddAsync(Empleado empleado, CancellationToken cancellationToken = default);
        Task<int> UpdateAsync(Empleado empleados, CancellationToken cancellationToken = default);
    }

}