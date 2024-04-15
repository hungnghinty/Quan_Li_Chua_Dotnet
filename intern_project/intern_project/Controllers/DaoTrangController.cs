using intern_project.Entities;
using intern_project.Interface;
using intern_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using intern_project.Helper;
using Microsoft.AspNetCore.Authorization;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaoTrangController : Controller
    {
        private readonly IDaoTrangServices daoTrangServices;
        public DaoTrangController()
        {
            daoTrangServices = new DaoTrangServices();
        }
        [HttpPost("themdaotrang")]
        //[Authorize (Roles = "0")]
        public IActionResult ThemDaoTrang([FromBody] Daotrang daoTrangThem)
        {
            var them = daoTrangServices.ThemDaoTrang(daoTrangThem);
            if(them == ErrorType.ThanhCong)
            {
                return Ok("them dao trang thanh cong");
            }
            return BadRequest("them dao trang that bai");
        }
        [HttpPost("capnhatdaotrang")]
        public IActionResult SuaDaoTrang([FromBody] Daotrang daoTrangSua)
        {
            var them = daoTrangServices.SuaDaoTrang(daoTrangSua);
            if (them == ErrorType.ThanhCong)
            {
                return Ok("Cap nhat dao trang thanh cong");
            }
            return BadRequest("Cap nhat dao trang that bai");
        }
        [HttpDelete("xoadaotrang")]
        public IActionResult XoaDaoTrang([FromBody] int daoTrangXoaID)
        {
            var them = daoTrangServices.XoaDaoTrang(daoTrangXoaID);
            if (them == ErrorType.ThanhCong)
            {
                return Ok("Xoa dao trang thanh cong");
            }
            return BadRequest("Xoa dao trang that bai");
        }
        [HttpGet("getdanhsachdaotrang")]
        public IActionResult GetDanhSachDaoTrang(String? keyword, [FromQuery] Pagination pagination)
        {
            var get = daoTrangServices.GetDanhSachDaoTrang(keyword, pagination);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest("lay danh sach dao trang that bai");
        }
    }
}
