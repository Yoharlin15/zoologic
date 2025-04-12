using feedback_zoologic.Features.Dietas.Infraestructure.Models;
using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;

namespace feedback_zoologic.Features.Dietas.Infraestructure.Models {

    public class DietaDataModel
    {
        public int DietaId { get; set; }
        public int EspecieId { get; set; }
        public string Alimento {get; set;} = null!;
        public string Cantidad {get; set;} = null!;
        public string Frecuencia {get; set;} = null!;
        public int UsuarioId {get; set;}
        public virtual EspecieDataModel especies {get; set;} = null!;
        public virtual UsuarioDataModel usuarios {get; set; } = null!;
    }
}