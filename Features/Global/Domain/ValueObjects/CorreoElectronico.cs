using System.Text.RegularExpressions;

namespace feedback_zoologic.Features.Global.Domain.ValueObjects
{
    public partial record CorreoElectronico
    {
        private const string Pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        private CorreoElectronico(string value) => Value = value;

        public static CorreoElectronico? Create(string value)
        {
            if (string.IsNullOrEmpty(value) || !EmailRegex().IsMatch(value))
            {
                throw new Exception("Correo invalido");
            }

            return new CorreoElectronico(value);
        }

        public string Value { get; init; }

        [GeneratedRegex(Pattern)]
        private static partial Regex EmailRegex();
    }
}