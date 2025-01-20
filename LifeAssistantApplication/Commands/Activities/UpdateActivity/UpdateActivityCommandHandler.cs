using LifeAssistantContracts.Exceptions;
using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LifeAssistantApplication.Commands.Activities.UpdateActivity
{
    public class UpdateActivityCommandHandler : IRequestHandler<UpdateActivityCommand, Unit>
    {
        private readonly AppDbContext _context;

        public UpdateActivityCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {
            var activityToUpdate = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");

            activityToUpdate.Description = request.Description;
            activityToUpdate.Name = request.Name;

            _context.Activities.Update(activityToUpdate);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
