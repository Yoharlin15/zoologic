using AutoMapper;
using feedback_zoologic.Features.Zonas.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;

namespace feedback_zoologic.Features.Zonas.Infrastructure.Persistence
{
    internal class ZonaRepository : DataRepository<ZonaDbContext, Zona>,
    
        IZonaRepository
    {
        private readonly IMapper _mapper;
        private readonly ZonaDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public ZonaRepository(IMapper mapper, ZonaDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }
        public async Task<Zona[]> Get(CancellationToken cancellationToken)
        {
            List<ZonaDataModel>? result = await _context.Zonas 
                .ToListAsync(cancellationToken);
                
            var mappedZonas = _mapper.Map<Zona[]>(result);
            return mappedZonas;
        }

        public Task<int> AddAsync(Zona habitat, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Zona habitat, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
