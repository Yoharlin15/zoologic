public interface IDashboardQueryRepository
{
    Task<DashboardGetResponse> GetDashboard(CancellationToken cancellationToken = default);
}