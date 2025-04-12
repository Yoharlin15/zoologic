using ZonasModels = feedback_zoologic.Features.Zonas.Infraestructure.Configurations;
using feedback_zoologic.Features.Zonas.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Dietas.Infraestructure.Configurations;
using feedback_zoologic.Features.Animales.Infraestructure.Configurations;

public class ZonaDbContext : BaseDbContext<ZonaDbContext>
{
    public ZonaDbContext(
        DbContextOptions<ZonaDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<ZonaDataModel> Zonas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ZonasModels.ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());
        modelBuilder.ApplyConfiguration(new TratamientosConfiguration());
        modelBuilder.ApplyConfiguration(new ExamenConfiguration());
        modelBuilder.ApplyConfiguration(new NecropsiaConfiguration());
        modelBuilder.ApplyConfiguration(new DietaConfiguration());
        modelBuilder.ApplyConfiguration(new AnimalConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}