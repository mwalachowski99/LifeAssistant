using LifeAssistantContracts.Responses;
using LifeAssistantDomain.Entities;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeAssistantApplication.Mappings
{
    public class MappingConfig
    {
        public static void Configure()
        {
            TypeAdapterConfig<List<Activity>, GetActivitiesResponse>.NewConfig()
                .Map(dest => dest.ActivityDtos, src => src);

            TypeAdapterConfig<Activity, GetActivityByIdResponse>.NewConfig()
                .Map(dest => dest.ActivityDto, src => src);
        }
    }
}
