using LifeAssistantInfrastructure;
using Microsoft.EntityFrameworkCore;
using MediatR;
using LifeAssistantContracts.Exceptions;
using LifeAssistantDomain.Entities;

namespace LifeAssistantApplication.Commands.Activities.DeleteActivity
{
    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommand, Unit>
    {
        private readonly AppDbContext _context;

        public DeleteActivityCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activityToDelete = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");

            _context.Activities.Remove(activityToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
