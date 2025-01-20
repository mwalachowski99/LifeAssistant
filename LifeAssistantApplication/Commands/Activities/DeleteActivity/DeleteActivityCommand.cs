using MediatR;

namespace LifeAssistantApplication.Commands.Activities.DeleteActivity
{
    public record DeleteActivityCommand(int Id) : IRequest<Unit>;

}
