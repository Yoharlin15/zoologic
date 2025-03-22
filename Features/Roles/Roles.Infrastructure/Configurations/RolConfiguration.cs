using feedback_zoologic.Features.Roles.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Roles.Infraestructure.Configurations {
    internal class RolConfiguration : IEntityTypeConfiguration<RolDataModel>
    {
       public void Configure(EntityTypeBuilder<RolDataModel> entity)
       {
            entity.HasKey(e => e.RolId);
            entity.Property(e => e.Nombre).HasColumnType("text");
       }
    }
}