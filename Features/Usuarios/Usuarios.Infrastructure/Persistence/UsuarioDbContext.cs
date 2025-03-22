using UsuariosModels = feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Habitats.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;

public class UsuarioDbContext : BaseDbContext<UsuarioDbContext>
{
    public UsuarioDbContext(
        DbContextOptions<UsuarioDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<UsuarioDataModel> Usuarios { get; set; }
    public DbSet<RolDataModel> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuariosModels.UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new HabitatConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
