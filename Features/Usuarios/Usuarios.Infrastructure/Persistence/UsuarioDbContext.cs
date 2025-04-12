using UsuariosModels = feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Zonas.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;

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
        modelBuilder.ApplyConfiguration(new ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());
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
