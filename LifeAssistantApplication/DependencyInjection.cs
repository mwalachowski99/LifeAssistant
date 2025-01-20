﻿using FluentValidation;
using LifeAssistantApplication.Behaviors;
using LifeAssistantApplication.Mappings;
using Mapster;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;


namespace LifeAssistantApplication
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(cf =>
            {
                cf.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());

                cf.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });

            MappingConfig.Configure();
            var config = TypeAdapterConfig.GlobalSettings;
            config.Scan(Assembly.GetExecutingAssembly());
            services.AddSingleton(config);

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
