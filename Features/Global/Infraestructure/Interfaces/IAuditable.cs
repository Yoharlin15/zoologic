namespace feedback_zoologic.Features.Global.Infraestructure
{
    public interface IAuditable
    {
        int CreadoPor { get; set; }
        DateTime FechaCreacion { get; set; }
        int? ModificadoPor { get; set; }
        DateTime? FechaModificacion { get; set; }
    }
}
