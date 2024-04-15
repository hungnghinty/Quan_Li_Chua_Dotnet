using intern_project.Entities;
using intern_project.Helper;

namespace intern_project.Interface
{
    public interface IChuaServices
    {
        public ErrorType ThemChua(Chua chuaThem);
        public ErrorType SuaChua(Chua chuaSua);
        public ErrorType XoaChua(int chuaID);
        public PageResult<Chua> GetDanhSachChua(string keyword, Pagination pagination);
    }
}
