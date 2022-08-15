namespace REACT
{
    public class Consult
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string RFE { get; set; } = string.Empty;
        public int ? conceptId { get; set; }
    }
}