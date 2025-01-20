
using FluentValidation;
using LifeAssistantDomain.Entities;

namespace LifeAssistantApplication.Queries.Activities.GetActivityById
{
    public class GetActivityByIdQueryValidator : AbstractValidator<GetActivityByIdQuery>
    {
        public GetActivityByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Activity.Id)} cannot be empty");
        }
    }
}
