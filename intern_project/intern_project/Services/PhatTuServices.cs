using intern_project.Entities;
using intern_project.Helper;
using intern_project.Interface;
using System.Reflection;

namespace intern_project.Services
{
    internal class PhatTuServices : IPhatTuServices
    {
        InternDbContext DbContext { get; set; }
        public PhatTuServices()
        {
            DbContext = new InternDbContext();
        }


        public ErrorType SuaPhatTu(PhatTuImage phatTuSua)
        {
            Phattu phatTuHienTai = DbContext.Phattus.FirstOrDefault(x => x.Phattuid == phatTuSua.Phattuid);
            if (phatTuHienTai != null)
            {

                
                phatTuHienTai.Dahoantuc = phatTuSua.Dahoantuc;
                phatTuHienTai.Email = phatTuSua.Email;
                phatTuHienTai.Gioitinh = phatTuSua.Gioitinh;
                phatTuHienTai.Ho = phatTuSua.Ho;
                phatTuHienTai.Ngayhoantuc = phatTuSua.Ngayhoantuc;
                phatTuHienTai.Ngaysinh = phatTuSua.Ngaysinh;
                phatTuHienTai.Ngayxuatgia = phatTuSua.Ngayxuatgia;
                phatTuHienTai.Password = phatTuSua.Password;
                phatTuHienTai.Phapdanh = phatTuSua.Phapdanh;
                phatTuHienTai.Sodienthoai = phatTuSua.Sodienthoai;
                phatTuHienTai.Ten = phatTuSua.Ten;
                phatTuHienTai.Tendem = phatTuSua.Tendem;
                phatTuHienTai.Chuaid = phatTuSua.Chuaid;
                phatTuHienTai.Kieuthanhvienid = phatTuSua.Kieuthanhvienid;

                if (phatTuSua.Anhchup == null)
                {
                    phatTuHienTai.Anhchup = "";
                }
                else
                {

                    var path = Path.Combine(Directory.GetCurrentDirectory(), phatTuSua.Anhchup.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        phatTuSua.Anhchup.CopyTo(stream);
                    }
                    phatTuHienTai.Anhchup = path;
                }

                DbContext.Update(phatTuHienTai);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }
        public ErrorType XoaPhatTu(int phatTuID)
        {
            Phattu phatTuXoa = DbContext.Phattus.FirstOrDefault(x => x.Phattuid.Equals(phatTuID));
            if (phatTuXoa != null)
            {
                phatTuXoa.IsActive = false;
                DbContext.Update(phatTuXoa);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }
        public ErrorType ThemPhatTu(PhatTuImage phatTuImage)
        {
            var findphattu = DbContext.Phattus.FirstOrDefault(x => x.Phattuid == phatTuImage.Phattuid);
            if(findphattu != null)
            {
                return ErrorType.TonTai;
            }
            else
            {
                var phatTuThem = new Phattu
                {
                    Phattuid = phatTuImage.Phattuid,
                    Dahoantuc = phatTuImage.Dahoantuc,
                    Email = phatTuImage.Email,
                    Gioitinh = phatTuImage.Gioitinh,
                    Ho = phatTuImage.Ho,
                    Ngayhoantuc = phatTuImage.Ngayhoantuc,
                    Ngaysinh = phatTuImage.Ngaysinh,
                    Ngayxuatgia = phatTuImage.Ngayxuatgia,
                    Password = phatTuImage.Password,
                    Phapdanh = phatTuImage.Phapdanh,
                    Sodienthoai = phatTuImage.Sodienthoai,
                    Ten = phatTuImage.Ten,
                    Tendem = phatTuImage.Tendem,
                    Chuaid = phatTuImage.Chuaid,
                    Kieuthanhvienid = phatTuImage.Kieuthanhvienid
                };
                //xu ly anh
                if (phatTuImage.Anhchup == null )
                {
                    phatTuThem.Anhchup = "";
                }
                else
                {
                    
                    var path = Path.Combine(Directory.GetCurrentDirectory(), phatTuImage.Anhchup.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        phatTuImage.Anhchup.CopyTo(stream);
                    }
                    phatTuThem.Anhchup = path;
                }

                DbContext.Add(phatTuThem);
                DbContext.SaveChanges();
                return ErrorType.ThanhCong;
            }

            
        }

        //public ErrorType DangKi()
        //{
        //    Phattu phatTuDangKi = new Phattu();
        //    phatTuDangKi.nhapPhatTu();
        //    while (phatTuDangKi.Email == null && phatTuDangKi.Sodienthoai == null)
        //    {
        //        Console.Write("can co email hoac SDT");
        //        phatTuDangKi.nhapPhatTu();
        //    }
        //    Phattu phatTuCheck = DbContext.Phattus.FirstOrDefault(x => x.Email.Equals(phatTuDangKi.Email)
        //                                                            || x.Sodienthoai.Equals(phatTuDangKi.Sodienthoai));

        //    if (phatTuCheck == null)
        //    {
        //        DbContext.Add(phatTuDangKi);
        //        return ErrorType.ThanhCong;
        //    }
        //    return ErrorType.TonTai;
        //}

        public ErrorType DangNhap(string emailORsdt)
        {
            Phattu phatTuDangNhap = DbContext.Phattus.FirstOrDefault(x => x.Email.Equals(emailORsdt)
                                                                    || x.Sodienthoai.Equals(emailORsdt));
            if (phatTuDangNhap != null)
            {
                return ErrorType.TonTai;
            }
            return ErrorType.ChuaTonTai;
        }
        public ErrorType DoiMatKhau(string emailORsdt)
        {
            Phattu phatTuSuaMK = DbContext.Phattus.FirstOrDefault(x => x.Email.Equals(emailORsdt)
                                                                    || x.Sodienthoai.Equals(emailORsdt));
            if (phatTuSuaMK != null)
            {
                phatTuSuaMK.Password = InputHelper.InputString("Xin moi nhap lai mat khau", "Nhap ko hop le", 0, int.MaxValue);
                return ErrorType.ThanhCong;
            }
            return ErrorType.ChuaTonTai;
        }

        public PageResult<Phattu> GetDanhSachPhatTu(string keyword, Pagination pagination)
        {
            var dsPhatTu = DbContext.Phattus.AsEnumerable().Where(x => x.IsActive == true);
            if(!string.IsNullOrEmpty(keyword))
            {
                 dsPhatTu = dsPhatTu.Where(x => x.Ten.ToLower().Contains(keyword.ToLower())
                                             || x.Phapdanh.ToLower().Contains(keyword.ToLower())
                                             || x.Email.ToLower().Contains(keyword.ToLower()));
            }
            var result = PageResult<Phattu>.ToPageResult(pagination, dsPhatTu);
            pagination.totalCount = DbContext.Phattus.Count();
            return new PageResult<Phattu>(pagination,result);
        }

        public ErrorType GuiEmailMaToken(string email)
        {
            var check = DbContext.Phattus.FirstOrDefault(x => x.Email.ToLower().Contains(email.ToLower()));
            if(check == null)
            {
                return ErrorType.ChuaTonTai;
            }
            return ErrorType.TonTai;
        }
    }
}
