public interface IEventHandler<in TEvent>
    where TEvent : IDomainEvent
{
    System.Threading.Tasks.Task Handle(TEvent domainEvent);
}