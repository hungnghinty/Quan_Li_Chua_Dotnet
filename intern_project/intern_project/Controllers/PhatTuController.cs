using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using intern_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhatTuController : ControllerBase
    {
        private readonly IPhatTuServices phatTuServices;

        public PhatTuController()
        {
            phatTuServices = new PhatTuServices();
        }
        [HttpGet("laydanhsachphattu")]
        [Authorize(Roles = "0")]
        public IActionResult GetDanhSachPhatTu(String? keyword, [FromQuery]Pagination pagination)
        { 
            var dsPhatTu = phatTuServices.GetDanhSachPhatTu(keyword,pagination);
            return Ok(dsPhatTu);
        }
        [HttpPost("themphattu")]
        [Authorize(Roles = "0")]
        public IActionResult themPhatTu([FromForm] PhatTuImage phattuimage)
        {
            var ret = phatTuServices.ThemPhatTu(phattuimage);
            if (ret == ErrorType.ThanhCong)
            {
                return Ok("them thanh cong");
            }
            return BadRequest("Them that bai");
        }
        [HttpPost("capnhatphattu")]
        [Authorize(Roles = "0")]
        public IActionResult SuaPhatTu([FromForm] PhatTuImage phatTuSua)
        {
            var ret = phatTuServices.SuaPhatTu(phatTuSua);
            if (ret == ErrorType.ThanhCong)
            {
                return Ok("Cap nhat thanh cong");
            }
            return BadRequest("Cap nhat that bai");
        }
        [HttpDelete ("xoaphattu")]
        [Authorize(Roles = "0")]
        public IActionResult XoaPhatTu([FromForm] int phatTuID)
        {
            var ret = phatTuServices.XoaPhatTu(phatTuID);
            if(ret == ErrorType.ThanhCong)
            {
                return Ok("Xoa thanh cong");
            }
            return BadRequest("Xoa that bai");
        }
        
        [HttpPost("gui email")]
        public IActionResult SendEmail([FromQuery] string email)
        {
            var ret = phatTuServices.GuiEmailMaToken(email);
            if(ret == ErrorType.TonTai)
            {

                var message = new MimeMessage();
                message.From.Add(MailboxAddress.Parse("nguyenhungpv201203@gmail.com"));
                message.To.Add(MailboxAddress.Parse("nguyenhungpv201203@gmail.com"));
                message.Subject = "Token Code to reset Password";
                message.Body = new TextPart(TextFormat.Html) { Text = "send mail successfully!" };

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("nguyenhungpv201203@gmail.com", "fjkimsidafptoqax");
                smtp.Send(message);
                smtp.Disconnect(true);

                return Ok("gui ma thanh cong");
            }
            return BadRequest("email chua dang ki");
        }
        
    }
}
