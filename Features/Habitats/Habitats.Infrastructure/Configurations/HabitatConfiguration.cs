using feedback_zoologic.Features.Habitats.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Habitats.Infraestructure.Configurations {
    internal class HabitatConfiguration : IEntityTypeConfiguration<HabitatDataModel>
    {
       public void Configure(EntityTypeBuilder<HabitatDataModel> entity)
       {
            entity.HasKey(e => e.HabitatId);
            entity.Property(e => e.NombreHabitat).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Tamaño).HasColumnType("decimal");
            entity.Property(e => e.CapacidadMaxima).HasColumnType("int");

            entity.HasOne(d => d.usuarios).WithMany(p => p.habitats)
                   .HasForeignKey(d => d.UsuarioId);
       }
    }
}