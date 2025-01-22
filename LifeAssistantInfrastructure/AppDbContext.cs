using Microsoft.EntityFrameworkCore;
using LifeAssistantDomain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LifeAssistantInfrastructure
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<Activity> Activities => Set<Activity>();

        public DbSet<DoneActivity> DoneActivities => Set<DoneActivity>();

    }
}
