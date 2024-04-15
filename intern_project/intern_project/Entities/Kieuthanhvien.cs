using System;
using System.Collections.Generic;

namespace intern_project.Entities;

public partial class Kieuthanhvien
{
    public int Kieuthanhvienid { get; set; }

    public string? Code { get; set; }

    public string? Tenkieu { get; set; }

    public virtual ICollection<Phattu> Phattus { get; set; } = new List<Phattu>();
}
