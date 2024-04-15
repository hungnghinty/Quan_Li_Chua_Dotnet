using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;

namespace intern_project.Services
{
    internal class ChuaServices : IChuaServices
    {
        InternDbContext DbContext { get; set; }
        public ChuaServices()
        {
            DbContext = new InternDbContext();
        }

        public ErrorType ThemChua(Chua chuaThem)
        {
            
                DbContext.Add(chuaThem);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
        }

        public ErrorType SuaChua(Chua chuaSua)
        {
            var check = DbContext.Chuas.FirstOrDefault(x => x.Chuaid == chuaSua.Chuaid);
            if (check != null)
            {
                check.Tenchua = chuaSua.Tenchua;
                check.Capnhat = chuaSua.Capnhat;
                check.Diachi = chuaSua.Diachi;
                check.Ngaythanhlap = chuaSua.Ngaythanhlap;
                check.Trutri = chuaSua.Trutri;

                DbContext.Chuas.Update(check);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.TonTai;
        }

        public ErrorType XoaChua(int chuaID)
        {
            var check = DbContext.Chuas.FirstOrDefault(x => x.Chuaid == chuaID);
            if (check != null)
            {
                DbContext.Chuas.Remove(check);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }

        public PageResult<Chua> GetDanhSachChua(string keyword, Pagination pagination)
        {
            var dsChua= DbContext.Chuas.AsEnumerable();
            if (!string.IsNullOrEmpty(keyword))
            {
                dsChua = dsChua.Where(x => x.Tenchua.ToLower().Contains(keyword.ToLower()));
            }
            var result = PageResult<Chua>.ToPageResult(pagination, dsChua);
            pagination.totalCount = DbContext.Chuas.Count();
            return new PageResult<Chua>(pagination, result);
        }
    }
}
