namespace circle_competitions_monitoring.Models {
    public class User {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string e_mail { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public byte role { get; set; }
    }
}