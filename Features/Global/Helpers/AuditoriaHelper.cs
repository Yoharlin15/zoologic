using System.Reflection;
using feedback_zoologic.Features.Global.Application;

namespace feedback_zoologic.Features.Global.Infrastructure
{
    public static class AuditoriaHelper
    {
        public static void AsignarPropiedadesAuditoria<T>(T objeto, ICurrentUserService currentUserService) where T : class
        {
            var tipo = typeof(T);

            PropertyInfo creadoPorProp = tipo.GetProperty("CreadoPor")!;
            PropertyInfo modificadoPorProp = tipo.GetProperty("ModificadoPor")!;
            PropertyInfo fechaCreacionProp = tipo.GetProperty("FechaCreacion")!;
            PropertyInfo fechaModificacionProp = tipo.GetProperty("FechaModificacion")!;

            if (creadoPorProp != null && modificadoPorProp != null && fechaCreacionProp != null && fechaModificacionProp != null)
            {
                if ((int?)creadoPorProp.GetValue(objeto) == 0)
                {
                    creadoPorProp.SetValue(objeto, currentUserService.UsuarioId);
                    fechaCreacionProp.SetValue(objeto, DateTime.UtcNow);
                }

                else {
                    modificadoPorProp.SetValue(objeto, currentUserService.UsuarioId);
                    fechaModificacionProp.SetValue(objeto, DateTime.UtcNow);
                }
            }
        }
    }
}
