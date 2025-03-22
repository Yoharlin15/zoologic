using EspeciesModels = feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Habitats.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;

public class EspecieDbContext : BaseDbContext<EspecieDbContext>
{
    public EspecieDbContext(
        DbContextOptions<EspecieDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<EspecieDataModel> Especies { get; set; }
    public DbSet<HabitatDataModel> Habitats { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EspeciesModels.EspeciesConfiguration());
        modelBuilder.ApplyConfiguration(new HabitatConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
