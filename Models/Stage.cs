namespace circle_competitions_monitoring.Models {
    public class Stage {
        public int id { get; set; }
        public int result { get; set; }
        public int stage_num { get; set; }
        public string stage_name { get; set; }
        public float distance { get; set; }
        public int sportsman { get; set; }
        public float points { get; set; }
        public int place { get; set; }
    }
}