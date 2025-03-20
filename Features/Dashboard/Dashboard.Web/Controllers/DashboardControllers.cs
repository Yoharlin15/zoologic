

using Microsoft.AspNetCore.Mvc;

public class DashboardController : ApiController 
{

    [HttpGet]
    public async Task<ActionResult<DashboardGetResponse>> Get([FromRoute] DashboardGetQuery  query)
        => await Send(query);

}