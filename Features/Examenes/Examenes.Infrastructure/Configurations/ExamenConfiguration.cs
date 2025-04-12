using feedback_zoologic.Features.Examenes.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Necropsias.Infraestructure.Configurations {
    internal class ExamenConfiguration : IEntityTypeConfiguration<ExamenDataModel>
    {
       public void Configure(EntityTypeBuilder<ExamenDataModel> entity)
        {
          entity.HasKey(e => e.ExamenId);

          entity.Property(e => e.Examen).HasColumnType("text");
        }
    }
}