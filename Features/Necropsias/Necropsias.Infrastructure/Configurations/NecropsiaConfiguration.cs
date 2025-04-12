using feedback_zoologic.Features.Necropsias.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Necropsias.Infraestructure.Configurations {
    internal class NecropsiaConfiguration : IEntityTypeConfiguration<NecropsiaDataModel>
    {
       public void Configure(EntityTypeBuilder<NecropsiaDataModel> entity)
       {
          entity.HasKey(e => e.NecropsiaId);

          entity.Property(e => e.FechaMuerte).HasColumnType("date");
          entity.Property(e => e.Procedencia).HasColumnType("text");
          entity.Property(e => e.FechaNecropsia).HasColumnType("date");
          entity.Property(e => e.Historia).HasColumnType("text");

          entity.HasOne(d => d.examenes).WithMany(p => p.necropsias)
               .HasForeignKey(d => d.ExamenId);

          entity.HasOne(d => d.usuarios).WithMany(p => p.necropsias)
               .HasForeignKey(d => d.UsuarioId);
       }
    }
}