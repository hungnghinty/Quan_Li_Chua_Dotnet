using System;
using System.Collections.Generic;

namespace intern_project.Entities;

public partial class Dondangky
{
    public int Dondangkyid { get; set; }

    public DateTime? Ngayguidon { get; set; }

    public DateTime? Ngayxuly { get; set; }

    public int? Nguoixuly { get; set; }

    public int? Trangthaidon { get; set; }

    public int? Daotrangid { get; set; }

    public int? Phattuid { get; set; }

    public virtual Daotrang? Daotrang { get; set; }

    public virtual Phattu? Phattu { get; set; }
}
