using feedback_zoologic.Features.Dietas.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Dietas.Infraestructure.Configurations {
    internal class DietaConfiguration : IEntityTypeConfiguration<DietaDataModel>
    {
       public void Configure(EntityTypeBuilder<DietaDataModel> entity)
       {
            entity.HasKey(e => e.DietaId);

            entity.Property(e => e.Alimento).HasColumnType("text");
            entity.Property(e => e.Cantidad).HasColumnType("text");
            entity.Property(e => e.Frecuencia).HasColumnType("text");

            entity.HasOne(d => d.usuarios).WithMany(p => p.dietas)
                .HasForeignKey(d => d.UsuarioId);
       }
    }
}