using System;
namespace circle_competitions_monitoring.Models {
    public class Payment_Participant {
        public int id { get; set; }
        public int sportsman { get; set; }
        public int competition { get; set; }
        public decimal payment_amount { get; set; }
        public DateTime payment_date { get; set; }
        public string payment_type { get; set; }
    }
}