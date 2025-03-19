public interface IDomainRepository<TEntity>
    where TEntity : IAggregateRoot
{
    System.Threading.Tasks.Task Save(TEntity entity, CancellationToken cancellationToken = default);
}