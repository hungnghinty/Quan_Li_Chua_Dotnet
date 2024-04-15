using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intern_project.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "chuas",
                columns: table => new
                {
                    chuaid = table.Column<int>(type: "int", nullable: false),
                    capnhat = table.Column<DateTime>(type: "datetime", nullable: true),
                    diachi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ngaythanhlap = table.Column<DateTime>(type: "datetime", nullable: true),
                    tenchua = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    trutri = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chuas", x => x.chuaid);
                });

            migrationBuilder.CreateTable(
                name: "daotrangs",
                columns: table => new
                {
                    daotrangid = table.Column<int>(type: "int", nullable: false),
                    daketthuc = table.Column<bool>(type: "bit", nullable: true),
                    noidung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noitochuc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sothanhvienthamgia = table.Column<int>(type: "int", nullable: true),
                    thoigiantochuc = table.Column<DateTime>(type: "datetime", nullable: true),
                    nguoitrutri = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_daotrangs", x => x.daotrangid);
                });

            migrationBuilder.CreateTable(
                name: "kieuthanhviens",
                columns: table => new
                {
                    kieuthanhvienid = table.Column<int>(type: "int", nullable: false),
                    code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tenkieu = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kieuthanhviens", x => x.kieuthanhvienid);
                });

            migrationBuilder.CreateTable(
                name: "phattus",
                columns: table => new
                {
                    phattuid = table.Column<int>(type: "int", nullable: false),
                    anhchup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dahoantuc = table.Column<bool>(type: "bit", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gioitinh = table.Column<int>(type: "int", nullable: true),
                    ho = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ngaycapnhat = table.Column<DateTime>(type: "datetime", nullable: true),
                    ngayhoantuc = table.Column<DateTime>(type: "datetime", nullable: true),
                    ngaysinh = table.Column<DateTime>(type: "datetime", nullable: true),
                    ngayxuatgia = table.Column<DateTime>(type: "datetime", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phapdanh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sodienthoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tendem = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    chuaid = table.Column<int>(type: "int", nullable: true),
                    kieuthanhvienid = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_phattus", x => x.phattuid);
                    table.ForeignKey(
                        name: "FK_phattus_chuas",
                        column: x => x.chuaid,
                        principalTable: "chuas",
                        principalColumn: "chuaid");
                    table.ForeignKey(
                        name: "FK_phattus_kieuthanhviens",
                        column: x => x.kieuthanhvienid,
                        principalTable: "kieuthanhviens",
                        principalColumn: "kieuthanhvienid");
                });

            migrationBuilder.CreateTable(
                name: "dondangkys",
                columns: table => new
                {
                    dondangkyid = table.Column<int>(type: "int", nullable: false),
                    ngayguidon = table.Column<DateTime>(type: "datetime", nullable: true),
                    ngayxuly = table.Column<DateTime>(type: "datetime", nullable: true),
                    nguoixuly = table.Column<int>(type: "int", nullable: true),
                    trangthaidon = table.Column<int>(type: "int", nullable: true),
                    daotrangid = table.Column<int>(type: "int", nullable: true),
                    phattuid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dondangkys", x => x.dondangkyid);
                    table.ForeignKey(
                        name: "FK_dondangkys_daotrangs",
                        column: x => x.daotrangid,
                        principalTable: "daotrangs",
                        principalColumn: "daotrangid");
                    table.ForeignKey(
                        name: "FK_dondangkys_phattus",
                        column: x => x.phattuid,
                        principalTable: "phattus",
                        principalColumn: "phattuid");
                });

            migrationBuilder.CreateTable(
                name: "phattudaotrangs",
                columns: table => new
                {
                    phattudaotrangid = table.Column<int>(type: "int", nullable: false),
                    dathamgia = table.Column<bool>(type: "bit", nullable: true),
                    lidokhongthamgia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    daotrangid = table.Column<int>(type: "int", nullable: true),
                    phattuid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_phattudaotrangs", x => x.phattudaotrangid);
                    table.ForeignKey(
                        name: "FK_phattudaotrangs_daotrangs",
                        column: x => x.daotrangid,
                        principalTable: "daotrangs",
                        principalColumn: "daotrangid");
                    table.ForeignKey(
                        name: "FK_phattudaotrangs_phattus",
                        column: x => x.phattuid,
                        principalTable: "phattus",
                        principalColumn: "phattuid");
                });

            migrationBuilder.CreateTable(
                name: "token",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tokentype = table.Column<int>(type: "int", nullable: true),
                    phattuid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_token", x => x.id);
                    table.ForeignKey(
                        name: "FK_token_phattus",
                        column: x => x.phattuid,
                        principalTable: "phattus",
                        principalColumn: "phattuid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_dondangkys_daotrangid",
                table: "dondangkys",
                column: "daotrangid");

            migrationBuilder.CreateIndex(
                name: "IX_dondangkys_phattuid",
                table: "dondangkys",
                column: "phattuid");

            migrationBuilder.CreateIndex(
                name: "IX_phattudaotrangs_daotrangid",
                table: "phattudaotrangs",
                column: "daotrangid");

            migrationBuilder.CreateIndex(
                name: "IX_phattudaotrangs_phattuid",
                table: "phattudaotrangs",
                column: "phattuid");

            migrationBuilder.CreateIndex(
                name: "IX_phattus_chuaid",
                table: "phattus",
                column: "chuaid");

            migrationBuilder.CreateIndex(
                name: "IX_phattus_kieuthanhvienid",
                table: "phattus",
                column: "kieuthanhvienid");

            migrationBuilder.CreateIndex(
                name: "IX_token_phattuid",
                table: "token",
                column: "phattuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dondangkys");

            migrationBuilder.DropTable(
                name: "phattudaotrangs");

            migrationBuilder.DropTable(
                name: "token");

            migrationBuilder.DropTable(
                name: "daotrangs");

            migrationBuilder.DropTable(
                name: "phattus");

            migrationBuilder.DropTable(
                name: "chuas");

            migrationBuilder.DropTable(
                name: "kieuthanhviens");
        }
    }
}
