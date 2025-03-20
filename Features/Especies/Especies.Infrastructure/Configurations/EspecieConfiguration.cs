using feedback_zoologic.Features.Especies.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Especies.Infraestructure.Configurations {
    internal class EspeciesConfiguration : IEntityTypeConfiguration<EspecieDataModel>
    {
       public void Configure(EntityTypeBuilder<EspecieDataModel> entity)
       {
            entity.HasKey(e => e.EspecieId);
            entity.Property(e => e.NombreCientifico).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.NombreComun).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Familia).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Clase).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Sexo).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Peso).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.FechaLlegada).HasColumnType("datetime");
            entity.Property(e => e.Procedencia).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Observaciones).HasColumnType("text").HasMaxLength(255);
       }
    }
}