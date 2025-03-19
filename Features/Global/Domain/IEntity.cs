namespace feedback_zoologic.Features.Global.Domain
{
    public interface IEntity<TKey>
    where TKey : notnull
    {
        public TKey Id { get; }
    }
}