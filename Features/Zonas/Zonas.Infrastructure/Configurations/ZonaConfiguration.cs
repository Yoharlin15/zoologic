using feedback_zoologic.Features.Zonas.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Zonas.Infraestructure.Configurations {
    internal class ZonaConfiguration : IEntityTypeConfiguration<ZonaDataModel>
    {
       public void Configure(EntityTypeBuilder<ZonaDataModel> entity)
       {
            entity.HasKey(e => e.ZonaId);
            entity.Property(e => e.NombreZona).HasColumnType("text").HasMaxLength(255);
       }
    }
}