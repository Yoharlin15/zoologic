using feedback_zoologic.Features.Tratamientos.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Tratamientos.Infraestructure.Configurations {
    internal class TratamientosConfiguration : IEntityTypeConfiguration<TratamientoDataModel>
    {
       public void Configure(EntityTypeBuilder<TratamientoDataModel> entity)
       {
            entity.HasKey(e => e.TratamientoId);
            entity.Property(e => e.NombreTratamiento).HasColumnType("text").HasMaxLength(255);
            
            entity.Property(e => e.FechaEntrada).HasColumnType("datetime");
            entity.Property(e => e.FechaSalida).HasColumnType("datetime");
            entity.Property(e => e.UsuarioId).HasColumnType("int");
            entity.Property(e => e.Razon).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Procedencia).HasColumnType("text").HasMaxLength(255);
                   
            entity.HasOne(d => d.zonas).WithMany(p => p.tratamientos)
                .HasForeignKey(d => d.HabitatId);
            
            entity.HasOne(d => d.usuarios).WithMany(p => p.tratamientos)
                .HasForeignKey(d => d.UsuarioId);
       }
    }
}