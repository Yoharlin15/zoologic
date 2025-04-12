using feedback_zoologic.Features.Tratamientos.Application;
using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Especies.Application.Common;

public class TratamientoController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<TratamientoResponse[]>> Get([FromRoute] GetAllTratamientosQuery query)
        => await Send(query);
}