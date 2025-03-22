using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;

namespace feedback_zoologic.Features.Roles.Infraestructure.Models {

    public class RolDataModel
    {
        public int RolId { get; set; }
        public string Nombre { get; set; } = null!;
        public virtual ICollection<UsuarioDataModel> Usuarios { get; set; } = null!;
    }
}