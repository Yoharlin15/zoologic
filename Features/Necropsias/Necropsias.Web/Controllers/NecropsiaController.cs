using feedback_zoologic.Features.Necropsias.Application;
using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Necropsias.Application.Common;

public class NecropsiaController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<NecropsiaResponse[]>> Get([FromRoute] GetAllNecropsiasQuery query)
        => await Send(query);
}