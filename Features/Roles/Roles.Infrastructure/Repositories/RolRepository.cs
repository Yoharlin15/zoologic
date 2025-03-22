using AutoMapper;
using feedback_zoologic.Features.Roles.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Application;

namespace feedback_zoologic.Features.Roles.Infrastructure.Persistence
{
    internal class RolRepository : DataRepository<RolDbContext, Rol>,
    
        IRolRepository
    {
        private readonly IMapper _mapper;
        private readonly RolDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RolRepository(IMapper mapper, RolDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }
        public async Task<Rol[]> Get(CancellationToken cancellationToken = default)
        {
            List<RolDataModel>? result = await _context.Roles 
                .ToListAsync(cancellationToken);

            var mappedRoles = _mapper.Map<Rol[]>(result);
            return mappedRoles;
        }

        public Task<int> AddAsync(Rol rol, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}