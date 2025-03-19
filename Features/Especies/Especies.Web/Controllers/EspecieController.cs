using feedback_zoologic.Features.Especies.Application;
using feedback_zoologic.Features.Especies.Application.Common;
using feedback_zoologic.Application.Commands.Create;
using Microsoft.AspNetCore.Mvc;
using feedback_zoologic.Features.Especies.Application.Commands.Update;

public class EspecieController : ApiController 
{
    [HttpGet]
    public async Task<ActionResult<EspecieResponse[]>> Get([FromRoute] GetAllEspeciesQuery query)
        => await Send(query);

    [HttpPost]
    public async Task<ActionResult<CreateEspecieResponse>> Create(CreateEspecieCommand command)
        => await Send(command);

    [HttpPut]
    [Route(Id)]
    public async Task<ActionResult<UpdateEspecieResponse>> Update(int Id, UpdateEspecieCommand command)
        => await Send(command);
}