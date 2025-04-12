using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Dietas.Application;
using feedback_zoologic.Features.Usuarios.Application.Common;

public class DietaController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<DietaResponse[]>> Get([FromRoute] GetAllDietasQuery query)
        => await Send(query);
}