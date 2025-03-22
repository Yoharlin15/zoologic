namespace feedback_zoologic.Features.Habitats.Domain
{
    public class Habitat : Entity, IAggregateRoot
    {
        public Habitat
        (
            int habitatId,
            string nombre,
            string descripcion,
            int usuarioId,
            decimal tamaño,
            int capacidadMaxima
        )

        {
            HabitatId = habitatId;
            Nombre = nombre;
            Descripcion = descripcion;
            UsuarioId = usuarioId;
            Tamaño = tamaño;
            CapacidadMaxima = capacidadMaxima;
        }
        public int HabitatId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!; 
        public int UsuarioId { get; set; }
        public decimal Tamaño { get; set; }
        public int CapacidadMaxima { get; set; }

        
        public Habitat UpdateOrganizacionId(int habitatId)
        {
            if(habitatId != 0)
                HabitatId = habitatId;
            return this;
        }
    }
}

