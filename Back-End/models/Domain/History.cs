using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace demoproject.API.models.Domain

{
    public class History
    {
        public int Id { get; set; }
        public string Event { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
