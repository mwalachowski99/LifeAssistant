using LifeAssistantContracts.Exceptions;
using LifeAssistantContracts.Responses;
using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LifeAssistantApplication.Queries.Activities.GetActivityById
{
    public class GetActivityByIdQueryHandler : IRequestHandler<GetActivityByIdQuery, GetActivityByIdResponse>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetActivityByIdQueryHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GetActivityByIdResponse> Handle(GetActivityByIdQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken) 
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");
            
            return activity.Adapt<GetActivityByIdResponse>();
        }
    }
}
