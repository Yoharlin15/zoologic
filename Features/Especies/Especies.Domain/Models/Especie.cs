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
            string sexo, 
            string peso, 
            DateTime fechaLlegada,
            string procedencia,
            string observaciones
        )

        {
            EspecieId = especieId;
            NombreCientifico = nombreCientifico;
            NombreComun = nombreComun;
            Familia = familia;
            Clase = clase;
            Sexo = sexo;
            Peso = peso;
            FechaLlegada = fechaLlegada;
            Procedencia = procedencia;
            Observaciones = observaciones;
        }

        public int EspecieId { get; set; }
        public string NombreCientifico { get; set; } = null!;
        public string NombreComun { get; set; } = null!;
        public string Familia { get; set; } = null!;
        public string Clase { get; set; } = null!;
        public string Sexo { get; set; } = null!;
        public string Peso { get; set; } = null!;
        public DateTime FechaLlegada { get; set; }
        public string Procedencia { get; set; } = null!;
        public string Observaciones {get; set;} = null!;

        // Implementación de Entity
        public int Id => EspecieId;
        
        public Especie UpdateOrganizacionId(int epecieId)
        {
            if(epecieId != 0)
                EspecieId = epecieId;
            return this;
        }
    }
}

