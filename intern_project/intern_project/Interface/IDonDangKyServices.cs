using intern_project.Entities;
using intern_project.Helper;
using Microsoft.AspNetCore.Mvc;

namespace intern_project.Interface
{
    public interface IDonDangKyServices
    {
        public ErrorType ThemDonDK(Dondangky donDK);
        public ErrorType SuaDonDK(Dondangky donDK);
        public ErrorType XoaDonDK(int donDKID);
        public ErrorType DuyetDonDK(int donDKID);
        public PageResult<Dondangky> GetDangSachDonDK(int? keyword,Pagination pagination);
        public PageResult<Phattudaotrang> GetDangSachPhatTuDaoTrang(int? keyword, Pagination pagination);
    }
}
