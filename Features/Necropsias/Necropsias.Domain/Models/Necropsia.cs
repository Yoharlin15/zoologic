namespace feedback_zoologic.Features.Necropsias.Domain
{
    public class Necropsia : Entity, IAggregateRoot
    {
        public Necropsia
        (
            int necropsiaId,
            int especieId,
            DateTime fechaMuerte,
            string procedencia,
            DateTime fechaNecropsia,
            string historia,
            int examenId,
            int usuarioId
        )

        {
            NecropsiaId = necropsiaId;
            EspecieId = especieId;
            FechaMuerte = fechaMuerte;
            Procedencia = procedencia;
            FechaNecropsia = fechaNecropsia;
            Historia = historia;
            ExamenId = examenId;
            UsuarioId = usuarioId;
        }

        public int NecropsiaId { get; set; }
        public int EspecieId { get; set; }
        public string EspecieNombre {get; set; } = null!; 
        public DateTime FechaMuerte {get; set;}
        public string Procedencia {get; set;} = null!;
        public DateTime FechaNecropsia { get; set; }
        public string Historia {get; set; } = null!;
        public int ExamenId {get; set;}
        public string NombreExamen {get; set;} = null!;
        public int UsuarioId {get; set;}
        public string NombreUsuario {get; set;} = null!;
    }
}