
/****** Object:  Database [SWP1]    Script Date: 5/30/2024 5:00:59 AM ******/
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SWP1', FILENAME = N'/var/opt/mssql/data/SWP1.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SWP1_log', FILENAME = N'/var/opt/mssql/data/SWP1_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SWP1] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SWP1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SWP1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SWP1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SWP1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SWP1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SWP1] SET ARITHABORT OFF 
GO
ALTER DATABASE [SWP1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SWP1] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SWP1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SWP1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SWP1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SWP1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SWP1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SWP1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SWP1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SWP1] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SWP1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SWP1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SWP1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SWP1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SWP1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SWP1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SWP1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SWP1] SET RECOVERY FULL 
GO
ALTER DATABASE [SWP1] SET  MULTI_USER 
GO
ALTER DATABASE [SWP1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SWP1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SWP1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SWP1] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SWP1] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SWP1] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SWP1', N'ON'
GO
ALTER DATABASE [SWP1] SET QUERY_STORE = ON
GO
ALTER DATABASE [SWP1] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SWP1]
GO
/****** Object:  Table [dbo].[Design]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Design](
	[DesignID] [int] IDENTITY(1,1) NOT NULL,
	[DesignName] [varchar](100) NULL,
	[Description] [text] NULL,
	[URLImage] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[DesignID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoice](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [int] NULL,
	[created_at] [datetime] NULL,
	[TotalCost] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InvoiceDetail]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoiceDetail](
	[InvoiceDetailID] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceID] [int] NULL,
	[MaterialID] [int] NULL,
	[TotalAmount] [int] NULL,
	[TotalCost] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[InvoiceDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material](
	[MaterialID] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](50) NULL,
	[PricePerUnit] [decimal](18, 2) NULL,
	[MaterialName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PaymentID] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [int] NULL,
	[Amount] [decimal](18, 2) NULL,
	[PaymentDate] [datetime] NULL,
	[PaymentType] [varchar](50) NULL,
	[Status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Process]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Process](
	[ProcessID] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [int] NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [int] NULL,
	[Status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ProcessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Quotation]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quotation](
	[QuotationID] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [int] NULL,
	[created_at] [datetime] NULL,
	[approved_at] [datetime] NULL,
	[approve_by] [int] NULL,
	[Cost] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[QuotationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[RequestID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[sale_staffid] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[recieved_at] [datetime] NULL,
	[end_at] [datetime] NULL,
	[Status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[RequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[request_order]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[request_order](
	[request_orderid] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [int] NULL,
	[DesignID] [int] NULL,
	[design_staff] [int] NULL,
	[production_staff] [int] NULL,
	[Status] [varchar](50) NULL,
	[created_at] [datetime] NULL,
	[end_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[request_orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequestOrderDetail]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestOrderDetail](
	[MaterialID] [int] NOT NULL,
	[request_orderid] [int] NOT NULL,
	[Weight] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaterialID] ASC,
	[request_orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [varchar](50) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Email] [varchar](100) NULL,
	[Address] [text] NULL,
	[Title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[warranty_card]    Script Date: 5/30/2024 5:00:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[warranty_card](
	[request_orderid] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[end_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[request_orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Invoice] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Payment] ADD  DEFAULT (getdate()) FOR [PaymentDate]
GO
ALTER TABLE [dbo].[Process] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Quotation] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Request] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[request_order] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD FOREIGN KEY([RequestID])
REFERENCES [dbo].[Request] ([RequestID])
GO
ALTER TABLE [dbo].[InvoiceDetail]  WITH CHECK ADD FOREIGN KEY([InvoiceID])
REFERENCES [dbo].[Invoice] ([InvoiceID])
GO
ALTER TABLE [dbo].[InvoiceDetail]  WITH CHECK ADD FOREIGN KEY([MaterialID])
REFERENCES [dbo].[Material] ([MaterialID])
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD FOREIGN KEY([RequestID])
REFERENCES [dbo].[Request] ([RequestID])
GO
ALTER TABLE [dbo].[Process]  WITH CHECK ADD FOREIGN KEY([RequestID])
REFERENCES [dbo].[Request] ([RequestID])
GO
ALTER TABLE [dbo].[Process]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Quotation]  WITH CHECK ADD FOREIGN KEY([approve_by])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Quotation]  WITH CHECK ADD FOREIGN KEY([RequestID])
REFERENCES [dbo].[Request] ([RequestID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([sale_staffid])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[request_order]  WITH CHECK ADD FOREIGN KEY([DesignID])
REFERENCES [dbo].[Design] ([DesignID])
GO
ALTER TABLE [dbo].[request_order]  WITH CHECK ADD FOREIGN KEY([design_staff])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[request_order]  WITH CHECK ADD FOREIGN KEY([production_staff])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[request_order]  WITH CHECK ADD FOREIGN KEY([RequestID])
REFERENCES [dbo].[Request] ([RequestID])
GO
ALTER TABLE [dbo].[RequestOrderDetail]  WITH CHECK ADD FOREIGN KEY([MaterialID])
REFERENCES [dbo].[Material] ([MaterialID])
GO
ALTER TABLE [dbo].[RequestOrderDetail]  WITH CHECK ADD FOREIGN KEY([request_orderid])
REFERENCES [dbo].[request_order] ([request_orderid])
GO
ALTER TABLE [dbo].[warranty_card]  WITH CHECK ADD FOREIGN KEY([request_orderid])
REFERENCES [dbo].[request_order] ([request_orderid])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD CHECK  (([Title]='Admin' OR [Title]='ProductionStaff' OR [Title]='DesignStaff' OR [Title]='SaleStaff' OR [Title]='Customer'))
GO
USE [master]
GO
ALTER DATABASE [SWP1] SET  READ_WRITE 
GO
