namespace feedback_zoologic.Features.Dietas.Domain
{
    public class Dieta : Entity, IAggregateRoot
    {
        public Dieta
        (
            int dietaId,
            int especieId,
            string alimento,
            string cantidad,
            string frecuencia
        )
        {
            DietaId = dietaId;
            EspecieId = especieId;
            Alimento = alimento;
            Cantidad = cantidad;
            Frecuencia = frecuencia;
        }
        public int DietaId { get; set; }
        public int EspecieId { get; set; }
        public string EspecieNombre {get; set;} = null!;
        public string Alimento {get; set;} = null!;
        public string Cantidad {get; set;} = null!;
        public string Frecuencia {get; set;} = null!;
        public int UsuarioId {get; set;}
        public string NombreUsuario {get; set;} = null!;

    }
}

