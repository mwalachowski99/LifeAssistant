namespace LifeAssistantDomain.Entities
{
    public class DoneActivity : BaseEntity
    {

        public DateTime Date { get; set; }

        public int ActivityId { get; set; }

        public required Activity Activity { get; set; }

    }
}
