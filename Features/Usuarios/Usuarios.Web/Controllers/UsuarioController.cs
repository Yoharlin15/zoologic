using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Usuarios.Application;
using feedback_zoologic.Features.Usuarios.Application.Common;

public class UsuarioController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<UsuarioResponse[]>> Get([FromRoute] GetAllUsuariosQuery query)
        => await Send(query);
}