using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using intern_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuaController : Controller
    {
        private readonly IChuaServices chuaServices;
        public ChuaController()
        {
            chuaServices = new ChuaServices();
        }

        [HttpPost("themchua")]
        public IActionResult ThemChua([FromBody] Chua chuaThem)
        {
            var them = chuaServices.ThemChua(chuaThem);
            if(them == ErrorType.ThanhCong)
            {
                return Ok("them chua thanh cong");
            }
            return BadRequest("them chua that bai");
        }
        [HttpPost("capnhatchua")]
        public IActionResult SuaChua([FromBody] Chua chuaSua)
        {
            var them = chuaServices.SuaChua(chuaSua);
            if (them == ErrorType.ThanhCong)
            {
                return Ok("cap nhat chua thanh cong");
            }
            return BadRequest("cap nhat chua that bai");
        }
        [HttpDelete("xoachua")]
        public IActionResult XoaChua([FromBody] int chuaid)
        {
            var them = chuaServices.XoaChua(chuaid);
            if (them == ErrorType.ThanhCong)
            {
                return Ok("xoa chua thanh cong");
            }
            return BadRequest("xoa chua that bai");
        }
        [HttpGet("laydanhsachchua")]
        public IActionResult GetDanhSachChua(String? keyword, [FromQuery] Pagination pagination)
        {
            var get = chuaServices.GetDanhSachChua(keyword,pagination);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest("danh sach chua trong");
        }
    }
}
