namespace feedback_zoologic.Global.Application.ValidationsForms
{
    public class ValidationsForm
    {
        public Dictionary<string, FieldValidation> Validaciones { get; set; } = new Dictionary<string, FieldValidation>();

        internal static string GetRequired()
        {
            return "Este campo es requerido";
        }
        internal static ValidationType GetMaxLength(int value)
        {
            ValidationType ML = new ValidationType();
            ML.value = value;
            ML.message = $"No puede exceder los {value} caracteres";
            return ML;
        }
        internal static ValidationType GetMinLength(int value)
        {
            ValidationType ML = new ValidationType();
            ML.value = value;
            ML.message = $"Debe tener al menos {value} caracteres";
            return ML;
        }
        internal static ValidationType GetMin(int value)
        {
            ValidationType ML = new ValidationType();
            ML.value = value;
            ML.message = $"El valor mínimo es {value}";
            return ML;
        }
        internal static ValidationType GetMax(int value)
        {
            ValidationType ML = new ValidationType();
            ML.value = value;
            ML.message = $"El valor máximo es {value}";
            return ML;
        }
    }
}