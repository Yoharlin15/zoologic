using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Empleados.Infraestructure.Configurations {
    internal class EmpleadoConfiguration : IEntityTypeConfiguration<EmpleadoDataModel>
    {
       public void Configure(EntityTypeBuilder<EmpleadoDataModel> entity)
       {
            entity.HasKey(e => e.EmpleadoId);

            entity.Property(e => e.Nombres).HasColumnType("text");
            entity.Property(e => e.Apellidos).HasColumnType("text");
            entity.Property(e => e.Cedula).HasColumnType("text");
            entity.Property(e => e.FechaNacimiento).HasColumnType("datetime");
            entity.Property(e => e.Sexo).HasColumnType("text");
            entity.Property(e => e.Telefono).HasColumnType("text");
            entity.Property(e => e.Nacionalidad).HasColumnType("text");
            entity.Property(e => e.Direccion).HasColumnType("text");
            entity.Property(e => e.FechaContratacion).HasColumnType("datetime");

            entity.HasOne(d => d.Cargos).WithMany(p => p.Empleados)
                   .HasForeignKey(d => d.CargoId);
       }
    }
}