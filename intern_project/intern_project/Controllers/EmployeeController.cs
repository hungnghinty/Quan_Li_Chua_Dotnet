using intern_project.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            return "Authenticated with Jwt";
        }
        [HttpGet]
        [Route("Details")]
        public string Details()
        {
            return "Authenticated with Jwt";
        }

        
        [HttpPost]
        public string AddPhattu(Phattu phattu)
        {
            return "phattu added with email " + phattu.Email;
        }
    }
}
