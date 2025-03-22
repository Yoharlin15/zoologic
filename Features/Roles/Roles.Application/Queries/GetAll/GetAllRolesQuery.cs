using feedback_zoologic.Features.Roles.Application.Common;
using MediatR;
using feedback_zoologic.Features.Roles.Domain;

namespace feedback_zoologic.Features.Roles.Application
{
    public class GetAllRolesQuery : IRequest<RolResponse[]>
    {
        public class GetAllRolesQueryQueryHandler  : IRequestHandler<GetAllRolesQuery, RolResponse[]>
        {
            private readonly IRolRepository rolRepository;

            public GetAllRolesQueryQueryHandler(
                IRolRepository rolRepository
                )
            {
                this.rolRepository = rolRepository;
            }

            public async Task<RolResponse[]> Handle(
                GetAllRolesQuery request,
                CancellationToken cancellationToken)
            {
                var roles = await rolRepository.Get(cancellationToken);
                return roles.Select(r => new RolResponse
                {
                    RolId = r.RolId,
                    Nombre = r.Nombre   
                    
                }).ToArray();
            }
        }
    }
}