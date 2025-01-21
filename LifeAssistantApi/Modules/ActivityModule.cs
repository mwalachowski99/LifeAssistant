using LifeAssistantApplication.Commands.Activities.CreateActivity;
using LifeAssistantApplication.Commands.Activities.DeleteActivity;
using LifeAssistantApplication.Commands.Activities.UpdateActivity;
using LifeAssistantApplication.Queries.Activities.GetActivities;
using LifeAssistantApplication.Queries.Activities.GetActivityById;
using LifeAssistantContracts.Requests.Activities;
using MediatR;

namespace LifeAssistantApi.Modules
{
    public static class ActivityModule
    {
        public static void AddActivitiesEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/api/activities", async (IMediator mediator, CancellationToken ct) =>
            {
                var activities = await mediator.Send(new GetActivitiesQuery(), ct);
                return Results.Ok(activities);
            }).WithTags("Activities").RequireAuthorization();

            app.MapGet("/api/activities/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
            {
                var activity = await mediator.Send(new GetActivityByIdQuery(id));
                return Results.Ok(activity);

            }).WithTags("Activities");

            app.MapPost("/api/activities", async (IMediator mediator, CreateActivityRequest createActivityRequest, CancellationToken ct) =>
            {
                var command = new CreateActivityCommand(createActivityRequest.Name, createActivityRequest.Description);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Activities");

            app.MapPut("/api/activities/{id}", async (IMediator mediator, int id, UpdateActivityRequest updateActivityRequest, CancellationToken ct) =>
            {
                var command = new UpdateActivityCommand(id, updateActivityRequest.Name, updateActivityRequest.Description);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Activities");

            app.MapDelete("/api/activities/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
            {
                var command = new DeleteActivityCommand(id);
                var result= await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Activities");
        }
    }
}
