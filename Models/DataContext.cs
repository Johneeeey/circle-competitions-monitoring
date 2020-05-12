using Microsoft.EntityFrameworkCore;
namespace circle_competitions_monitoring.Models {
    public class DataContext : DbContext {
        public DbSet<Birth_sertificate> Birth_Sertificate { get; set; }
        public DbSet<Circle> Circle { get; set; }
        public DbSet<Competition_type> Competition_Type { get; set; }
        public DbSet<Competition> Competition { get; set; }
        public DbSet<Passport> Passport { get; set; }
        public DbSet<Payment_Participant> Payment_Participant { get; set; }
        public DbSet<Registered_Sportsman> Registered_Sportsman { get; set; }
        public DbSet<Result> Result { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Sportsman> Sportsman { get; set; }
        public DbSet<Stage> Stage { get; set; }
        public DbSet<User> User { get; set; }

        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
    }
}