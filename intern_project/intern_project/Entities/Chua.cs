using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace intern_project.Entities;

public partial class Chua
{
    [Key]
    public int? Chuaid { get; set; }

    public DateTime? Capnhat { get; set; }

    public string? Diachi { get; set; }

    public DateTime? Ngaythanhlap { get; set; }

    public string? Tenchua { get; set; }

    public int? Trutri { get; set; }

    public virtual ICollection<Phattu> Phattus { get; set; } = new List<Phattu>();
}
