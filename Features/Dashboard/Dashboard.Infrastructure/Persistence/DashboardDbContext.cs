using feedback_zoologic.Features.Global.Application;
using Microsoft.EntityFrameworkCore;
public class DashboardDbContext : BaseDbContext<DashboardDbContext>
{

    public DbSet<TotalesDataModel> Totales { get; set; }

    public DashboardDbContext(
        DbContextOptions<DashboardDbContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserService currentUserService
        
        )
        : base(options, eventDispatcher, currentUserService)
    {
    }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TotalesDataModel>().HasNoKey();
        
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Name=ConnectionStrings:ProjectConnectionString");
    }
}

