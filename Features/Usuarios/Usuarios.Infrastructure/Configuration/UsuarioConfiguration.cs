using feedback_zoologic.Features.Usuarios.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Usuarios.Infraestructure.Configurations {
    internal class UsuarioConfiguration : IEntityTypeConfiguration<UsuarioDataModel>
    {
       public void Configure(EntityTypeBuilder<UsuarioDataModel> entity)
       {
            entity.HasKey(e => e.UsuarioId);

            entity.Property(e => e.NombreUsuario).HasColumnType("text");
            entity.Property(e => e.Email).HasColumnType("text");
            entity.Property(e => e.Contraseña).HasColumnType("text");

            entity.HasOne(d => d.roles).WithMany(p => p.Usuarios)
                   .HasForeignKey(d => d.RolId);
       }
    }
}