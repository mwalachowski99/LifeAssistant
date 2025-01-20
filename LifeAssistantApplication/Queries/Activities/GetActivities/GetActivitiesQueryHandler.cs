using LifeAssistantContracts.Responses;
using LifeAssistantInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LifeAssistantApplication.Queries.Activities.GetActivities
{
    public class GetActivitiesQueryHandler : IRequestHandler<GetActivitiesQuery, GetActivitiesResponse>
    {
        private readonly AppDbContext _context;
        public GetActivitiesQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<GetActivitiesResponse> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);

            return activities.Adapt<GetActivitiesResponse>();
        }
    }
}
