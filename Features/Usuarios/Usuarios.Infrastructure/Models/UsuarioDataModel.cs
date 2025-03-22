using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using feedback_zoologic.Features.Roles.Infraestructure.Models;
using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
// using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;

namespace feedback_zoologic.Features.Usuarios.Infraestructure.Models {

    public class UsuarioDataModel
    {
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Contraseña { get; set; } = null!;
        public int RolId { get; set; }
        public virtual RolDataModel roles { get; set; } = null!;
        public virtual ICollection<HabitatDataModel> habitats { get; set; } = null!;
        public virtual ICollection<TratamientoDataModel> tratamientos { get; set; } = null!;
    }
}