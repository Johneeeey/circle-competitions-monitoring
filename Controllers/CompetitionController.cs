using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using circle_competitions_monitoring.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace circle_competitions_monitoring.Controllers
{
    public class CompetitionController : Controller
    {
        private DataContext db;
        public CompetitionController(DataContext context)
        {
            this.db = context;
        }
        [HttpGet]
        public List<Payment_Participant> GetParticipants(int id)
        {
            var participants = this.db.Payment_Participant.ToList();
            return participants.Where(p => p.competition == id && p.status == 4).ToList();
        }
        [HttpGet]
        public List<Stage_Info> GetStagesInfo(int id)
        {
            return this.db.Stage_Info.Where(sI => sI.competition == id).ToList();
        }
        [HttpGet]
        public List<Competition_type> GetCompetitionTypes()
        {
            return db.Competition_Type.ToList();
        }
        [HttpGet]
        public List<Request_Status> GetStatuses()
        {
            return db.Request_Status.ToList();
        }
        [HttpGet]
        public List<Competition> GetCompetitions()
        {
            return db.Competition.ToList();
        }
        [HttpPost]
        [Authorize]
        public Competition SaveCompetition([FromBody] Competition competition)
        {
            if (competition.id == 0)
            {
                db.Competition.Add(competition);
            }
            else
            {
                db.Update(competition);
            }
            db.SaveChanges();
            return competition;
        }
        [HttpGet]
        public List<Stage_Info> GetCompetitionStagesInfo(int id)
        {
            return db.Stage_Info.Where(s => s.competition == id).ToList();
        }
        [HttpPost]
        [Authorize]
        public List<Stage_Info> SaveStagesInfo([FromBody] List<Stage_Info> info)
        {
            foreach (Stage_Info stage in info)
            {
                if (stage.id == 0)
                {
                    db.Stage_Info.Add(stage);
                }
                else
                {
                    db.Update(stage);
                }
            }
            db.SaveChanges();
            return info;
        }
    }
}