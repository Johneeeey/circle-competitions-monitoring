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
    public class ResultController : Controller
    {
        private DataContext db;
        public ResultController(DataContext context)
        {
            this.db = context;
        }

        [HttpGet]
        public List<Result> GetResults()
        {
            return this.db.Result.OrderBy(r => r.place).ToList();
        }
        [HttpGet]
        public List<Stage> GetStages()
        {
            return this.db.Stage.OrderBy(s => s.place).ToList();
        }
        [HttpGet]
        public List<Circle> GetCircles()
        {
            return this.db.Circle.OrderBy(c => c.place).ToList();
        }
    }
}