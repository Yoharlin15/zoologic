namespace feedback_zoologic.Global.Application.ValidationsForms
{
    public class FieldValidation
    {
        public string? required { get; set; }
        public ValidationType? maxLength { get; set; }
        public ValidationType? minLength { get; set; }
        public ValidationType? min { get; set; }
        public ValidationType? max { get; set; }
        public ValidationTypeVS? pattern { get; set; }
        public ValidationType? validate { get; set; }
    }
}