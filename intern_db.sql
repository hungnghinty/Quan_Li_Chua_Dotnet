USE [master]
GO
/****** Object:  Database [intern_db]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE DATABASE [intern_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'intern_db', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\intern_db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'intern_db_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\intern_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [intern_db] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [intern_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [intern_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [intern_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [intern_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [intern_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [intern_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [intern_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [intern_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [intern_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [intern_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [intern_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [intern_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [intern_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [intern_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [intern_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [intern_db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [intern_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [intern_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [intern_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [intern_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [intern_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [intern_db] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [intern_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [intern_db] SET RECOVERY FULL 
GO
ALTER DATABASE [intern_db] SET  MULTI_USER 
GO
ALTER DATABASE [intern_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [intern_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [intern_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [intern_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [intern_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [intern_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'intern_db', N'ON'
GO
ALTER DATABASE [intern_db] SET QUERY_STORE = OFF
GO
USE [intern_db]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chuas]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chuas](
	[chuaid] [int] NOT NULL,
	[capnhat] [datetime] NULL,
	[diachi] [nvarchar](max) NULL,
	[ngaythanhlap] [datetime] NULL,
	[tenchua] [nvarchar](max) NULL,
	[trutri] [int] NULL,
 CONSTRAINT [PK_chuas] PRIMARY KEY CLUSTERED 
(
	[chuaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[daotrangs]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[daotrangs](
	[daotrangid] [int] NOT NULL,
	[daketthuc] [bit] NULL,
	[noidung] [nvarchar](max) NULL,
	[noitochuc] [nvarchar](max) NULL,
	[sothanhvienthamgia] [int] NULL,
	[thoigiantochuc] [datetime] NULL,
	[nguoitrutri] [int] NULL,
 CONSTRAINT [PK_daotrangs] PRIMARY KEY CLUSTERED 
(
	[daotrangid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[dondangkys]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dondangkys](
	[dondangkyid] [int] NOT NULL,
	[ngayguidon] [datetime] NULL,
	[ngayxuly] [datetime] NULL,
	[nguoixuly] [int] NULL,
	[trangthaidon] [int] NULL,
	[daotrangid] [int] NULL,
	[phattuid] [int] NULL,
 CONSTRAINT [PK_dondangkys] PRIMARY KEY CLUSTERED 
(
	[dondangkyid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[kieuthanhviens]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[kieuthanhviens](
	[kieuthanhvienid] [int] NOT NULL,
	[code] [nvarchar](max) NULL,
	[tenkieu] [nvarchar](max) NULL,
 CONSTRAINT [PK_kieuthanhviens] PRIMARY KEY CLUSTERED 
(
	[kieuthanhvienid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phattudaotrangs]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phattudaotrangs](
	[phattudaotrangid] [int] NOT NULL,
	[dathamgia] [bit] NULL,
	[lidokhongthamgia] [nvarchar](max) NULL,
	[daotrangid] [int] NULL,
	[phattuid] [int] NULL,
 CONSTRAINT [PK_phattudaotrangs] PRIMARY KEY CLUSTERED 
(
	[phattudaotrangid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phattus]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phattus](
	[phattuid] [int] NOT NULL,
	[anhchup] [nvarchar](max) NULL,
	[dahoantuc] [bit] NULL,
	[email] [nvarchar](max) NOT NULL,
	[gioitinh] [int] NULL,
	[ho] [nvarchar](max) NULL,
	[ngaycapnhat] [datetime] NULL,
	[ngayhoantuc] [datetime] NULL,
	[ngaysinh] [datetime] NULL,
	[ngayxuatgia] [datetime] NULL,
	[password] [nvarchar](max) NULL,
	[phapdanh] [nvarchar](max) NULL,
	[sodienthoai] [nvarchar](max) NULL,
	[ten] [nvarchar](max) NULL,
	[tendem] [varchar](max) NULL,
	[chuaid] [int] NULL,
	[kieuthanhvienid] [int] NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_phattus] PRIMARY KEY CLUSTERED 
(
	[phattuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[token]    Script Date: 12/7/2024 9:54:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[token](
	[id] [int] NOT NULL,
	[token] [nvarchar](max) NULL,
	[tokentype] [int] NULL,
	[phattuid] [int] NULL,
 CONSTRAINT [PK_token] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_dondangkys_daotrangid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_dondangkys_daotrangid] ON [dbo].[dondangkys]
(
	[daotrangid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_dondangkys_phattuid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_dondangkys_phattuid] ON [dbo].[dondangkys]
(
	[phattuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_phattudaotrangs_daotrangid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_phattudaotrangs_daotrangid] ON [dbo].[phattudaotrangs]
(
	[daotrangid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_phattudaotrangs_phattuid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_phattudaotrangs_phattuid] ON [dbo].[phattudaotrangs]
(
	[phattuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_phattus_chuaid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_phattus_chuaid] ON [dbo].[phattus]
(
	[chuaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_phattus_kieuthanhvienid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_phattus_kieuthanhvienid] ON [dbo].[phattus]
(
	[kieuthanhvienid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_token_phattuid]    Script Date: 12/7/2024 9:54:40 AM ******/
CREATE NONCLUSTERED INDEX [IX_token_phattuid] ON [dbo].[token]
(
	[phattuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[dondangkys]  WITH CHECK ADD  CONSTRAINT [FK_dondangkys_daotrangs] FOREIGN KEY([daotrangid])
REFERENCES [dbo].[daotrangs] ([daotrangid])
GO
ALTER TABLE [dbo].[dondangkys] CHECK CONSTRAINT [FK_dondangkys_daotrangs]
GO
ALTER TABLE [dbo].[dondangkys]  WITH CHECK ADD  CONSTRAINT [FK_dondangkys_phattus] FOREIGN KEY([phattuid])
REFERENCES [dbo].[phattus] ([phattuid])
GO
ALTER TABLE [dbo].[dondangkys] CHECK CONSTRAINT [FK_dondangkys_phattus]
GO
ALTER TABLE [dbo].[phattudaotrangs]  WITH CHECK ADD  CONSTRAINT [FK_phattudaotrangs_daotrangs] FOREIGN KEY([daotrangid])
REFERENCES [dbo].[daotrangs] ([daotrangid])
GO
ALTER TABLE [dbo].[phattudaotrangs] CHECK CONSTRAINT [FK_phattudaotrangs_daotrangs]
GO
ALTER TABLE [dbo].[phattudaotrangs]  WITH CHECK ADD  CONSTRAINT [FK_phattudaotrangs_phattus] FOREIGN KEY([phattuid])
REFERENCES [dbo].[phattus] ([phattuid])
GO
ALTER TABLE [dbo].[phattudaotrangs] CHECK CONSTRAINT [FK_phattudaotrangs_phattus]
GO
ALTER TABLE [dbo].[phattus]  WITH CHECK ADD  CONSTRAINT [FK_phattus_chuas] FOREIGN KEY([chuaid])
REFERENCES [dbo].[chuas] ([chuaid])
GO
ALTER TABLE [dbo].[phattus] CHECK CONSTRAINT [FK_phattus_chuas]
GO
ALTER TABLE [dbo].[phattus]  WITH CHECK ADD  CONSTRAINT [FK_phattus_kieuthanhviens] FOREIGN KEY([kieuthanhvienid])
REFERENCES [dbo].[kieuthanhviens] ([kieuthanhvienid])
GO
ALTER TABLE [dbo].[phattus] CHECK CONSTRAINT [FK_phattus_kieuthanhviens]
GO
ALTER TABLE [dbo].[token]  WITH CHECK ADD  CONSTRAINT [FK_token_phattus] FOREIGN KEY([phattuid])
REFERENCES [dbo].[phattus] ([phattuid])
GO
ALTER TABLE [dbo].[token] CHECK CONSTRAINT [FK_token_phattus]
GO
USE [master]
GO
ALTER DATABASE [intern_db] SET  READ_WRITE 
GO
