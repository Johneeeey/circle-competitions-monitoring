using Microsoft.AspNetCore.Mvc;
using circle_competitions_monitoring.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;

namespace circle_competitions_monitoring.Controllers
{
    public class SportsmanController : Controller
    {
        private DataContext db;
        public SportsmanController(DataContext context)
        {
            this.db = context;
        }
        [HttpPost]
        [Authorize]
        public Payment_Participant AddPaymentParticipant([FromBody] Payment_Participant participant)
        {
            Payment_Participant payment = db.Payment_Participant.FirstOrDefault(p =>
                p.competition == participant.competition && p.sportsman == participant.sportsman);
            if (payment == null)
            {
                db.Payment_Participant.Add(participant);
                db.SaveChanges();
                return participant;
            }
            else
            {
                return payment;
            }
        }
        [HttpPost]
        [Authorize]
        public Sportsman AddSportsman([FromBody] Sportsman sportsman)
        {
            Sportsman sp = db.Sportsman.FirstOrDefault(s => s.surname == sportsman.surname
              && s.name == sportsman.name
              && s.patronymic == sportsman.patronymic
              && (s.pass == sportsman.pass || s.birth_sertificate == sportsman.birth_sertificate)
              && s.birthday == sportsman.birthday);
            if (sp == null)
            {
                db.Sportsman.Add(sportsman);
                db.SaveChanges();
                Registered_Sportsman registered = new Registered_Sportsman()
                {
                    sportsman = sportsman.id,
                    user = int.Parse(User.Identity.Name)
                };
                db.Registered_Sportsman.Add(registered);
                db.SaveChanges();
                return sportsman;
            }
            else
            {
                Registered_Sportsman registered = db.Registered_Sportsman.FirstOrDefault(rS =>
                    rS.user == int.Parse(User.Identity.Name) && rS.sportsman == sp.id);
                if (registered == null)
                {
                    Registered_Sportsman reg = new Registered_Sportsman()
                    {
                        sportsman = sp.id,
                        user = int.Parse(User.Identity.Name)
                    };
                    db.Registered_Sportsman.Add(reg);
                }
                db.SaveChanges();
                return sp;
            }
        }

        [HttpPost]
        [Authorize]
        public Passport AddPassport([FromBody] Passport passport)
        {
            Passport pass = db.Passport.FirstOrDefault(p =>
                p.series == passport.series && p.number == passport.number);
            if (pass == null)
            {
                db.Passport.Add(passport);
                db.SaveChanges();
                return passport;
            }
            else
            {
                return pass;
            }
        }

        [HttpPost]
        [Authorize]
        public Birth_sertificate AddBirthSertificate([FromBody] Birth_sertificate sertificate)
        {
            Birth_sertificate sert = db.Birth_Sertificate.FirstOrDefault(bS =>
                bS.series == sertificate.series && bS.number == sertificate.number);
            if (sert == null)
            {
                db.Birth_Sertificate.Add(sertificate);
                db.SaveChanges();
                return sertificate;
            }
            else
            {
                return sert;
            }
        }
    }
}