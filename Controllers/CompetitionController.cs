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
    public class CompetitionController: Controller
    {
        private DataContext db;
        public CompetitionController(DataContext context)
        {
            this.db=context;
        }
        
        [HttpGet]
        public List<Competition_type> GetCompetitionTypes()
        {
            return db.Competition_Type.ToList();
        }
        public List<Competition> GetCompetitions()
        {
            return db.Competition.ToList();
        }
    }
}