using Microsoft.EntityFrameworkCore;

// public abstract class DataRepository<TDbContext, TEntity> : IDomainRepository<TEntity>
public abstract class DataRepository<TDbContext, TEntity> 
    where TDbContext : DbContext
    where TEntity : Entity, IAggregateRoot
{
    protected DataRepository(TDbContext db) => Data = db;

    protected TDbContext Data { get; }

    protected IQueryable<TEntity> All() => Data.Set<TEntity>();

    protected IQueryable<TEntity> AllAsNoTracking() => All().AsNoTracking();

    // public async System.Threading.Tasks.Task Save(
    //     TEntity entity,
    //     CancellationToken cancellationToken = default)
    // {
    //     Data.Add(entity);
    //     await Data.SaveChangesAsync(cancellationToken);
    // }

    
}
