using System;
namespace circle_competitions_monitoring.Models {
    public class Passport {
        public int id { get; set; }
        public string series { get; set; }
        public string number { get; set; }
        public string place_of_issue { get; set; }
        public string organization_of_issue { get; set; }
        public string code_of_organization { get; set; }
        public DateTime date_of_issue { get; set; }
    }
}