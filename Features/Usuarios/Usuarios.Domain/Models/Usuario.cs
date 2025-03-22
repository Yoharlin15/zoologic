namespace feedback_zoologic.Features.Usuarios.Domain
{
    public class Usuario : Entity, IAggregateRoot
    {
        public Usuario
        (
            int usuarioId,
            string nombreUsuario,
            string email,
            string contraseña,
            int rolId
        )
        
        {
            UsuarioId = usuarioId;
            NombreUsuario = nombreUsuario;
            Email = email;
            Contraseña = contraseña;
            RolId = rolId;
        }

        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Contraseña { get; set; } = null!;
        public int RolId { get; set; }
        public string RolNombre { get; set; } = null!;  
        
        public Usuario UpdateOrganizacionId(int usuarioId)
        {
            if(usuarioId != 0)
                UsuarioId = usuarioId;
            return this;
        }
    }
}