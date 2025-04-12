using NecropsiasModels = feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Usuarios.Infraestructure.Configurations;
using feedback_zoologic.Features.Examenes.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Necropsias.Infraestructure.Configurations;
using feedback_zoologic.Features.Roles.Infraestructure.Configurations;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using feedback_zoologic.Features.Zonas.Infraestructure.Configurations;
using feedback_zoologic.Features.Dietas.Infraestructure.Configurations;

public class NecropsiaDbContext : BaseDbContext<NecropsiaDbContext>
{
    public NecropsiaDbContext(
        DbContextOptions<NecropsiaDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<NecropsiaDataModel> Necropsias { get; set; }
    public DbSet<EspecieDataModel> Especies { get; set; }
    public DbSet<ExamenDataModel> ExamenesClinicos {get; set;}
    public DbSet<UsuarioDataModel> Usuarios {get; set;}


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new NecropsiasModels.NecropsiaConfiguration());
        modelBuilder.ApplyConfiguration(new EspeciesConfiguration());
        modelBuilder.ApplyConfiguration(new ExamenConfiguration());
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new ZonaConfiguration());
        modelBuilder.ApplyConfiguration(new RolConfiguration());
        modelBuilder.ApplyConfiguration(new TratamientosConfiguration());
        modelBuilder.ApplyConfiguration(new DietaConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}