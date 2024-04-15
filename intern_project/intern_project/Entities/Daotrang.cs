using System;
using System.Collections.Generic;

namespace intern_project.Entities;

public partial class Daotrang
{
    public int Daotrangid { get; set; }

    public bool? Daketthuc { get; set; }

    public string? Noidung { get; set; }

    public string? Noitochuc { get; set; }

    public int? Sothanhvienthamgia { get; set; }

    public DateTime? Thoigiantochuc { get; set; }

    public int? Nguoitrutri { get; set; }

    public virtual ICollection<Dondangky> Dondangkies { get; set; } = new List<Dondangky>();

    public virtual ICollection<Phattudaotrang> Phattudaotrangs { get; set; } = new List<Phattudaotrang>();
}
