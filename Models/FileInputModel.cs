using Microsoft.AspNetCore.Http;

namespace circle_competitions_monitoring.Models
{
    public class FileInputModel
    {
        public IFormFile File { get; set; }
        public string Param { get; set; }
    }
}