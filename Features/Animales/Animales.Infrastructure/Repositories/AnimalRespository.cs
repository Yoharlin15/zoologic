using AutoMapper;
using feedback_zoologic.Features.Animales.Domain;
using feedback_zoologic.Features.Animales.Infraestructure.Models;
using feedback_zoologic.Features.Global.Application;
using Microsoft.EntityFrameworkCore;

namespace feedback_zoologic.Features.Animales.Infrastructure.Persistence
{
    internal class AnimalRepository : DataRepository<AnimalDbContext, Animal>,
    
        IAnimalRepository
    {
        private readonly IMapper _mapper;
        private readonly AnimalDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AnimalRepository(IMapper mapper, AnimalDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<int> AddAsync(Animal animal, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Animal[]> Get(CancellationToken cancellationToken = default)
        {
             List<AnimalDataModel>? result = await _context.Animales 
                .ToListAsync(cancellationToken);
                
            var mappedAnimales = _mapper.Map<Animal[]>(result);
            return mappedAnimales;
        }

        public Task<int> UpdateAsync(Animal animal, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
