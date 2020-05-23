using System;
namespace circle_competitions_monitoring.Models
{
    public class Circle
    {
        public int id { get; set; }
        public int stage { get; set; }
        public int circle_num { get; set; }
        public double distance { get; set; }
        public string circle_name { get; set; }
        public int sportsman { get; set; }
        public string time_of_finish { get; set; }
        public double points { get; set; }
        public int place { get; set; }
    }
}