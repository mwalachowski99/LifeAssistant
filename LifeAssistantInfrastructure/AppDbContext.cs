using Microsoft.EntityFrameworkCore;
using LifeAssistantDomain.Entities;

namespace LifeAssistantInfrastructure
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Activity> Activities => Set<Activity>();

        public DbSet<DoneActivity> DoneActivities => Set<DoneActivity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Activity>().HasData(
                new Activity
                {
                    Id = 1,
                    Name = "Trening",
                    Description = "xd"
                },
                new Activity
                {
                    Id = 2,
                    Name = "Test",
                    Description = "xd2"
                }
             );
        }
    }
}
