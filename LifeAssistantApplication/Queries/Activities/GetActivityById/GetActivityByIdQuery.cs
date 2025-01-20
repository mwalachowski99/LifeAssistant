using LifeAssistantContracts.Responses;
using MediatR;

namespace LifeAssistantApplication.Queries.Activities.GetActivityById
{
   public record GetActivityByIdQuery(int Id) : IRequest<GetActivityByIdResponse>;
}
