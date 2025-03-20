using AutoMapper;
using MediatR;


public class DashboardGetQuery : IRequest<DashboardGetResponse>
{
    public class DashboardGetQueryHandler : IRequestHandler<DashboardGetQuery, DashboardGetResponse>
    {
        private readonly IDashboardQueryRepository dashboardRepository; 

        public DashboardGetQueryHandler(
            IDashboardQueryRepository dashboardRepository
            )
        {
            this.dashboardRepository = dashboardRepository;
        }

        public async Task<DashboardGetResponse> Handle(
            DashboardGetQuery request,
            CancellationToken cancellationToken)
        {
            var dashboard = await dashboardRepository.GetDashboard(cancellationToken);

            return dashboard;
        }
    }
}


