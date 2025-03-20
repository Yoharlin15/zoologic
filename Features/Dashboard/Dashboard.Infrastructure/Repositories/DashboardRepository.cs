using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

internal class DashboardRepository : IDashboardQueryRepository
{
    private readonly DashboardDbContext context;

    public DashboardRepository(DashboardDbContext db)
    {
        context = db;
    }
    public async Task<DashboardGetResponse> GetDashboard(CancellationToken cancellationToken = default)
    {

        List<TotalesDataModel> totales = await context.Totales.FromSqlRaw("EXEC DashboardGetTotales").ToListAsync();
        

        DashboardGetResponse response = new DashboardGetResponse
        {
            Totales = totales.Single(),
        };

        return response;
    }
}