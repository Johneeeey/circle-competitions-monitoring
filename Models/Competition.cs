using System;
namespace circle_competitions_monitoring.Models {
    public class Competition {
        public int id { get; set; }
        public DateTime date_of_start { get; set; }
        public DateTime date_of_end { get; set; }
        public byte type { get; set; }
        public decimal lng { get; set; }
        public decimal lat { get; set; }
        public string street { get; set; }
        public string house_num { get; set; }
        public string building { get; set; }
        public string office_of_flat { get; set; }
        public string summary_addr { get; set; }
        public string organizer { get; set; }
        public decimal entry_fee { get; set; }
        public byte age_limit { get; set; }
    }
}