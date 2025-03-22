using TratamientosModels = feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Habitats.Infraestructure.Configurations;


public class TratamientoDbContext : BaseDbContext<TratamientoDbContext>
{
    public TratamientoDbContext(
        DbContextOptions<TratamientoDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<TratamientoDataModel> Tratamientos { get; set; }
    public DbSet<UsuarioDataModel> Usuarios { get; set; }
    public DbSet<EspecieDataModel> Especies { get; set; }
    public DbSet<HabitatDataModel> Habitats { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new TratamientosModels.TratamientosConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());
        modelBuilder.ApplyConfiguration(new HabitatConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}