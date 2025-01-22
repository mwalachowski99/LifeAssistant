using LifeAssistantContracts.Exceptions;
using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LifeAssistantApplication.Commands.Activities.UpdateActivity
{
    public class UpdateActivityCommandHandler : IRequestHandler<UpdateActivityCommand, Unit>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateActivityCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var activityToUpdate = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");

            activityToUpdate.Description = request.Description;
            activityToUpdate.Name = request.Name;

            _context.Activities.Update(activityToUpdate);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
