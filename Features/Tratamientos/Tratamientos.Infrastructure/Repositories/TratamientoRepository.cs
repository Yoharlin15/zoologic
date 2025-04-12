using AutoMapper;
using feedback_zoologic.Features.Tratamientos.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;

namespace feedback_zoologic.Features.Tratamientos.Infrastructure.Persistence
{
    internal class TratamientoRepository : DataRepository<TratamientoDbContext, Tratamiento>,
    
        ITratamientoRepository
    {
        private readonly IMapper _mapper;
        private readonly TratamientoDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public TratamientoRepository(IMapper mapper, TratamientoDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> AddAsync(Tratamiento tratamiento, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Tratamiento[]> Get(CancellationToken cancellationToken = default)
        {
            List<TratamientoDataModel>? result = await _context.Tratamientos
                .Include(t => t.especies)
                .Include(t => t.zonas)
                .Include(t => t.usuarios)
                .ToListAsync(cancellationToken);
                
            var mappedTratamientos = _mapper.Map<Tratamiento[]>(result);
            return mappedTratamientos;
        }

        public Task<int> UpdateAsync(Tratamiento tratamiento, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
