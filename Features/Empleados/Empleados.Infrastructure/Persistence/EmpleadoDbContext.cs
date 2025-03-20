using EmpleadosModels = feedback_zoologic.Features.Empleados.Infraestructure.Configurations;
using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;

public class EmpleadoDbContext : BaseDbContext<EmpleadoDbContext>
{
    public EmpleadoDbContext(
        DbContextOptions<EmpleadoDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
    )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    public DbSet<EmpleadoDataModel> Empleados { get; set; }
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EmpleadosModels.EmpleadoConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
