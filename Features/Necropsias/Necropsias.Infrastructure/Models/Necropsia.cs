using feedback_zoologic.Features.Especies.Infraestructure.Models;
using feedback_zoologic.Features.Examenes.Infraestructure.Models;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using feedback_zoologic.Features.Usuarios.Infraestructure.Models;

namespace feedback_zoologic.Features.Necropsias.Infraestructure.Models {

    public class NecropsiaDataModel
    {
        public int NecropsiaId { get; set; }
        public int EspecieId { get; set; }
        public DateTime FechaMuerte {get; set;}
        public string Procedencia {get; set;} = null!;
        public DateTime FechaNecropsia { get; set; }
        public string Historia {get; set; } = null!;
        public int ExamenId {get; set;} 
        public int UsuarioId {get; set;}
        public virtual EspecieDataModel especies { get; set; } = null!;
        public virtual ExamenDataModel examenes {get; set;} = null!;
        public virtual UsuarioDataModel usuarios {get; set;} = null!;
    }
}
