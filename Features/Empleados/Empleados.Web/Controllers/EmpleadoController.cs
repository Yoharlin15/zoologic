using feedback_zoologic.Application.Commands.Create;
using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Empleados.Application;
using feedback_zoologic.Features.Empleados.Application.Common;

public class EmpleadoController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<EmpleadoResponse[]>> Get([FromRoute] GetAllEmpleadosQuery query)
        => await Send(query);

    [HttpPost]
    public async Task<ActionResult<CreateEmpleadoResponse>> Create(CreateEmpleadoCommand command)
        => await Send(command);
}