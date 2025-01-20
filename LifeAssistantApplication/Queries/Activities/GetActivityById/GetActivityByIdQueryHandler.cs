using LifeAssistantContracts.Exceptions;
using LifeAssistantContracts.Responses;
using LifeAssistantDomain.Entities;
using LifeAssistantInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LifeAssistantApplication.Queries.Activities.GetActivityById
{
    public class GetActivityByIdQueryHandler : IRequestHandler<GetActivityByIdQuery, GetActivityByIdResponse>
    {
        private readonly AppDbContext _context;
        public GetActivityByIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<GetActivityByIdResponse> Handle(GetActivityByIdQuery request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) 
                ?? throw new NotFoundException($"{nameof(Activity)} with {nameof(Activity.Id)}: {request.Id} was not found in database");
            
            return activity.Adapt<GetActivityByIdResponse>();
        }
    }
}
