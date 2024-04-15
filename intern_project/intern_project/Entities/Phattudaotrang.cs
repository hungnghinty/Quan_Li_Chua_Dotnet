using System;
using System.Collections.Generic;

namespace intern_project.Entities;

public partial class Phattudaotrang
{
    public int Phattudaotrangid { get; set; }

    public bool? Dathamgia { get; set; }

    public string? Lidokhongthamgia { get; set; }

    public int? Daotrangid { get; set; }

    public int? Phattuid { get; set; }

    public virtual Daotrang? Daotrang { get; set; }

    public virtual Phattu? Phattu { get; set; }
}
