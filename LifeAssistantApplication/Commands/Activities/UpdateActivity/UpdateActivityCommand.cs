using MediatR;

namespace LifeAssistantApplication.Commands.Activities.UpdateActivity
{
    public record UpdateActivityCommand(int Id, string Name, string Description) : IRequest<Unit>;
    
}
