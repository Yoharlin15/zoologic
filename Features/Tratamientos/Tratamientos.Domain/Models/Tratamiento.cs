namespace feedback_zoologic.Features.Tratamientos.Domain
{
    public class Tratamiento : Entity, IAggregateRoot
    {
        public Tratamiento
        (
            int tratamientoId,
            string nombreTratamiento,
            int especieId,
            string zonaId,
            DateTime fechaEntrada,
            DateTime fechaSalida,
            int usuarioId,
            string razon,
            string procedencia
        )
        {
            TratamientoId = tratamientoId;
            NombreTratamiento = nombreTratamiento;
            EspecieId = especieId;
            ZonaId = zonaId;
            FechaEntrada = fechaEntrada;
            FechaSalida = fechaSalida;
            UsuarioId = usuarioId;
            Razon = razon;
            Procedencia = procedencia;
        }
        
        public int TratamientoId { get; set; }
        public string NombreTratamiento { get; set; } = null!;
        public int EspecieId { get; set; }
        public string NombreComun { get; set; } = null!;
        public string ZonaId { get; set; } = null!;
        public string NombreZona { get; set; } = null!;
        public DateTime FechaEntrada { get; set; }
        public DateTime FechaSalida { get; set; }
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set;} = null!;
        public string Razon { get; set; } = null!;
        public string Procedencia {get ; set;} = null!;
        
        public Tratamiento UpdateOrganizacionId(int tratamientoId)
        {
            if(tratamientoId != 0)
                TratamientoId = tratamientoId;
            return this;
        }
    }
}

