using FluentValidation;
using LifeAssistantDomain.Entities;

namespace LifeAssistantApplication.Commands.Activities.UpdateActivity
{
    public class UpdateActivityCommandValidator: AbstractValidator<UpdateActivityCommand>
    {
        public UpdateActivityCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Activity.Id)} cannot be empty");

            RuleFor(x => x.Name)
               .NotEmpty()
               .WithMessage($"{nameof(Activity.Name)} cannot be empty")
               .MaximumLength(30)
               .WithMessage($"{nameof(Activity.Name)} cannot be longer than 30 characters");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage($"{nameof(Activity.Description)} cannot be empty")
                .MaximumLength(500)
                .WithMessage($"{nameof(Activity.Description)} cannot be longer than 500 characters");
        }
    }
}
