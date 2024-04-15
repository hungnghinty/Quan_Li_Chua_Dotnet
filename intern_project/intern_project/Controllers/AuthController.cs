using intern_project.Entities;
using intern_project.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        InternDbContext dbContext { get; set; }
        private readonly IPhatTuServices phatTuServices;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            dbContext = new InternDbContext();
        }

        [HttpPost("register")]
        public ActionResult<Phattu> Register([FromForm] PhatTuDto request)
        {
            Phattu phattu = new Phattu();

            //string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            phattu.Email = request.Email;
            phattu.Password = request.Password;

            return Ok(phattu);
        }
        [HttpPost("login")]
        public ActionResult<Phattu> Login([FromForm] PhatTuDto request)
        {
            var phattu = dbContext.Phattus.FirstOrDefault(x => x.Email == request.Email
                                                            && x.IsActive == true);
            if (phattu == null)
            {
                return BadRequest("Email not exist");
            }
            //if (!BCrypt.Net.BCrypt.Verify(request.Password, phattu.Password))
            if(phattu.Password != request.Password)
            {
                return BadRequest("Incorrect password");
            }
            var token = CreateToken(phattu);

            return Ok(token);
        }
        private string CreateToken(Phattu phattu)
        {

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,phattu.Email),

                //roles
                new Claim(ClaimTypes.Role,phattu.Kieuthanhvienid.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
