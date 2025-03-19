public interface IEventDispatcher
{
    System.Threading.Tasks.Task Dispatch(IDomainEvent domainEvent);
}