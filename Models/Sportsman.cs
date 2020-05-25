using System;
namespace circle_competitions_monitoring.Models
{
    public class Sportsman
    {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string patronymic { get; set; }
        public DateTime birthday { get; set; }
        public int? pass { get; set; }
        public int? birth_sertificate { get; set; }
        public string rank { get; set; }
        public string team { get; set; }
    }
}