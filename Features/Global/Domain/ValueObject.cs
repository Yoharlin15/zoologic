namespace feedback_zoologic.Features.Global.Domain
{
    public abstract class ValueObject<T> where T : ValueObject<T>
    {
        public abstract bool Equals(T other);
        public abstract override int GetHashCode();

        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            return Equals((T)obj);
        }
    }

}
