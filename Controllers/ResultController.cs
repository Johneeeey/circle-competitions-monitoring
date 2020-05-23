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
        [HttpPost]
        [Authorize]
        public Result SaveResult([FromBody] Result result)
        {
            if (result.id == 0)
            {
                db.Result.Add(result);
                db.SaveChanges();
            }
            else
            {
                db.Update(result);
                db.SaveChanges();
            }
            List<Result> results = this.RecalculateResults(
                db.Result.Where(r => r.competition == result.competition).ToList()
                );
            foreach (Result res in results)
            {
                db.Update(res);
                db.SaveChanges();
            }
            return results.FirstOrDefault(r => r.sportsman == result.sportsman);
        }
        [HttpPost]
        [Authorize]
        public Stage SaveStage([FromBody] Stage stage)
        {
            if (stage.id == 0)
            {
                db.Stage.Add(stage);
                db.SaveChanges();
            }
            else
            {
                db.Update(stage);
                db.SaveChanges();
            }
            List<Stage> stages = this.RecalculateStages(this.GetStagesByStage(stage));
            foreach (Stage st in stages)
            {
                db.Update(st);
                db.SaveChanges();
            }
            return stages.FirstOrDefault(s => s.sportsman == stage.sportsman);
        }
        [HttpPost]
        [Authorize]
        public List<Circle> SaveCircles([FromBody] List<Circle> circles)
        {
            foreach (Circle c in circles)
            {
                if (c.id == 0)
                {
                    db.Circle.Add(c);
                    db.SaveChanges();
                }
                else
                {
                    db.Update(c);
                    db.SaveChanges();
                }
            }
            foreach (Circle circle in circles)
            {
                List<Circle> sortedCircles = this.RecalculateCircles(this.GetCirclesByCircle(circle));
                foreach (Circle c in sortedCircles)
                {
                    if (c.sportsman == circle.sportsman)
                    {
                        circle.place = c.place;
                    }
                }
                db.Update(circle);
                db.SaveChanges();
            }
            return circles;
        }

        private List<Result> RecalculateResults(List<Result> results)
        {
            results = results.OrderByDescending(r => r.points).ToList();
            for (int i = 0; i < results.Count; i++)
            {
                results[i].place = i + 1;
            }
            return results;
        }
        private List<Stage> RecalculateStages(List<Stage> stages)
        {
            stages = stages.OrderByDescending(s => s.points).ToList();
            for (int i = 0; i < stages.Count; i++)
            {
                stages[i].place = i + 1;
            }
            return stages;
        }
        private List<Circle> RecalculateCircles(List<Circle> circles)
        {
            circles = circles.OrderByDescending(c => c.points).ToList();
            for (int i = 0; i < circles.Count; i++)
            {
                circles[i].place = i + 1;
            }
            return circles;
        }
        private List<Stage> GetStagesByStage(Stage stage)
        {
            Result result = db.Result.FirstOrDefault(r => r.id == stage.result);
            List<Result> results = db.Result.Where(r => r.competition == result.competition).ToList();
            List<Stage> stages = new List<Stage>();
            foreach (Result res in results)
            {
                Stage st = db.Stage.FirstOrDefault(s => s.result == res.id && s.stage_num == stage.stage_num);
                if (st != null)
                    stages.Add(st);
            }
            return stages;
        }
        private List<Circle> GetCirclesByCircle(Circle circle)
        {
            Stage stage = db.Stage.FirstOrDefault(s => s.id == circle.stage);
            List<Stage> stages = this.GetStagesByStage(stage);
            List<Circle> circles = new List<Circle>();
            foreach (Stage st in stages)
            {
                Circle circ = db.Circle.FirstOrDefault(c => c.stage == st.id && c.circle_num == circle.circle_num);
                if (circ != null)
                    circles.Add(circ);
            }
            return circles;
        }
    }
}