namespace feedback_zoologic.Features.Roles.Domain
{
    public class Rol : Entity, IAggregateRoot
    {
        public Rol
        (
            int rolId,
            string nombre
        )
        {
            RolId = rolId;
            Nombre = nombre;
        }
        public int RolId { get; set; }
        public string Nombre { get; set; } = null!;
       

        // Implementación de Entity
        public int Id => RolId;
        
        public Rol UpdateOrganizacionId(int rolId)
        {
            if(rolId != 0)
                RolId = rolId;
            return this;
        }
    }
}

