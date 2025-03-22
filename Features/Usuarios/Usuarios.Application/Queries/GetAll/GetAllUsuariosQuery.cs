using MediatR;
using feedback_zoologic.Features.Usuarios.Application.Common;
using feedback_zoologic.Features.Usuarios.Domain;

namespace feedback_zoologic.Features.Usuarios.Application
{
    public class GetAllUsuariosQuery : IRequest<UsuarioResponse[]>
    {
        public class GetAllUsuariosQueryQueryHandler  : IRequestHandler<GetAllUsuariosQuery, UsuarioResponse[]>
        {
            private readonly IUsuarioRepository usuarioRepository;

            public GetAllUsuariosQueryQueryHandler(
                IUsuarioRepository usuarioRepository
                )
            {
                this.usuarioRepository = usuarioRepository;
            }

            public async Task<UsuarioResponse[]> Handle(
                GetAllUsuariosQuery request,
                CancellationToken cancellationToken)
            {
                var usuarios = await usuarioRepository.Get(cancellationToken);
                return usuarios.Select(r => new UsuarioResponse
                {
                    UsuarioId = r.UsuarioId,
                    NombreUsuario = r.NombreUsuario,
                    Email = r.Email,
                    Contraseña = r.Contraseña,
                    RolId = r.RolId,
                    RolNombre = r.RolNombre
                }).ToArray();
            }
        }
    }
}