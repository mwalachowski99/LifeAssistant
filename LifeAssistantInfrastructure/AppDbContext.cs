using Microsoft.EntityFrameworkCore;
using LifeAssistantDomain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LifeAssistantInfrastructure
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext(options)
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
                    Name = "Siłownia",
                    Description = "Trening na siłowni"
                },
                new Activity
                {
                    Id = 2,
                    Name = "Basen",
                    Description = "Pływanie"
                }
             );
        }
    }
}
