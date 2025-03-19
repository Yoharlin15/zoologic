namespace feedback_zoologic.Features.Global.Web.Models 
{
    public class ResponseDTO
    {
        public bool IsSuccess { get; set; }
        public object? Result { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? ErrorMessages { get; set; }
    }
}