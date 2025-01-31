using LifeAssistantContracts.Responses;
using MediatR;

namespace LifeAssistantApplication.Commands.Activities.CreateActivity
{
   public record CreateActivityCommand(string Name, string Description) : IRequest<CreateActivityResponse>;
}
