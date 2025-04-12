using AutoMapper;
using feedback_zoologic.Features.Necropsias.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using feedback_zoologic.Features.Necropsias.Application;

namespace feedback_zoologic.Features.Necropsias.Infrastructure.Persistence
{
    internal class NecropsiaRepository : DataRepository<NecropsiaDbContext, Necropsia>,
    
        INecropsiaRepository
    {
        private readonly IMapper _mapper;
        private readonly NecropsiaDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public NecropsiaRepository(IMapper mapper, NecropsiaDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<int> AddAsync(Necropsia necropsia, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Necropsia[]> Get(CancellationToken cancellationToken = default)
        {
             List<NecropsiaDataModel>? result = await _context.Necropsias
                .Include(t => t.especies)
                .Include(t => t.examenes)
                .Include(t => t.usuarios)
                .ToListAsync(cancellationToken);

            var mappedNecropsias = _mapper.Map<Necropsia[]>(result);
            return mappedNecropsias;
        }

        public Task<int> UpdateAsync(Necropsia necropsia, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
