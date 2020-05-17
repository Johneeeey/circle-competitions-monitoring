namespace circle_competitions_monitoring.Models
{
    public class Stage_Info
    {
        public int id { get; set; }
        public int competition { get; set; }
        public int stage_number { get; set; }
        public int circle_count { get; set; }
        public double one_circle_distance { get; set; }
        public string comment { get; set; }
    }
}