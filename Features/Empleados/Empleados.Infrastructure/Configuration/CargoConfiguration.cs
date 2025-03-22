using feedback_zoologic.Features.Empleados.Infraestructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace feedback_zoologic.Features.Empleados.Infraestructure.Configurations {
    internal class CargoConfiguration : IEntityTypeConfiguration<CargoDataModel>
    {
       public void Configure(EntityTypeBuilder<CargoDataModel> entity)
       {
            entity.HasKey(e => e.CargoId);
            entity.Property(e => e.Cargo).HasColumnType("text");
            
       }
    }
};