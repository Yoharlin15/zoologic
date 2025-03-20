using AutoMapper;
using feedback_zoologic.Features.Empleados.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using feedback_zoologic.Features.Empleados.Application;


namespace feedback_zoologic.Features.Empleados.Infrastructure.Persistence
{
    internal class EmpleadoRepository : DataRepository<EmpleadoDbContext, Empleado>,
    
        IEmpleadoRepository,
        IEmpleadoQueryRepository
    {
        private readonly IMapper _mapper;
        private readonly EmpleadoDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public EmpleadoRepository(IMapper mapper, EmpleadoDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<int> AddAsync(Empleado especie, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Empleado[]> Get(CancellationToken cancellationToken = default)
        {
            List<EmpleadoDataModel>? result = await _context.Empleados 
                .ToListAsync(cancellationToken);

            var mappedEmpleados = _mapper.Map<Empleado[]>(result);
            return mappedEmpleados;
        }

        public Task<int> UpdateAsync(Empleado especie, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
