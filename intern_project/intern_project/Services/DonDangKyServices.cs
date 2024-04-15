using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace intern_project.Services
{
    internal class DonDangKyServices : IDonDangKyServices
    {
        InternDbContext dbContext;
        public DonDangKyServices()
        {
            dbContext = new InternDbContext();
        }
        public PageResult<Dondangky> GetDangSachDonDK(int? keyword, Pagination pagination)
        {
            var dsDonDK = dbContext.Dondangkys.AsEnumerable();
            if (keyword != null)
            {
                dsDonDK = dsDonDK.Where(x => x.Dondangkyid == keyword 
                                            || x.Daotrangid == keyword
                                            || x.Phattuid == keyword);
            }
            var result = PageResult<Dondangky>.ToPageResult(pagination, dsDonDK);
            pagination.totalCount = dbContext.Dondangkys.Count();
            return new PageResult<Dondangky>(pagination, result);
        }

        public PageResult<Phattudaotrang> GetDangSachPhatTuDaoTrang(int? keyword, Pagination pagination)
        {
            var dsPhatTuDaoTrang = dbContext.Phattudaotrangs.AsEnumerable();
            if (keyword != null)
            {
                dsPhatTuDaoTrang = dsPhatTuDaoTrang.Where(x => x.Phattudaotrangid == keyword
                                                            || x.Daotrangid == keyword
                                                            || x.Phattuid == keyword);
            }
            var result = PageResult<Phattudaotrang>.ToPageResult(pagination, dsPhatTuDaoTrang);
            pagination.totalCount = dbContext.Phattudaotrangs.Count();
            return new PageResult<Phattudaotrang>(pagination, result);
        }

        public ErrorType SuaDonDK(Dondangky donDK)
        {
            var donhientai = dbContext.Dondangkys.FirstOrDefault(x => x.Dondangkyid == donDK.Dondangkyid);
            var sua = dbContext.Dondangkys.FirstOrDefault(x => x.Dondangkyid == donDK.Dondangkyid);
            if (sua != null)
            {
                var phattudtsua = dbContext.Phattudaotrangs.FirstOrDefault(x =>
                                                            x.Daotrangid == donhientai.Daotrangid
                                                          && x.Phattuid == donhientai.Phattuid);
                if (phattudtsua != null)
                {
                    dbContext.Phattudaotrangs.Remove(phattudtsua);
                    var phattudtthem = new Phattudaotrang
                    {
                        Dathamgia = true,
                        Lidokhongthamgia = "",
                        Daotrangid = donDK.Daotrangid,
                        Phattuid = donDK.Phattuid,
                    };
                    dbContext.Phattudaotrangs.Add(phattudtthem);
                    dbContext.SaveChanges();
                }

                sua.Ngayguidon = donDK.Ngayguidon;
                sua.Ngayxuly = donDK.Ngayxuly; 
                sua.Nguoixuly = donDK.Nguoixuly; 
                sua.Trangthaidon = donDK.Trangthaidon; 
                sua.Daotrangid = donDK.Daotrangid;
                sua.Phattuid = donDK.Phattuid;

                dbContext.Dondangkys.Update(sua);
                dbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }

        public ErrorType ThemDonDK(Dondangky donDK)
        {
            var checkIsActive = dbContext.Phattus.FirstOrDefault(x => x.Phattuid == donDK.Phattuid);
            if(checkIsActive!=null && checkIsActive.IsActive == true)
            {
                var them = dbContext.Dondangkys.FirstOrDefault(x => x.Dondangkyid == donDK.Dondangkyid);
                if (them == null)
                {
                    dbContext.Dondangkys.Add(donDK);
                    dbContext.SaveChanges();
                    return ErrorType.ThanhCong;
                    
                }
                return ErrorType.TonTai;
            }
            return ErrorType.ChuaTonTai;
        }

        public ErrorType XoaDonDK(int donDKID)
        {
            var donxoa = dbContext.Dondangkys.FirstOrDefault(x => x.Dondangkyid == donDKID);
            if (donxoa != null)
            {
                var phattudtxoa = dbContext.Phattudaotrangs.FirstOrDefault(x =>
                                                            x.Daotrangid == donxoa.Daotrangid
                                                          && x.Phattuid == donxoa.Phattuid);

                var daotrang = dbContext.Daotrangs.FirstOrDefault(x => x.Daotrangid == donDKID);
                daotrang.Sothanhvienthamgia--;

                dbContext.Phattudaotrangs.Remove(phattudtxoa);
                dbContext.Dondangkys.Remove(donxoa);

                dbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }
        public ErrorType DuyetDonDK(int donDKID)
        {
            var donduyet = dbContext.Dondangkys.FirstOrDefault(x => x.Dondangkyid == donDKID);
            if (donduyet != null)
            {
                if(donduyet.Trangthaidon != 1)
                {
                    donduyet.Trangthaidon = 1;
                    dbContext.Update(donduyet);

                    var phattudtduyet = new Phattudaotrang
                    {
                        Dathamgia = true,
                        Lidokhongthamgia = "",
                        Daotrangid = donduyet.Daotrangid,
                        Phattuid = donduyet.Phattuid,
                    };
                    dbContext.Phattudaotrangs.Add(phattudtduyet);
                    dbContext.SaveChanges();

                    var daotrang = dbContext.Daotrangs.FirstOrDefault(x => x.Daotrangid == donduyet.Daotrangid);
                    daotrang.Sothanhvienthamgia++;
                    dbContext.Update(daotrang);

                    dbContext.SaveChanges();
                    return ErrorType.ThanhCong;
                }
                return ErrorType.TonTai;
            }
            return ErrorType.ChuaTonTai;
        }
    }
}
