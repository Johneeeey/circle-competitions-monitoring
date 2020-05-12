using System;
namespace circle_competitions_monitoring.Models
{
    public class Payment_Participant
    {
        public int id { get; set; }
        public int sportsman { get; set; }
        public int competition { get; set; }
        public byte[] receipt { get; set; }
        public byte status { get; set; }
    }
}