using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LifeAssistantApplication.Commands.Activities.CreateActivity
{
    public class CreateActivityCommandHandler: IRequestHandler<CreateActivityCommand, int>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateActivityCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<int> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var activity = new Activity
            {
                Name = request.Name,
                Description = request.Description,
                UserId = userId
            };

            await _context.Activities.AddAsync(activity, cancellationToken);
            var id = await _context.SaveChangesAsync(cancellationToken);

            return id;
        }
    }
}
