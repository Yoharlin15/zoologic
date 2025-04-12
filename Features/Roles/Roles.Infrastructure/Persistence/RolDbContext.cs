using RolesModels = feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Zonas.Infraestructure.Configurations;

public class RolDbContext : BaseDbContext<RolDbContext>
{
    public RolDbContext(
        DbContextOptions<RolDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<RolDataModel> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new RolesModels.RolConfiguration());
        modelBuilder.ApplyConfiguration(new ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
