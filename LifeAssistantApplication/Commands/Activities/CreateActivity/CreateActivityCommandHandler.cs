using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using MediatR;

namespace LifeAssistantApplication.Commands.Activities.CreateActivity
{
    public class CreateActivityCommandHandler: IRequestHandler<CreateActivityCommand, int>
    {
        private readonly AppDbContext _context;

        public CreateActivityCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                Name = request.Name,
                Description = request.Description
            };

            await _context.Activities.AddAsync(activity, cancellationToken);
            var id = await _context.SaveChangesAsync(cancellationToken);

            return id;
        }
    }
}
