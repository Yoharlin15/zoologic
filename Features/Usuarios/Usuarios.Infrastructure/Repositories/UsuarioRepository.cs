using AutoMapper;
using feedback_zoologic.Features.Usuarios.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Application;

namespace feedback_zoologic.Features.Usuarios.Infrastructure.Persistence
{
    internal class UsuarioRepository : DataRepository<UsuarioDbContext, Usuario>,
    
        IUsuarioRepository
    {
        private readonly IMapper _mapper;
        private readonly UsuarioDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UsuarioRepository(IMapper mapper, UsuarioDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<int> AddAsync(Usuario usuario, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Usuario[]> Get(CancellationToken cancellationToken = default)
        {
            List<UsuarioDataModel>? result = await _context.Usuarios
                .Include(e => e.roles)
                .ToListAsync(cancellationToken);

            var mappedUsuarios = _mapper.Map<Usuario[]>(result);
            return mappedUsuarios;
        }

        public Task<int> UpdateAsync(Usuario usuario, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
