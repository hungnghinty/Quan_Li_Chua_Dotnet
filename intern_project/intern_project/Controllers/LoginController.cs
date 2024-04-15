using intern_project.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
//using System.Net.Mail;
//using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using intern_project.Helper;
using intern_project.Services;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using intern_project.Interface;
using MailKit.Net.Smtp;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        InternDbContext _context { get; set; }
        private readonly IPhatTuServices phatTuServices;
        public LoginController()
        {
            _context = new InternDbContext();
            phatTuServices = new PhatTuServices();
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(string email)
        {
            //tao token
            var user = _context.Phattus.FirstOrDefault(x => x.Email == email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            var resettoken = new Token
            {
                Id = user.Phattuid,
                Phattuid = user.Phattuid,
                Token1 = CreateRandomToken(),
                Tokentype = 1
            };
            _context.Tokens.Add(resettoken);
            _context.SaveChanges();

            //gui token vao email
            var ret = phatTuServices.GuiEmailMaToken(email);
            if (ret == ErrorType.TonTai)
            {

                var message = new MimeMessage();
                message.From.Add(MailboxAddress.Parse("nguyenhungpv201203@gmail.com"));
                message.To.Add(MailboxAddress.Parse("nguyenhungpv201203@gmail.com"));
                message.Subject = "Token Code to reset Password";
                message.Body = new TextPart(TextFormat.Html) { Text = resettoken.Token1 };

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("nguyenhungpv201203@gmail.com", "fjkimsidafptoqax");
                smtp.Send(message);
                smtp.Disconnect(true);

                return Ok("gui ma thanh cong");
            }
            return BadRequest("email chua dang ki");
        }
        [HttpPost("reset-password")]
        public IActionResult ResetPassword(ResetPasswordRequest request)
        {
            var token = _context.Tokens.FirstOrDefault(x => x.Token1 == request.Token);
            if (token == null /*|| user.ResetTokenExpires < DateTime.Now*/)
            {
                return BadRequest("Invalid Token");
            }

            var phattu = _context.Phattus.FirstOrDefault(x => x.Phattuid == token.Phattuid);
            if(phattu == null)
            {
                return BadRequest("phat tu ko ton tai");
            }
            phattu.Password = request.Password;

            _context.Update(phattu);
            _context.Remove(token);
            _context.SaveChanges();

            return Ok("password reset successfully!");
        }
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        
    }
}
