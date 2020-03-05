using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace circle_competitions_monitoring
{
    public class AuthOptions
    {
        public const string ISSUER = "server";
        public const string AUDIENCE = "client";
        const string KEY = "circle_competitions_app_encryption_key";   // ключ для шифрации
        public const int LIFETIME = 720; // время жизни токена - 12 часов
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));

        }
    }
}