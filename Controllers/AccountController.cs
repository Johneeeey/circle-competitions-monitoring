using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using circle_competitions_monitoring.Models;

namespace circle_competitions_monitoring.Controllers
{
    public class AccountController : Controller
    {
        private DataContext db;
        public AccountController(DataContext context)
        {
            this.db = context;
        }

        [Authorize]
        public User GetUser()
        {
            User user = db.Users.FirstOrDefault(u => u.id == int.Parse(User.Identity.Name));
            return user;
        }

        public async Task Authorize(string login, string password)
        {
            ClaimsIdentity identity = GetIdentity(login, password);
            if (identity == null)
            {
                await Response.WriteAsync("Invalid login of password");
                return;
            }
            else
            {
                DateTime now = DateTime.UtcNow;
                JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                var response = new
                {
                    access_token = encodedJwt,
                    User = db.Users.FirstOrDefault(u => u.id == Convert.ToInt32(identity.Name))
                };
                Response.ContentType = "application/json";
                await Response.WriteAsync(
                    JsonConvert.SerializeObject(
                        response,
                        new JsonSerializerSettings
                        {
                            Formatting = Formatting.Indented
                        })
                    );
            }
        }

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            User user = db.Users.FirstOrDefault(u => u.login == login && u.password == password);
            if (user == null)
                return null;
            else
            {
                Role role = db.Roles.FirstOrDefault(r => r.id == user.role);
                var Claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.id.ToString())
                };
                Claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role.name));
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(
                        Claims,
                        "Token",
                        ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType
                    );
                return claimsIdentity;
            }
        }
    }
}