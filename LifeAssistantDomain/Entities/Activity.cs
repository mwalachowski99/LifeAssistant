namespace LifeAssistantDomain.Entities
{
    public class Activity : BaseEntity
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public required string UserId { get; set; }
    }


}
