using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using circle_competitions_monitoring.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Drawing;
using Microsoft.AspNetCore.Http;

namespace circle_competitions_monitoring.Controllers
{
    public class SportsmanController : Controller
    {
        private DataContext db;
        public SportsmanController(DataContext context)
        {
            this.db = context;
        }
        [HttpGet]
        public List<Sportsman> GetSportsmen()
        {
            return this.db.Sportsman.ToList();
        }
        [HttpPost]
        [Authorize]
        public Passport GetPassport(int passId)
        {
            return db.Passport.FirstOrDefault(p => p.id == passId);
        }
        [HttpPost]
        [Authorize]
        public Birth_sertificate GetBirthSertificate(int sertId)
        {
            return db.Birth_Sertificate.FirstOrDefault(b => b.id == sertId);
        }
        [HttpPost]
        [Authorize]
        [Consumes("multipart/form-data")]
        public IActionResult AddReceiptToParticipant([FromForm] FileInputModel receipt, int participant_id)
        {
            Payment_Participant participant = db.Payment_Participant.FirstOrDefault(p => p.id == participant_id);
            if (receipt.File == null || receipt.File.Length == 0)
            {
                return BadRequest();
            }
            else
            {
                using (var memoryStream = new MemoryStream())
                {
                    receipt.File.CopyToAsync(memoryStream);
                    using (var img = Image.FromStream(memoryStream))
                    {
                        using (var imgStream = new MemoryStream())
                        {
                            img.Save(imgStream, img.RawFormat);
                            if (imgStream.ToArray().Length > 0)
                                participant.receipt = imgStream.ToArray();
                            else
                                participant.receipt = null;
                            db.Update(participant);
                            db.SaveChanges();
                            return Ok(participant);
                        }
                    }
                }
            }
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
                db.Update(payment);
                db.SaveChanges();
                return payment;
            }
        }
        [HttpPost]
        [Authorize]
        public List<Payment_Participant> UpdatePaymentParticipantStatus([FromBody] List<Payment_Participant> payments)
        {
            foreach (Payment_Participant payment in payments)
            {
                db.Update(payment);
            }
            db.SaveChanges();
            return payments;
        }
        [HttpPost]
        [Authorize]
        public Sportsman AddSportsman([FromBody] Sportsman sportsman)
        {
            Sportsman sp = db.Sportsman.FirstOrDefault(s => s.surname == sportsman.surname
              && s.name == sportsman.name
              && s.patronymic == sportsman.patronymic
              && (s.pass == sportsman.pass || s.birth_sertificate == sportsman.birth_sertificate)
              && s.birthday.ToShortDateString() == sportsman.birthday.ToShortDateString());
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
                db.Update(sp);
                db.SaveChanges();
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
                db.Update(pass);
                db.SaveChanges();
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
                db.Update(sert);
                db.SaveChanges();
                return sert;
            }
        }
    }
}