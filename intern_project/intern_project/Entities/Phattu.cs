using intern_project.Helper;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace intern_project.Entities;

public partial class Phattu
{
    public int Phattuid { get; set; }

    public String? Anhchup  { get; set; }

    public bool? Dahoantuc { get; set; }

    public string Email { get; set; }

    public int? Gioitinh { get; set; }

    public string? Ho { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public DateTime? Ngayhoantuc { get; set; }

    public DateTime? Ngaysinh { get; set; }

    public DateTime? Ngayxuatgia { get; set; }

    public string? Password { get; set; }

    public string? Phapdanh { get; set; }

    public string? Sodienthoai { get; set; }

    public string? Ten { get; set; }

    public string? Tendem { get; set; }

    public int? Chuaid { get; set; }

    public int? Kieuthanhvienid { get; set; }
    public bool IsActive { get; set; }

    public virtual Chua? Chua { get; set; }

    public virtual ICollection<Dondangky> Dondangkies { get; set; } = new List<Dondangky>();

    public virtual Kieuthanhvien? Kieuthanhvien { get; set; }

    public virtual ICollection<Phattudaotrang> Phattudaotrangs { get; set; } = new List<Phattudaotrang>();

    public virtual ICollection<Token> Tokens { get; set; } = new List<Token>();


    // phuong thuc
    //public void nhapPhatTu(int idcheck = -1)
    //{
    //    if (idcheck != -1)
    //    {
    //        Phattuid = idcheck;
    //    }
    //    Anhchup = InputHelper.InputString("Xin moi nhap Anhchup? ", "Nhap khong hop le");
    //    Dahoantuc = InputHelper.InputBool("Phat tu da hoan tuc chua? ", "Nhap khong hop le");
    //    Email = InputHelper.InputString("Xin moi nhap email? ","Nhap khong hop le",0,100);
    //    Gioitinh = InputHelper.InputInt("Xin moi nhap Gioitinh? ", "Nhap khong hop le");
    //    Ho = InputHelper.InputString("Xin moi nhap Ho? ", "Nhap khong hop le");
    //    Ngaycapnhat = InputHelper.InputDatetime("Xin moi nhap ngay cap nhat? ", "Nhap khong hop le",new DateTime(1900,01,01),new DateTime(2023,07,11));
    //    Ngayhoantuc = InputHelper.InputDatetime("Xin moi nhap Ngayhoantuc? ", "Nhap khong hop le", new DateTime(1900, 01, 01), new DateTime(2023, 07, 11));
    //    Ngaysinh = InputHelper.InputDatetime("Xin moi nhap Ngaysinh? ", "Nhap khong hop le", new DateTime(1900, 01, 01), new DateTime(2023, 07, 11));
    //    Ngayxuatgia = InputHelper.InputDatetime("Xin moi nhap Ngayxuatgia? ", "Nhap khong hop le", new DateTime(1900, 01, 01), new DateTime(2023, 07, 11));
    //    Password  = InputHelper.InputString("Xin moi nhap Password? ", "Nhap khong hop le");
    //    Phapdanh = InputHelper.InputString("Xin moi nhap Phapdanh? ", "Nhap khong hop le");
    //    Sodienthoai = InputHelper.InputString("Xin moi nhap Sodienthoai? ", "Nhap khong hop le");
    //    Ten = InputHelper.InputString("Xin moi nhap Ten? ", "Nhap khong hop le");
    //    Tendem = InputHelper.InputString("Xin moi nhap Tendem? ", "Nhap khong hop le");
    //    Chuaid = InputHelper.InputInt("Xin moi nhap Chuaid? ", "Nhap khong hop le");
    //    Kieuthanhvienid = InputHelper.InputInt("Xin moi nhap Kieuthanhvienid? ", "Nhap khong hop le");
    //}
    public void inThongTinPhatTu()
    {

    }
}
