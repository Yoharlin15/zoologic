using feedback_zoologic.Features.Animales.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Animales.Infraestructure.Configurations {
    internal class AnimalConfiguration : IEntityTypeConfiguration<AnimalDataModel>
    {
       public void Configure(EntityTypeBuilder<AnimalDataModel> entity)
       {
            entity.HasKey(e => e.AnimalId);
            entity.Property(e => e.Sexo).HasColumnType("text").HasMaxLength(20);
            entity.Property(e => e.Observaciones).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.FechaNacimiento).HasColumnType("datetime");
            entity.Property(e => e.ZonaId).HasColumnType("int");
            entity.Property(e => e.CreadoPor).HasColumnType("int");

            entity.HasOne(d => d.especies).WithMany(p => p.animales)
                   .HasForeignKey(d => d.EspecieId);
       }
    }
}