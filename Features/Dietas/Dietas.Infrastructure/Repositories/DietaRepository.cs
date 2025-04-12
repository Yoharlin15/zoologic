using AutoMapper;
using feedback_zoologic.Features.Dietas.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Dietas.Infraestructure.Models;

namespace feedback_zoologic.Features.Dietas.Infrastructure.Persistence
{
    internal class DietaRepository : DataRepository<DietaDbContext, Dieta>,
    
        IDietaRepository
    {
        private readonly IMapper _mapper;
        private readonly DietaDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DietaRepository(IMapper mapper, DietaDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<int> AddAsync(Dieta dieta, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Dieta[]> Get(CancellationToken cancellationToken = default)
        {
            List<DietaDataModel>? result = await _context.Dietas
                .Include(e => e.especies)
                .Include(e => e.usuarios)

                .ToListAsync(cancellationToken);

            var mappedDietas = _mapper.Map<Dieta[]>(result);
            return mappedDietas;
        }

        public Task<int> UpdateAsync(Dieta dieta, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
