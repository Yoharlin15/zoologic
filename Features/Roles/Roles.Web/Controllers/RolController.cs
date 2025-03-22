using feedback_zoologic.Features.Roles.Application;
using feedback_zoologic.Features.Roles.Application.Common;
using feedback_zoologic.Application.Commands.Create;
using Microsoft.AspNetCore.Mvc;

public class RolController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<RolResponse[]>> Get([FromRoute] GetAllRolesQuery query)
        => await Send(query);
}