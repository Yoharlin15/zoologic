namespace feedback_zoologic.Features.Zonas.Domain
{
    public class Zona : Entity, IAggregateRoot
    {
        public Zona
        (
            int zonaId,
            string nombreZona
        )

        {
            ZonaId = zonaId;
            NombreZona = nombreZona;
        }
        public int ZonaId { get; set; }
        public string NombreZona {get; set;} = null!;
    }
}

