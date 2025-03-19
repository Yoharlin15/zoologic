using AutoMapper;
using feedback_zoologic.Features.Especies.Domain;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Application;

namespace feedback_zoologic.Features.Especies.Infrastructure.Persistence
{
    internal class EspecieRepository : DataRepository<EspecieDbContext, Especie>,
    
        IEspecieRepository,
        IEspecieQueryRepository
    {
        private readonly IMapper _mapper;
        private readonly EspecieDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public EspecieRepository(IMapper mapper, EspecieDbContext context, ICurrentUserService currentUserService)
        : base(context)
        {
            _mapper = mapper;
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Especie[]> Get(CancellationToken cancellationToken = default)
        {
            List<EspecieDataModel>? result = await _context.Especies 
                .ToListAsync(cancellationToken);

            var mappedEspecies = _mapper.Map<Especie[]>(result);
            return mappedEspecies;
        }

        public async Task<int> AddAsync(Especie especie, CancellationToken cancellationToken = default)
        {
            var especiedb = new EspecieDataModel
            {
                NombreCientifico = especie.NombreCientifico,
                NombreComun = especie.NombreComun,
                Familia = especie.Familia,
                Clase = especie.Clase,
                Sexo = especie.Sexo,
                Peso = especie.Peso,
                FechaLlegada = especie.FechaLlegada,
                Procedencia = especie.Procedencia,
                Observaciones = especie.Observaciones
            };

            var data = await _context.Especies.AddAsync(especiedb);
            await _context.SaveChangesAsync(cancellationToken);

            return data.Entity.EspecieId;
        }

        public async Task<int> UpdateAsync(Especie especie, CancellationToken cancellationToken = default)
        {
            var especiedb = await _context.Especies
                .FirstOrDefaultAsync(t => t.EspecieId == especie.EspecieId);

            if (especiedb == null)
            {
                throw new ArgumentException($"Especie con ID {especie.EspecieId} no encontrado.");
            }

            especiedb.EspecieId = especie.EspecieId;
            especiedb.NombreCientifico = especie.NombreCientifico;
            especiedb.Familia = especie.Familia;
            especiedb.Clase = especie.Clase;
            especiedb.Sexo = especie.Sexo;
            especiedb.Peso = especie.Peso;
            especiedb.FechaLlegada = especie.FechaLlegada;
            especiedb.Procedencia = especie.Procedencia;
            especiedb.Observaciones = especie.Observaciones;
           
            var data = _context.Especies.Update(especiedb);
            await _context.SaveChangesAsync(cancellationToken);
            return data.Entity.EspecieId;
        }
    }
}
