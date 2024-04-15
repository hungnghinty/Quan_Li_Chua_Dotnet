using intern_project.Entities;
using intern_project.Helper;

namespace intern_project.Interface
{
    public interface IDaoTrangServices
    {
        public ErrorType ThemDaoTrang(Daotrang daoTrangThem);
        public ErrorType SuaDaoTrang(Daotrang daoTrangSua);
        public ErrorType XoaDaoTrang(int daoTrangID);
        public PageResult<Daotrang> GetDanhSachDaoTrang(string? keyword, Pagination pagination);

    }
}
