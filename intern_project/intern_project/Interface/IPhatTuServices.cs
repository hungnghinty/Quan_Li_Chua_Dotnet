using intern_project.Entities;
using intern_project.Helper;

namespace intern_project.Interface
{
    public interface IPhatTuServices
    {
        public ErrorType SuaPhatTu(PhatTuImage phatTuSua);
        public ErrorType XoaPhatTu(int phatTuID);
        public ErrorType ThemPhatTu(PhatTuImage phatTuImage);
        //public ErrorType DangKi();
        public ErrorType DangNhap(string emailORsdt);
        public ErrorType DoiMatKhau(string emailORsdt);
        public PageResult<Phattu> GetDanhSachPhatTu(string keyword,Pagination pagination);
        public ErrorType GuiEmailMaToken(string email);

    }
}
