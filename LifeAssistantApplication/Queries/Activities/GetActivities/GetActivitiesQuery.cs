using LifeAssistantContracts.Responses;
using MediatR;

namespace LifeAssistantApplication.Queries.Activities.GetActivities
{
    public record GetActivitiesQuery() : IRequest<GetActivitiesResponse>;
}
