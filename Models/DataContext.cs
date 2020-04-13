using Microsoft.EntityFrameworkCore;
namespace circle_competitions_monitoring.Models {
    public class DataContext : DbContext {
        public DbSet<Birth_sertificate> Birth_Sertificates { get; set; }
        public DbSet<Circle> Circles { get; set; }
        public DbSet<Competition_type> Competition_Type { get; set; }
        public DbSet<Competition> Competition { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<Payment_Participant> Payment_Participants { get; set; }
        public DbSet<Registered_Sportsman> Registered_Sportsmen { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Sportsman> Sportsmen { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<User> User { get; set; }

        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
    }
}