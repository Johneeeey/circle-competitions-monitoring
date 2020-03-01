using System;
namespace circle_competitions_monitoring.Models {
    public class Birth_sertificate {
        public int id { get; set; }
        public string series { get; set; }
        public string number { get; set; }
        public string place_of_issue { get; set; }
        public DateTime date_of_issue { get; set; }
    }
}