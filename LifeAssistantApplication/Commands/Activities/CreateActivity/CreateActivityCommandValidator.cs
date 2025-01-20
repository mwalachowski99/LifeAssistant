using FluentValidation;
using LifeAssistantDomain.Entities;

namespace LifeAssistantApplication.Commands.Activities.CreateActivity
{
    public class CreateActivityCommandValidator : AbstractValidator<CreateActivityCommand>
    {
        public CreateActivityCommandValidator()
        {
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
