using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Animales.Application;
using feedback_zoologic.Features.Empleados.Application.Common;

public class AnimalController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<AnimalResponse[]>> Get([FromRoute] GetAllAnimalesQuery query)
        => await Send(query);
}