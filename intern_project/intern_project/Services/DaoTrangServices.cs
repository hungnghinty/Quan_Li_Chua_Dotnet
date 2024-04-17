using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using Microsoft.EntityFrameworkCore;

namespace intern_project.Services
{
    internal class DaoTrangServices : IDaoTrangServices
    {
        InternDbContext dbContext { get; set; }
        public DaoTrangServices()
        {
            dbContext = new InternDbContext();
        }
        public PageResult<Daotrang> GetDanhSachDaoTrang(string? keyword, Pagination pagination)
        {
            var dsDaoTrang = dbContext.Daotrangs.AsEnumerable();
            if (!string.IsNullOrEmpty(keyword))
            {
                dsDaoTrang = dsDaoTrang.Where(x => x.Noidung.ToLower().Contains(keyword.ToLower()));
            }
            var result = PageResult<Daotrang>.ToPageResult(pagination, dsDaoTrang);
            pagination.totalCount = dbContext.Daotrangs.Count();
            return new PageResult<Daotrang>(pagination, result);
        }

        public ErrorType SuaDaoTrang(Daotrang daoTrangSua)
        {
            var sua = dbContext.Daotrangs.FirstOrDefault(x => x.Daotrangid == daoTrangSua.Daotrangid);
            if (sua != null)
            {
                sua.Daketthuc = daoTrangSua.Daketthuc;
                sua.Noidung = daoTrangSua.Noidung;
                sua.Noitochuc = daoTrangSua.Noitochuc;
                sua.Sothanhvienthamgia = daoTrangSua.Sothanhvienthamgia;
                sua.Thoigiantochuc = daoTrangSua.Thoigiantochuc;
                sua.Nguoitrutri = daoTrangSua.Nguoitrutri;

                
                dbContext.Update(sua);
                dbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }

        public ErrorType ThemDaoTrang(Daotrang daoTrangThem)
        {
            daoTrangThem.Daotrangid = GetMaxID() + 1;
                dbContext.Add(daoTrangThem);
                dbContext.SaveChanges();
               return ErrorType.ThanhCong;
            
        }

        public ErrorType XoaDaoTrang(int daoTrangID)
        {
            var xoa = dbContext.Daotrangs.FirstOrDefault(x => x.Daotrangid == daoTrangID);
            if (xoa != null)
            {
                dbContext.Remove(xoa);
                dbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }
        public int GetMaxID()
        {
            var dsDaotrang = dbContext.Daotrangs.AsEnumerable();
            int max = (int)dsDaotrang.Max(c => c.Daotrangid);
            return max;
        }
    }
}
