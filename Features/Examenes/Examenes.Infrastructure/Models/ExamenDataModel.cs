using feedback_zoologic.Features.Examenes.Infraestructure.Models;
using feedback_zoologic.Features.Necropsias.Infraestructure.Models;

namespace feedback_zoologic.Features.Examenes.Infraestructure.Models {

    public class ExamenDataModel
    {
        public int ExamenId { get; set; }
        public string Examen { get; set; } = null!;
        public virtual ICollection<NecropsiaDataModel> necropsias {get; set;} = null!;
    }
}