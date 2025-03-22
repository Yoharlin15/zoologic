using AutoMapper;
using feedback_zoologic.Features.Habitats.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Habitats.Application;

namespace feedback_zoologic.Features.Habitats.Infrastructure.Persistence
{
    internal class HabitatRepository : DataRepository<HabitatDbContext, Habitat>,
    
        IHabitatRepository
    {
        private readonly IMapper _mapper;
        private readonly HabitatDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public HabitatRepository(IMapper mapper, HabitatDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Habitat[]> Get(CancellationToken cancellationToken)
        {
            List<HabitatDataModel>? result = await _context.Habitats 
                .ToListAsync(cancellationToken);
                
            var mappedHabitats = _mapper.Map<Habitat[]>(result);
            return mappedHabitats;
        }

        public Task<int> AddAsync(Habitat habitat, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Habitat habitat, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        
    }
}
