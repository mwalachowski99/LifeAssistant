using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using LifeAssistantInfrastructure;
using LifeAssistantApplication;
using LifeAssistantApi.Modules;
using LifeAssistantApi.Handlers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173");
    });
});
builder.Services.AddApplication();
builder.Services.AddExceptionHandler<ExceptionHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseExceptionHandler(_ => { });
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

app.AddActivitiesEndpoints();
app.Run();
