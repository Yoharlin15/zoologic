using feedback_zoologic.Application.Commands.Create;
using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Habitats.Application;
using feedback_zoologic.Features.Habitats.Application.Common;
using feedback_zoologic.Features.Empleados.Application;

public class HabitatController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<HabitatResponse[]>> Get([FromRoute] GetAllHabitatsQuery query)
        => await Send(query);

    [HttpPost]
    public async Task<ActionResult<CreateEmpleadoResponse>> Create(CreateEmpleadoCommand command)
        => await Send(command);
}