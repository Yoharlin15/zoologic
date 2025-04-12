using AnimalesModels = feedback_zoologic.Features.Animales.Infraestructure.Configurations;
using feedback_zoologic.Features.Animales.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Zonas.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Dietas.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;

public class AnimalDbContext : BaseDbContext<AnimalDbContext>
{
    public AnimalDbContext(
        DbContextOptions<AnimalDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<AnimalDataModel> Animales { get; set; }
    public DbSet<EspecieDataModel> Especies { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AnimalesModels.AnimalConfiguration());
        modelBuilder.ApplyConfiguration(new ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new TratamientosConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new ExamenConfiguration());
        modelBuilder.ApplyConfiguration(new NecropsiaConfiguration());
        modelBuilder.ApplyConfiguration(new DietaConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}