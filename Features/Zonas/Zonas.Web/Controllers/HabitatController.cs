using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Zonas.Application.Common;
using feedback_zoologic.Features.Zonas.Application;

public class ZonaController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<ZonaResponse[]>> Get([FromRoute] GetAllZonasQuery query)
        => await Send(query);
}