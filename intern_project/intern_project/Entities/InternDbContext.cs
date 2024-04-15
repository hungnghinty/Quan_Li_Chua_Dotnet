using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace intern_project.Entities;

public partial class InternDbContext : DbContext
{
    public InternDbContext()
    {
    }

    public InternDbContext(DbContextOptions<InternDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Chua> Chuas { get; set; }

    public virtual DbSet<Daotrang> Daotrangs { get; set; }

    public virtual DbSet<Dondangky> Dondangkys { get; set; }

    public virtual DbSet<Kieuthanhvien> Kieuthanhviens { get; set; }

    public virtual DbSet<Phattu> Phattus { get; set; }

    public virtual DbSet<Phattudaotrang> Phattudaotrangs { get; set; }

    public virtual DbSet<Token> Tokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(" Data Source=.;Initial Catalog=intern_db;Integrated Security=True;TrustServerCertificate=True ");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chua>(entity =>
        {
            entity.ToTable("chuas");

            entity.Property(e => e.Chuaid)
                .ValueGeneratedNever()
                .HasColumnName("chuaid");
            entity.Property(e => e.Capnhat)
                .HasColumnType("datetime")
                .HasColumnName("capnhat");
            entity.Property(e => e.Diachi).HasColumnName("diachi");
            entity.Property(e => e.Ngaythanhlap)
                .HasColumnType("datetime")
                .HasColumnName("ngaythanhlap");
            entity.Property(e => e.Tenchua).HasColumnName("tenchua");
            entity.Property(e => e.Trutri).HasColumnName("trutri");
        });

        modelBuilder.Entity<Daotrang>(entity =>
        {
            entity.ToTable("daotrangs");

            entity.Property(e => e.Daotrangid)
                .ValueGeneratedNever()
                .HasColumnName("daotrangid");
            entity.Property(e => e.Daketthuc).HasColumnName("daketthuc");
            entity.Property(e => e.Nguoitrutri).HasColumnName("nguoitrutri");
            entity.Property(e => e.Noidung).HasColumnName("noidung");
            entity.Property(e => e.Noitochuc).HasColumnName("noitochuc");
            entity.Property(e => e.Sothanhvienthamgia).HasColumnName("sothanhvienthamgia");
            entity.Property(e => e.Thoigiantochuc)
                .HasColumnType("datetime")
                .HasColumnName("thoigiantochuc");
        });

        modelBuilder.Entity<Dondangky>(entity =>
        {
            entity.ToTable("dondangkys");

            entity.Property(e => e.Dondangkyid)
                .ValueGeneratedNever()
                .HasColumnName("dondangkyid");
            entity.Property(e => e.Daotrangid).HasColumnName("daotrangid");
            entity.Property(e => e.Ngayguidon)
                .HasColumnType("datetime")
                .HasColumnName("ngayguidon");
            entity.Property(e => e.Ngayxuly)
                .HasColumnType("datetime")
                .HasColumnName("ngayxuly");
            entity.Property(e => e.Nguoixuly).HasColumnName("nguoixuly");
            entity.Property(e => e.Phattuid).HasColumnName("phattuid");
            entity.Property(e => e.Trangthaidon).HasColumnName("trangthaidon");

            entity.HasOne(d => d.Daotrang).WithMany(p => p.Dondangkies)
                .HasForeignKey(d => d.Daotrangid)
                .HasConstraintName("FK_dondangkys_daotrangs");

            entity.HasOne(d => d.Phattu).WithMany(p => p.Dondangkies)
                .HasForeignKey(d => d.Phattuid)
                .HasConstraintName("FK_dondangkys_phattus");
        });

        modelBuilder.Entity<Kieuthanhvien>(entity =>
        {
            entity.ToTable("kieuthanhviens");

            entity.Property(e => e.Kieuthanhvienid)
                .ValueGeneratedNever()
                .HasColumnName("kieuthanhvienid");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.Tenkieu).HasColumnName("tenkieu");
        });

        modelBuilder.Entity<Phattu>(entity =>
        {
            entity.ToTable("phattus");

            entity.Property(e => e.Phattuid)
                .ValueGeneratedNever()
                .HasColumnName("phattuid");
            entity.Property(e => e.Anhchup).HasColumnName("anhchup");
            entity.Property(e => e.Chuaid).HasColumnName("chuaid");
            entity.Property(e => e.Dahoantuc).HasColumnName("dahoantuc");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Gioitinh).HasColumnName("gioitinh");
            entity.Property(e => e.Ho).HasColumnName("ho");
            entity.Property(e => e.Kieuthanhvienid).HasColumnName("kieuthanhvienid");
            entity.Property(e => e.Ngaycapnhat)
                .HasColumnType("datetime")
                .HasColumnName("ngaycapnhat");
            entity.Property(e => e.Ngayhoantuc)
                .HasColumnType("datetime")
                .HasColumnName("ngayhoantuc");
            entity.Property(e => e.Ngaysinh)
                .HasColumnType("datetime")
                .HasColumnName("ngaysinh");
            entity.Property(e => e.Ngayxuatgia)
                .HasColumnType("datetime")
                .HasColumnName("ngayxuatgia");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phapdanh).HasColumnName("phapdanh");
            entity.Property(e => e.Sodienthoai).HasColumnName("sodienthoai");
            entity.Property(e => e.Ten).HasColumnName("ten");
            entity.Property(e => e.Tendem)
                .IsUnicode(false)
                .HasColumnName("tendem");

            entity.HasOne(d => d.Chua).WithMany(p => p.Phattus)
                .HasForeignKey(d => d.Chuaid)
                .HasConstraintName("FK_phattus_chuas");

            entity.HasOne(d => d.Kieuthanhvien).WithMany(p => p.Phattus)
                .HasForeignKey(d => d.Kieuthanhvienid)
                .HasConstraintName("FK_phattus_kieuthanhviens");
        });

        modelBuilder.Entity<Phattudaotrang>(entity =>
        {
            entity.ToTable("phattudaotrangs");

            entity.Property(e => e.Phattudaotrangid)
                .ValueGeneratedNever()
                .HasColumnName("phattudaotrangid");
            entity.Property(e => e.Daotrangid).HasColumnName("daotrangid");
            entity.Property(e => e.Dathamgia).HasColumnName("dathamgia");
            entity.Property(e => e.Lidokhongthamgia).HasColumnName("lidokhongthamgia");
            entity.Property(e => e.Phattuid).HasColumnName("phattuid");

            entity.HasOne(d => d.Daotrang).WithMany(p => p.Phattudaotrangs)
                .HasForeignKey(d => d.Daotrangid)
                .HasConstraintName("FK_phattudaotrangs_daotrangs");

            entity.HasOne(d => d.Phattu).WithMany(p => p.Phattudaotrangs)
                .HasForeignKey(d => d.Phattuid)
                .HasConstraintName("FK_phattudaotrangs_phattus");
        });

        modelBuilder.Entity<Token>(entity =>
        {
            entity.ToTable("token");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Phattuid).HasColumnName("phattuid");
            entity.Property(e => e.Token1).HasColumnName("token");
            entity.Property(e => e.Tokentype).HasColumnName("tokentype");

            entity.HasOne(d => d.Phattu).WithMany(p => p.Tokens)
                .HasForeignKey(d => d.Phattuid)
                .HasConstraintName("FK_token_phattus");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
