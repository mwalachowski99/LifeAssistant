using LifeAssistantContracts.Responses;
using LifeAssistantInfrastructure;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LifeAssistantApplication.Queries.Activities.GetActivities
{
    public class GetActivitiesQueryHandler : IRequestHandler<GetActivitiesQuery, GetActivitiesResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetActivitiesQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetActivitiesResponse> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var activities = await _context.Activities.Where(a => a.UserId == userId).ToListAsync(cancellationToken);

            return activities.Adapt<GetActivitiesResponse>();
        }
    }
}
