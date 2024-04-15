using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using intern_project.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace intern_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonDangKyController : ControllerBase
    {
        private readonly IDonDangKyServices donDangKyServices;
        public DonDangKyController()
        {
            donDangKyServices = new DonDangKyServices();
        }
        [HttpPost("themdondangky")]
        public IActionResult ThemDonDangKy([FromBody] Dondangky donDKThem)
        {
            donDKThem.Trangthaidon = 0;
            var them = donDangKyServices.ThemDonDK(donDKThem);
            if (them == ErrorType.ThanhCong)
            {
                return Ok("them don thanh cong");
            }
            return BadRequest("them don trang that bai");
        }
        [HttpPost("capnhatdondangky")]
        //[Authorize(Roles = "0")]
        public IActionResult SuaDonDangKy([FromBody] Dondangky donDKSua)
        {
            var sua = donDangKyServices.SuaDonDK(donDKSua);
            if (sua == ErrorType.ThanhCong)
            {
                return Ok("Cap nhat dao trang thanh cong");
            }
            return BadRequest("Cap nhat dao trang that bai");
        }
        [HttpDelete("xoadondangky")]
        //[Authorize(Roles = "0")]
        public IActionResult XoaDonDangKy([FromBody] int donXoaID)
        {
            var xoa = donDangKyServices.XoaDonDK(donXoaID);
            if (xoa == ErrorType.ThanhCong)
            {
                return Ok("Xoa dao trang thanh cong");
            }
            return BadRequest("Xoa dao trang that bai");
        }
        [HttpPost("duyetdondangky")]
        //[Authorize(Roles = "0")]
        public IActionResult DuyetDonDangKy([FromBody] int donDuyet)
        {
            var sua = donDangKyServices.DuyetDonDK(donDuyet);
            if (sua == ErrorType.ThanhCong)
            {
                return Ok("Cap nhat dao trang thanh cong");
            }
            return BadRequest("Cap nhat dao trang that bai");
        }
        [HttpGet("getdanhsachdondangki")]
        public IActionResult GetDanhSachDonDangKy(int? keyword, [FromQuery] Pagination pagination)
        {
            var get = donDangKyServices.GetDangSachDonDK(keyword, pagination);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest("lay danh sach don dang ky that bai");
        }
        [HttpGet("getdanhsachphattudaotrang")]
        public IActionResult GetDanhSachPhatTuDaoTrang(int? keyword, [FromQuery] Pagination pagination)
        {
            var get = donDangKyServices.GetDangSachPhatTuDaoTrang(keyword, pagination);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest("lay danh sach don dang ky that bai");
        }

        
    }
}
