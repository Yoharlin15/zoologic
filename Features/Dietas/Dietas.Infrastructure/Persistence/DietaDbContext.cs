using DietasModels = feedback_zoologic.Features.Dietas.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Zonas.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;
using feedback_zoologic.Features.Dietas.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;

public class DietaDbContext : BaseDbContext<DietaDbContext>
{
    public DietaDbContext(
        DbContextOptions<DietaDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<DietaDataModel> Dietas { get; set; }
    public DbSet<EspecieDataModel> Especies { get; set; }
    public DbSet<UsuarioDataModel> Usuarios {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new DietasModels.DietaConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new ExamenConfiguration());
        modelBuilder.ApplyConfiguration(new NecropsiaConfiguration());
        modelBuilder.ApplyConfiguration(new TratamientosConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
