using FluentValidation;
using LifeAssistantDomain.Entities;

namespace LifeAssistantApplication.Commands.Activities.DeleteActivity
{
    public class DeleteActivityCommandValidator : AbstractValidator<DeleteActivityCommand>
    {
        public DeleteActivityCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage($"{nameof(Activity.Id)} cannot be empty");
        }
    }
}
