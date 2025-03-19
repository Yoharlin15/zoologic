using EspeciesModels = feedback_zoologic.Features.Especies.Infraestructure.Configurations;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using feedback_zoologic.Features.Global.Application;

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
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EspeciesModels.EspeciesConfiguration());

        base.OnModelCreating(modelBuilder);
    }   
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}
