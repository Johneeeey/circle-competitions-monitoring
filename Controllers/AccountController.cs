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

namespace circle_competitions_monitoring.Controllers {
    public class AccountController : Controller {
        private DataContext db;
        public AccountController (DataContext context) {
            this.db = context;
        }

        [Authorize]
        [HttpPost]
        public User GetUser () {
            User user = db.User.FirstOrDefault (u => u.id == int.Parse (User.Identity.Name));
            return user;
        }

        [HttpPost]
        public async Task Authorize (string login, string password) {
            ClaimsIdentity identity = GetIdentity (login, password);
            if (identity == null) {
                Response.StatusCode = 404;
                return;
            } else {
                DateTime now = DateTime.UtcNow;
                JwtSecurityToken jwt = new JwtSecurityToken (
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add (TimeSpan.FromMinutes (AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials (AuthOptions.GetSymmetricSecurityKey (), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler ().WriteToken (jwt);
                var response = new {
                    access_token = encodedJwt,
                    User = db.User.FirstOrDefault (u => u.id == Convert.ToInt32 (identity.Name))
                    // User = new User
                    // {
                    //     login = login,
                    //     password = password,
                    //     e_mail = "mail@mail.ru",
                    //     id = 1,
                    //     name = "Nikita",
                    //     role = 1,
                    //     surname = "Gerasimov"
                    // }
                };
                Response.ContentType = "application/json";
                await Response.WriteAsync (
                    JsonConvert.SerializeObject (
                        response,
                        new JsonSerializerSettings {
                            Formatting = Formatting.Indented
                        })
                );
            }
        }

        [HttpPost]
        public async Task Registrate ([FromBody] User user) {
            db.User.Add (user);
            db.SaveChanges ();
            var identity = NewIdentity (user);
            var now = DateTime.Now;
            var jwt = new JwtSecurityToken (
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add (TimeSpan.FromMinutes (AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials (AuthOptions.GetSymmetricSecurityKey (), SecurityAlgorithms.HmacSha256)
            );
            var encodedJwt = new JwtSecurityTokenHandler ().WriteToken (jwt);
            var response = new {
                access_token = encodedJwt,
                user = user
            };
            Response.ContentType = "application/json";
            await Response.WriteAsync (
                JsonConvert.SerializeObject (response,
                    new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }
        private ClaimsIdentity GetIdentity (string login, string password) {
            User user = db.User.FirstOrDefault (u => u.login == login && u.password == password);
            // User user = new User
            // {
            //     login = login,
            //     password = password,
            //     e_mail = "mail@mail.ru",
            //     id = 1,
            //     name = "Nikita",
            //     role = 1,
            //     surname = "Gerasimov"
            // };
            if (user == null)
                return null;
            else {
                Role role = db.Role.FirstOrDefault (r => r.id == user.role);
                // Role role = new Role
                // {
                //     id = 1,
                //     name = "Admin"
                // };
                var Claims = new List<Claim> {
                    new Claim (ClaimsIdentity.DefaultNameClaimType, user.id.ToString ())
                };
                Claims.Add (new Claim (ClaimsIdentity.DefaultRoleClaimType, role.name));
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity (
                        Claims,
                        "Token",
                        ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType
                    );
                return claimsIdentity;
            }
        }
        private ClaimsIdentity NewIdentity (User user) {
            var Claims = new List<Claim> {
                new Claim (ClaimsIdentity.DefaultNameClaimType, user.id.ToString ()),
                new Claim (ClaimsIdentity.DefaultRoleClaimType, 2. ToString ())
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity (Claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}