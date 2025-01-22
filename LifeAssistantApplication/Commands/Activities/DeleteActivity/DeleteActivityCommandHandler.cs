using LifeAssistantInfrastructure;
using Microsoft.EntityFrameworkCore;
using MediatR;
using LifeAssistantContracts.Exceptions;
using LifeAssistantDomain.Entities;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LifeAssistantApplication.Commands.Activities.DeleteActivity
{
    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommand, Unit>
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DeleteActivityCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var activityToDelete = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == userId, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");

            _context.Activities.Remove(activityToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
