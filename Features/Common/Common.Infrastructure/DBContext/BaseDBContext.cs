using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Global.Infraestructure;
using Microsoft.EntityFrameworkCore;

public abstract class BaseDbContext<TContext> : DbContext where TContext : DbContext
{
    private readonly IEventDispatcher _eventDispatcher;
    private readonly Stack<object> _savesChangesTracker;
    private readonly ICurrentUserService _currentUserService;
    

    protected BaseDbContext(DbContextOptions<TContext> options, IEventDispatcher eventDispatcher, ICurrentUserService currentUserService)
        : base(options)
    {
        _eventDispatcher = eventDispatcher;
        _savesChangesTracker = new Stack<object>();
        _currentUserService = currentUserService;

    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        _savesChangesTracker.Push(new object());

        var entitiesWithEvents = ChangeTracker
            .Entries<IEntity>()
            .Where(e => e.Entity.Events!.Any())
            .Select(e => e.Entity)
            .ToArray();

        foreach (var entity in entitiesWithEvents)
        {
            var events = entity.Events!.ToArray();
            entity.ClearEvents();

            foreach (var domainEvent in events)
            {
                await _eventDispatcher.Dispatch(domainEvent);
            }
        }

        var auditableEntities = ChangeTracker.Entries<IAuditable>();

        foreach (var entity in auditableEntities)
        {
            if (entity.State == EntityState.Added)
            {
                entity.Entity.CreadoPor = _currentUserService.UsuarioId;
                entity.Entity.FechaCreacion = DateTime.Now;
            }
            else if (entity.State == EntityState.Modified)
            {
                entity.Entity.ModificadoPor = _currentUserService.UsuarioId;
                entity.Entity.FechaModificacion = DateTime.Now;
            }
        }

        _savesChangesTracker.Pop();

        if (!_savesChangesTracker.Any())
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        return 0;
    }
}