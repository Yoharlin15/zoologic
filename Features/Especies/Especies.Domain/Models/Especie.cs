namespace feedback_zoologic.Features.Especies.Domain
{
    public class Especie : Entity, IAggregateRoot
    {
        public Especie
        (
            int especieId,
            string nombreCientifico,
            string nombreComun,
            string familia,
            string clase, 
            string procedencia,
            int zonaId
        )

        {
            EspecieId = especieId;
            NombreCientifico = nombreCientifico;
            NombreComun = nombreComun;
            Familia = familia;
            Clase = clase;
            Procedencia = procedencia;
            ZonaId = zonaId;
        }

        public int EspecieId { get; set; }
        public string NombreCientifico { get; set; } = null!;
        public string NombreComun { get; set; } = null!;
        public string Familia { get; set; } = null!;
        public string Clase { get; set; } = null!;
        public string Procedencia { get; set; } = null!;
        public int ZonaId { get; set; }
        public string NombreZona { get; set; } = null!;
    }
}

