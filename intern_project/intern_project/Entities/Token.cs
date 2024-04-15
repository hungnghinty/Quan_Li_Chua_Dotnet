using System;
using System.Collections.Generic;

namespace intern_project.Entities;

public partial class Token
{
    public int Id { get; set; }

    public string? Token1 { get; set; }

    public int? Tokentype { get; set; }

    public int? Phattuid { get; set; }

    public virtual Phattu? Phattu { get; set; }
}
