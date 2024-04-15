namespace intern_project.Entities
{
    public class PhatTuImage
    {
        public int Phattuid { get; set; }

        public IFormFile? Anhchup { get; set; }

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
    }
}
