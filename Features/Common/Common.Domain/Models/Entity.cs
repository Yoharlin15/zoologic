public abstract class Entity : IEntity
{
    private readonly ICollection<IDomainEvent> events;

    protected Entity() => events = new List<IDomainEvent>();


    public IReadOnlyCollection<IDomainEvent> Events
        => events.ToList().AsReadOnly();

    public void ClearEvents() => events.Clear();

    protected void RaiseEvent(IDomainEvent domainEvent)
        => events.Add(domainEvent);

    
    public static bool operator ==(Entity? first, Entity? second)
    {
        if (first is null && second is null)
        {
            return true;
        }

        if (first is null || second is null)
        {
            return false;
        }

        return first.Equals(second);
    }

    public static bool operator !=(Entity? first, Entity? second) => !(first == second);

}