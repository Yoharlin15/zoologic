using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Empleados.Infraestructure.Configurations {
    internal class EmpleadoConfiguration : IEntityTypeConfiguration<EmpleadoDataModel>
    {
       public void Configure(EntityTypeBuilder<EmpleadoDataModel> entity)
       {
            entity.HasKey(e => e.EmpleadoId);
            entity.Property(e => e.Nombres).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Apellidos).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Cedula).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.FechaNacimiento).HasColumnType("datetime");
            entity.Property(e => e.Sexo).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Telefono).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Nacionalidad).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.Direccion).HasColumnType("text").HasMaxLength(255);
            entity.Property(e => e.FechaLlegada).HasColumnType("datetime");
       }
    }
}