namespace feedback_zoologic.Features.Animales.Domain
{
    public class Animal : Entity, IAggregateRoot
    {
        public Animal
        (
            int animalId,
            int especieId,
            string sexo,
            DateTime fechaNacimiento, 
            string observaciones,
            int zonaId,
            int creadoPor
        )
        {
            AnimalId = animalId;
            EspecieId = especieId;
            Sexo = sexo;
            FechaNacimiento = fechaNacimiento;
            Observaciones = observaciones;
            ZonaId = zonaId;
            CreadoPor = creadoPor;
        }
        public int AnimalId { get; set; }
        public int EspecieId { get; set; }
        public string Sexo { get; set; } = null!;
        public DateTime FechaNacimiento {get; set; }
        public string Observaciones { get; set; } = null!;
        public int ZonaId { get; set; }
        public int CreadoPor { get; set; }
    }
}

