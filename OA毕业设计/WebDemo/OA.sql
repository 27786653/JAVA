/*
Navicat SQL Server Data Transfer

Source Server         : Sqlserver
Source Server Version : 120000
Source Host           : localhost:1433
Source Database       : OA
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 120000
File Encoding         : 65001

Date: 2016-05-06 09:41:36
*/


-- ----------------------------
-- Table structure for announcement
-- ----------------------------
DROP TABLE [dbo].[announcement]
GO
CREATE TABLE [dbo].[announcement] (
[an_id] int NOT NULL IDENTITY(1,1) ,
[an_title] varchar(50) NOT NULL ,
[an_content] varchar(50) NOT NULL ,
[an_datetime] datetime NOT NULL ,
[u_id] int NULL ,
[an_lookCount] int NULL ,
[an_state] int NULL ,
[an_level] int NULL ,
[an_readed] int NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[announcement]', RESEED, 4)
GO

-- ----------------------------
-- Records of announcement
-- ----------------------------
SET IDENTITY_INSERT [dbo].[announcement] ON
GO
INSERT INTO [dbo].[announcement] ([an_id], [an_title], [an_content], [an_datetime], [u_id], [an_lookCount], [an_state], [an_level], [an_readed]) VALUES (N'1', N'公告', N'公告内容', N'2015-10-23 02:22:54.000', N'1', N'0', N'0', N'1', N'0')
GO
GO
INSERT INTO [dbo].[announcement] ([an_id], [an_title], [an_content], [an_datetime], [u_id], [an_lookCount], [an_state], [an_level], [an_readed]) VALUES (N'4', N'公告', N'公告内容不紧急', N'2015-10-23 02:25:55.000', N'1', N'0', N'0', N'0', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[announcement] OFF
GO

-- ----------------------------
-- Table structure for approve
-- ----------------------------
DROP TABLE [dbo].[approve]
GO
CREATE TABLE [dbo].[approve] (
[a_id] int NOT NULL IDENTITY(1,1) ,
[a_uid] int NULL ,
[a_time] datetime NULL ,
[at_id] int NULL ,
[a_state] int NULL ,
[ar_id] int NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[approve]', RESEED, 5)
GO

-- ----------------------------
-- Records of approve
-- ----------------------------
SET IDENTITY_INSERT [dbo].[approve] ON
GO
INSERT INTO [dbo].[approve] ([a_id], [a_uid], [a_time], [at_id], [a_state], [ar_id]) VALUES (N'1', N'1', N'2015-10-27 23:34:36.000', N'1', N'0', N'1')
GO
GO
INSERT INTO [dbo].[approve] ([a_id], [a_uid], [a_time], [at_id], [a_state], [ar_id]) VALUES (N'2', N'1', N'2015-10-27 23:46:40.000', N'7', N'1', N'2')
GO
GO
INSERT INTO [dbo].[approve] ([a_id], [a_uid], [a_time], [at_id], [a_state], [ar_id]) VALUES (N'3', N'1', N'2015-10-26 23:58:50.000', N'6', N'0', N'3')
GO
GO
INSERT INTO [dbo].[approve] ([a_id], [a_uid], [a_time], [at_id], [a_state], [ar_id]) VALUES (N'4', N'1', N'2015-10-27 00:26:42.000', N'5', N'0', N'1')
GO
GO
INSERT INTO [dbo].[approve] ([a_id], [a_uid], [a_time], [at_id], [a_state], [ar_id]) VALUES (N'5', N'1', N'2015-10-27 00:29:24.000', N'4', N'0', N'4')
GO
GO
SET IDENTITY_INSERT [dbo].[approve] OFF
GO

-- ----------------------------
-- Table structure for approveresults
-- ----------------------------
DROP TABLE [dbo].[approveresults]
GO
CREATE TABLE [dbo].[approveresults] (
[ar_id] int NOT NULL IDENTITY(1,1) ,
[ar_name] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[approveresults]', RESEED, 4)
GO

-- ----------------------------
-- Records of approveresults
-- ----------------------------
SET IDENTITY_INSERT [dbo].[approveresults] ON
GO
INSERT INTO [dbo].[approveresults] ([ar_id], [ar_name]) VALUES (N'1', N'新创建')
GO
GO
INSERT INTO [dbo].[approveresults] ([ar_id], [ar_name]) VALUES (N'2', N'审核中')
GO
GO
INSERT INTO [dbo].[approveresults] ([ar_id], [ar_name]) VALUES (N'3', N'通过')
GO
GO
INSERT INTO [dbo].[approveresults] ([ar_id], [ar_name]) VALUES (N'4', N'打回')
GO
GO
SET IDENTITY_INSERT [dbo].[approveresults] OFF
GO

-- ----------------------------
-- Table structure for approveType
-- ----------------------------
DROP TABLE [dbo].[approveType]
GO
CREATE TABLE [dbo].[approveType] (
[at_id] int NOT NULL IDENTITY(1,1) ,
[at_name] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[approveType]', RESEED, 7)
GO

-- ----------------------------
-- Records of approveType
-- ----------------------------
SET IDENTITY_INSERT [dbo].[approveType] ON
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'1', N'请假')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'2', N'收入证明')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'3', N'出差')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'4', N'名片印制')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'5', N'印章申请')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'6', N'车辆申请')
GO
GO
INSERT INTO [dbo].[approveType] ([at_id], [at_name]) VALUES (N'7', N'会议室预订')
GO
GO
SET IDENTITY_INSERT [dbo].[approveType] OFF
GO

-- ----------------------------
-- Table structure for boardroom
-- ----------------------------
DROP TABLE [dbo].[boardroom]
GO
CREATE TABLE [dbo].[boardroom] (
[b_id] int NOT NULL IDENTITY(1,1) ,
[b_code] varchar(50) NULL ,
[b_desc] varchar(50) NULL ,
[b_state] int NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[boardroom]', RESEED, 6)
GO

-- ----------------------------
-- Records of boardroom
-- ----------------------------
SET IDENTITY_INSERT [dbo].[boardroom] ON
GO
INSERT INTO [dbo].[boardroom] ([b_id], [b_code], [b_desc], [b_state]) VALUES (N'1', N'C312', N'三楼多媒体会议室', N'0')
GO
GO
INSERT INTO [dbo].[boardroom] ([b_id], [b_code], [b_desc], [b_state]) VALUES (N'2', N'B212', N'
B座二楼212普通会议室', N'0')
GO
GO
INSERT INTO [dbo].[boardroom] ([b_id], [b_code], [b_desc], [b_state]) VALUES (N'3', N'B214', N'B座二楼214普通会议室', N'0')
GO
GO
SET IDENTITY_INSERT [dbo].[boardroom] OFF
GO

-- ----------------------------
-- Table structure for boardroomManger
-- ----------------------------
DROP TABLE [dbo].[boardroomManger]
GO
CREATE TABLE [dbo].[boardroomManger] (
[bd_id] int NOT NULL IDENTITY(1,1) ,
[bd_createTime] datetime NULL ,
[bd_endTime] datetime NULL ,
[bd_startTime] datetime NULL ,
[bd_uid] int NULL ,
[bdt_id] int NULL ,
[a_id] int NULL ,
[b_id] int NULL 
)


GO

-- ----------------------------
-- Records of boardroomManger
-- ----------------------------
SET IDENTITY_INSERT [dbo].[boardroomManger] ON
GO
INSERT INTO [dbo].[boardroomManger] ([bd_id], [bd_createTime], [bd_endTime], [bd_startTime], [bd_uid], [bdt_id], [a_id], [b_id]) VALUES (N'1', N'2015-10-26 23:23:32.000', N'2015-10-27 23:23:36.000', N'2015-10-26 23:26:11.000', N'1', N'5', N'2', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[boardroomManger] OFF
GO

-- ----------------------------
-- Table structure for boardroomType
-- ----------------------------
DROP TABLE [dbo].[boardroomType]
GO
CREATE TABLE [dbo].[boardroomType] (
[bdt_id] int NOT NULL IDENTITY(1,1) ,
[bdt_name] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[boardroomType]', RESEED, 5)
GO

-- ----------------------------
-- Records of boardroomType
-- ----------------------------
SET IDENTITY_INSERT [dbo].[boardroomType] ON
GO
INSERT INTO [dbo].[boardroomType] ([bdt_id], [bdt_name]) VALUES (N'1', N'会议')
GO
GO
INSERT INTO [dbo].[boardroomType] ([bdt_id], [bdt_name]) VALUES (N'2', N'培训')
GO
GO
INSERT INTO [dbo].[boardroomType] ([bdt_id], [bdt_name]) VALUES (N'3', N'面试')
GO
GO
INSERT INTO [dbo].[boardroomType] ([bdt_id], [bdt_name]) VALUES (N'4', N'会客')
GO
GO
INSERT INTO [dbo].[boardroomType] ([bdt_id], [bdt_name]) VALUES (N'5', N'其他')
GO
GO
SET IDENTITY_INSERT [dbo].[boardroomType] OFF
GO

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE [dbo].[car]
GO
CREATE TABLE [dbo].[car] (
[c_id] int NOT NULL IDENTITY(1,1) ,
[c_carcode] varchar(50) NULL ,
[c_cartype] varchar(50) NULL ,
[c_desc] varchar(50) NULL ,
[c_state] int NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[car]', RESEED, 6)
GO

-- ----------------------------
-- Records of car
-- ----------------------------
SET IDENTITY_INSERT [dbo].[car] ON
GO
INSERT INTO [dbo].[car] ([c_id], [c_carcode], [c_cartype], [c_desc], [c_state]) VALUES (N'1', N'京A1221', N'金杯小货车', N'23121', N'0')
GO
GO
INSERT INTO [dbo].[car] ([c_id], [c_carcode], [c_cartype], [c_desc], [c_state]) VALUES (N'2', N'京p1233', N'现代轿车', N'123123', N'1')
GO
GO
INSERT INTO [dbo].[car] ([c_id], [c_carcode], [c_cartype], [c_desc], [c_state]) VALUES (N'3', N'京p34223', N'五菱荣光', N'23234', N'0')
GO
GO
SET IDENTITY_INSERT [dbo].[car] OFF
GO

-- ----------------------------
-- Table structure for carManger
-- ----------------------------
DROP TABLE [dbo].[carManger]
GO
CREATE TABLE [dbo].[carManger] (
[cm_id] int NOT NULL IDENTITY(1,1) ,
[c_id] int NULL ,
[cm_desc] varchar(50) NULL ,
[cm_endTime] datetime NULL ,
[cm_startTime] datetime NULL ,
[create_uid] int NULL ,
[a_id] int NULL 
)


GO

-- ----------------------------
-- Records of carManger
-- ----------------------------
SET IDENTITY_INSERT [dbo].[carManger] ON
GO
INSERT INTO [dbo].[carManger] ([cm_id], [c_id], [cm_desc], [cm_endTime], [cm_startTime], [create_uid], [a_id]) VALUES (N'1', N'1', N'测试', N'2015-10-26 23:58:26.000', N'2015-10-27 23:58:29.000', N'1', N'3')
GO
GO
SET IDENTITY_INSERT [dbo].[carManger] OFF
GO

-- ----------------------------
-- Table structure for carOrUsers
-- ----------------------------
DROP TABLE [dbo].[carOrUsers]
GO
CREATE TABLE [dbo].[carOrUsers] (
[cou_id] int NOT NULL IDENTITY(1,1) ,
[cou_type] int NULL ,
[cm_id] int NULL ,
[cmt_uid] int NULL 
)


GO

-- ----------------------------
-- Records of carOrUsers
-- ----------------------------
SET IDENTITY_INSERT [dbo].[carOrUsers] ON
GO
INSERT INTO [dbo].[carOrUsers] ([cou_id], [cou_type], [cm_id], [cmt_uid]) VALUES (N'1', N'0', N'1', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[carOrUsers] OFF
GO

-- ----------------------------
-- Table structure for Dept
-- ----------------------------
DROP TABLE [dbo].[Dept]
GO
CREATE TABLE [dbo].[Dept] (
[d_id] int NOT NULL IDENTITY(1,1) ,
[d_name] varchar(50) NOT NULL ,
[d_desc] text NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[Dept]', RESEED, 9)
GO

-- ----------------------------
-- Records of Dept
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Dept] ON
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'4', N'财务部', N'管理财务')
GO
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'5', N'人事部', N'管理招聘')
GO
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'6', N'行政部', N'？')
GO
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'7', N'技术部', N'负责写代码的一堆农民')
GO
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'8', N'生产部', N'？')
GO
GO
INSERT INTO [dbo].[Dept] ([d_id], [d_name], [d_desc]) VALUES (N'9', N'销售部', N'负责推销卖广告')
GO
GO
SET IDENTITY_INSERT [dbo].[Dept] OFF
GO

-- ----------------------------
-- Table structure for Employee
-- ----------------------------
DROP TABLE [dbo].[Employee]
GO
CREATE TABLE [dbo].[Employee] (
[e_id] int NOT NULL IDENTITY(1,1) ,
[e_code] varchar(50) NOT NULL ,
[e_name] varchar(50) NOT NULL ,
[e_sex] char(10) NOT NULL ,
[e_joinDate] datetime NOT NULL ,
[e_birthDate] datetime NULL ,
[e_address] varchar(50) NULL ,
[e_email] varchar(50) NOT NULL ,
[e_phone] varchar(50) NULL ,
[e_desc] varchar(50) NULL ,
[d_id] int NULL ,
[p_id] int NOT NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[Employee]', RESEED, 5)
GO

-- ----------------------------
-- Records of Employee
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Employee] ON
GO
INSERT INTO [dbo].[Employee] ([e_id], [e_code], [e_name], [e_sex], [e_joinDate], [e_birthDate], [e_address], [e_email], [e_phone], [e_desc], [d_id], [p_id]) VALUES (N'5', N'000000', N'名字', N'男        ', N'2015-10-14 00:54:12.000', N'2015-10-14 00:54:16.000', N'地址', N'邮箱', N'手机号码', N'描述', N'7', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO

-- ----------------------------
-- Table structure for file_detile
-- ----------------------------
DROP TABLE [dbo].[file_detile]
GO
CREATE TABLE [dbo].[file_detile] (
[fd_id] int NOT NULL IDENTITY(1,1) ,
[f_id] int NULL ,
[f_type] int NULL ,
[f_IsDelete] int NULL ,
[fd_parend] int NULL ,
[f_url] varchar(50) NULL ,
[fd_size] float(53) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[file_detile]', RESEED, 7)
GO

-- ----------------------------
-- Records of file_detile
-- ----------------------------
SET IDENTITY_INSERT [dbo].[file_detile] ON
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'1', N'1', N'6', N'0', N'0', N'wen1', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'2', N'2', N'1', N'0', N'1', N'wen1/123.txt', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'3', N'3', N'2', N'1', N'1', N'456.txt', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'4', N'4', N'6', N'0', N'0', N'wen2', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'5', N'5', N'3', N'0', N'4', N'文件2', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'6', N'6', N'6', N'0', N'4', N'文件夹3', N'0')
GO
GO
INSERT INTO [dbo].[file_detile] ([fd_id], [f_id], [f_type], [f_IsDelete], [fd_parend], [f_url], [fd_size]) VALUES (N'7', N'7', N'5', N'0', N'6', N'文件3', N'0')
GO
GO
SET IDENTITY_INSERT [dbo].[file_detile] OFF
GO

-- ----------------------------
-- Table structure for file_type
-- ----------------------------
DROP TABLE [dbo].[file_type]
GO
CREATE TABLE [dbo].[file_type] (
[ft_id] int NOT NULL IDENTITY(1,1) ,
[ft_name] varchar(50) NOT NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[file_type]', RESEED, 6)
GO

-- ----------------------------
-- Records of file_type
-- ----------------------------
SET IDENTITY_INSERT [dbo].[file_type] ON
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'1', N'txt')
GO
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'2', N'doc')
GO
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'3', N'ppt')
GO
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'4', N'rar')
GO
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'5', N'execl')
GO
GO
INSERT INTO [dbo].[file_type] ([ft_id], [ft_name]) VALUES (N'6', N'file')
GO
GO
SET IDENTITY_INSERT [dbo].[file_type] OFF
GO

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE [dbo].[files]
GO
CREATE TABLE [dbo].[files] (
[f_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NOT NULL ,
[f_createTime] datetime NULL ,
[f_name] varchar(50) NULL ,
[f_Isdept] int NULL ,
[d_id] int NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[files]', RESEED, 7)
GO

-- ----------------------------
-- Records of files
-- ----------------------------
SET IDENTITY_INSERT [dbo].[files] ON
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'1', N'1', N'2015-10-23 02:30:43.000', N'文件夹', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'2', N'1', N'2015-10-26 13:35:56.000', N'文件', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'3', N'1', N'2015-10-26 14:24:45.000', N'回收站文件', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'4', N'1', N'2015-10-26 15:35:10.000', N'文件夹2', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'5', N'1', N'2015-10-26 15:36:23.000', N'文件2', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'6', N'1', N'2015-10-26 15:38:21.000', N'文件夹3', N'0', N'7')
GO
GO
INSERT INTO [dbo].[files] ([f_id], [u_id], [f_createTime], [f_name], [f_Isdept], [d_id]) VALUES (N'7', N'1', N'2015-10-26 15:38:49.000', N'文件3', N'0', N'7')
GO
GO
SET IDENTITY_INSERT [dbo].[files] OFF
GO

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE [dbo].[leave]
GO
CREATE TABLE [dbo].[leave] (
[l_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NOT NULL ,
[l_startTime] datetime NULL ,
[l_endTime] datetime NULL ,
[l_dayCount] int NULL ,
[l_type] int NULL ,
[l_desc] varchar(50) NULL ,
[a_id ] int NULL 
)


GO

-- ----------------------------
-- Records of leave
-- ----------------------------
SET IDENTITY_INSERT [dbo].[leave] ON
GO
INSERT INTO [dbo].[leave] ([l_id], [u_id], [l_startTime], [l_endTime], [l_dayCount], [l_type], [l_desc], [a_id ]) VALUES (N'1', N'1', N'2015-10-23 02:28:43.000', N'2015-10-24 02:28:47.000', N'1', N'0', N'请假自己批准', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[leave] OFF
GO

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE [dbo].[note]
GO
CREATE TABLE [dbo].[note] (
[n_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NULL ,
[n_title] varchar(50) NULL ,
[n_content] varchar(50) NULL ,
[n_createTime] datetime NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[note]', RESEED, 20)
GO

-- ----------------------------
-- Records of note
-- ----------------------------
SET IDENTITY_INSERT [dbo].[note] ON
GO
INSERT INTO [dbo].[note] ([n_id], [u_id], [n_title], [n_content], [n_createTime]) VALUES (N'9', N'1', N'789', N'489', N'2015-10-25 21:36:49.937')
GO
GO
INSERT INTO [dbo].[note] ([n_id], [u_id], [n_title], [n_content], [n_createTime]) VALUES (N'16', N'1', N'12321', N'12321', N'2015-10-26 13:48:41.867')
GO
GO
INSERT INTO [dbo].[note] ([n_id], [u_id], [n_title], [n_content], [n_createTime]) VALUES (N'20', N'1', N'我去额为全额', N'我去饿我去', N'2015-10-27 12:12:20.577')
GO
GO
SET IDENTITY_INSERT [dbo].[note] OFF
GO

-- ----------------------------
-- Table structure for picketSeal
-- ----------------------------
DROP TABLE [dbo].[picketSeal]
GO
CREATE TABLE [dbo].[picketSeal] (
[ps_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NULL ,
[ps_cellphone] int NULL ,
[ps_phone] varchar(50) NULL ,
[ps_count] int NULL ,
[ps_desc] varchar(50) NULL ,
[a_id] int NULL 
)


GO

-- ----------------------------
-- Records of picketSeal
-- ----------------------------
SET IDENTITY_INSERT [dbo].[picketSeal] ON
GO
INSERT INTO [dbo].[picketSeal] ([ps_id], [u_id], [ps_cellphone], [ps_phone], [ps_count], [ps_desc], [a_id]) VALUES (N'1', N'1', N'123123', N'123456', N'5', N'测试名片', N'5')
GO
GO
SET IDENTITY_INSERT [dbo].[picketSeal] OFF
GO

-- ----------------------------
-- Table structure for Position
-- ----------------------------
DROP TABLE [dbo].[Position]
GO
CREATE TABLE [dbo].[Position] (
[p_id] int NOT NULL IDENTITY(1,1) ,
[p_name] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[Position]', RESEED, 5)
GO

-- ----------------------------
-- Records of Position
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Position] ON
GO
INSERT INTO [dbo].[Position] ([p_id], [p_name]) VALUES (N'1', N'系统管理员   ')
GO
GO
INSERT INTO [dbo].[Position] ([p_id], [p_name]) VALUES (N'2', N'人事专员')
GO
GO
INSERT INTO [dbo].[Position] ([p_id], [p_name]) VALUES (N'3', N'部门领导')
GO
GO
INSERT INTO [dbo].[Position] ([p_id], [p_name]) VALUES (N'4', N'公司领导')
GO
GO
INSERT INTO [dbo].[Position] ([p_id], [p_name]) VALUES (N'5', N'普通用户')
GO
GO
SET IDENTITY_INSERT [dbo].[Position] OFF
GO

-- ----------------------------
-- Table structure for proofOfearnings
-- ----------------------------
DROP TABLE [dbo].[proofOfearnings]
GO
CREATE TABLE [dbo].[proofOfearnings] (
[poe_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NULL ,
[u_desc] varchar(50) NULL ,
[a_id] int NULL 
)


GO

-- ----------------------------
-- Records of proofOfearnings
-- ----------------------------
SET IDENTITY_INSERT [dbo].[proofOfearnings] ON
GO
SET IDENTITY_INSERT [dbo].[proofOfearnings] OFF
GO

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE [dbo].[schedule]
GO
CREATE TABLE [dbo].[schedule] (
[s_id] int NOT NULL IDENTITY(1,1) ,
[s_startTime] datetime NULL ,
[s_endTime] datetime NULL ,
[s_place] varchar(50) NULL ,
[s_title] varchar(50) NULL ,
[s_create_uid] int NULL ,
[s_IsShare] int NULL ,
[s_Isdept] int NULL ,
[s_content] varchar(50) NULL 
)


GO

-- ----------------------------
-- Records of schedule
-- ----------------------------
SET IDENTITY_INSERT [dbo].[schedule] ON
GO
INSERT INTO [dbo].[schedule] ([s_id], [s_startTime], [s_endTime], [s_place], [s_title], [s_create_uid], [s_IsShare], [s_Isdept], [s_content]) VALUES (N'1', N'2015-10-23 02:27:16.000', N'2015-10-24 02:27:20.000', N'办公室1', N'日程表开会', N'1', N'1', N'0', N'开会开会开会内容')
GO
GO
SET IDENTITY_INSERT [dbo].[schedule] OFF
GO

-- ----------------------------
-- Table structure for schedule_with
-- ----------------------------
DROP TABLE [dbo].[schedule_with]
GO
CREATE TABLE [dbo].[schedule_with] (
[sw_id] int NOT NULL IDENTITY(1,1) ,
[s_id] int NULL ,
[s_with_uid] int NULL 
)


GO

-- ----------------------------
-- Records of schedule_with
-- ----------------------------
SET IDENTITY_INSERT [dbo].[schedule_with] ON
GO
INSERT INTO [dbo].[schedule_with] ([sw_id], [s_id], [s_with_uid]) VALUES (N'1', N'1', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[schedule_with] OFF
GO

-- ----------------------------
-- Table structure for seal
-- ----------------------------
DROP TABLE [dbo].[seal]
GO
CREATE TABLE [dbo].[seal] (
[s_id] int NOT NULL IDENTITY(1,1) ,
[s_createTime] datetime NULL ,
[st_id] int NULL ,
[u_id] int NULL ,
[s_desc] varchar(50) NULL ,
[a_id] int NULL 
)


GO

-- ----------------------------
-- Records of seal
-- ----------------------------
SET IDENTITY_INSERT [dbo].[seal] ON
GO
INSERT INTO [dbo].[seal] ([s_id], [s_createTime], [st_id], [u_id], [s_desc], [a_id]) VALUES (N'1', N'2015-10-27 00:26:06.000', N'1', N'1', N'测试用章', N'4')
GO
GO
SET IDENTITY_INSERT [dbo].[seal] OFF
GO

-- ----------------------------
-- Table structure for sealtype
-- ----------------------------
DROP TABLE [dbo].[sealtype]
GO
CREATE TABLE [dbo].[sealtype] (
[st_id] int NOT NULL IDENTITY(1,1) ,
[st_name] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[sealtype]', RESEED, 3)
GO

-- ----------------------------
-- Records of sealtype
-- ----------------------------
SET IDENTITY_INSERT [dbo].[sealtype] ON
GO
INSERT INTO [dbo].[sealtype] ([st_id], [st_name]) VALUES (N'1', N'公司用章')
GO
GO
INSERT INTO [dbo].[sealtype] ([st_id], [st_name]) VALUES (N'2', N'财务用章')
GO
GO
INSERT INTO [dbo].[sealtype] ([st_id], [st_name]) VALUES (N'3', N'人事用章')
GO
GO
SET IDENTITY_INSERT [dbo].[sealtype] OFF
GO

-- ----------------------------
-- Table structure for Travel
-- ----------------------------
DROP TABLE [dbo].[Travel]
GO
CREATE TABLE [dbo].[Travel] (
[t_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NULL ,
[t_startTime] datetime NULL ,
[t_endTime] datetime NULL ,
[t_place] varchar(50) NULL ,
[t_desc] varchar(50) NULL ,
[t_task] varchar(50) NULL ,
[t_lornmoney] float(53) NULL ,
[a_id] int NULL 
)


GO

-- ----------------------------
-- Records of Travel
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Travel] ON
GO
SET IDENTITY_INSERT [dbo].[Travel] OFF
GO

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE [dbo].[Users]
GO
CREATE TABLE [dbo].[Users] (
[u_id] int NOT NULL IDENTITY(1,1) ,
[u_name] varchar(50) NULL ,
[u_pwd] varchar(50) NULL ,
[e_id] int NULL ,
[u_state] int NULL ,
[u_picUrl] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[Users]', RESEED, 1001)
GO

-- ----------------------------
-- Records of Users
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Users] ON
GO
INSERT INTO [dbo].[Users] ([u_id], [u_name], [u_pwd], [e_id], [u_state], [u_picUrl]) VALUES (N'1', N'123', N'123', N'5', N'0', null)
GO
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO

-- ----------------------------
-- Table structure for webManger
-- ----------------------------
DROP TABLE [dbo].[webManger]
GO
CREATE TABLE [dbo].[webManger] (
[w_id] int NOT NULL IDENTITY(1,1) ,
[u_id] int NULL ,
[w_name] varchar(50) NULL ,
[w_address] varchar(50) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[webManger]', RESEED, 13)
GO

-- ----------------------------
-- Records of webManger
-- ----------------------------
SET IDENTITY_INSERT [dbo].[webManger] ON
GO
INSERT INTO [dbo].[webManger] ([w_id], [u_id], [w_name], [w_address]) VALUES (N'13', N'1', N'百度', N'www.baidu.com')
GO
GO
SET IDENTITY_INSERT [dbo].[webManger] OFF
GO

-- ----------------------------
-- Indexes structure for table announcement
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table announcement
-- ----------------------------
ALTER TABLE [dbo].[announcement] ADD PRIMARY KEY ([an_id])
GO

-- ----------------------------
-- Indexes structure for table approve
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table approve
-- ----------------------------
ALTER TABLE [dbo].[approve] ADD PRIMARY KEY ([a_id])
GO

-- ----------------------------
-- Indexes structure for table approveresults
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table approveresults
-- ----------------------------
ALTER TABLE [dbo].[approveresults] ADD PRIMARY KEY ([ar_id])
GO

-- ----------------------------
-- Indexes structure for table approveType
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table approveType
-- ----------------------------
ALTER TABLE [dbo].[approveType] ADD PRIMARY KEY ([at_id])
GO

-- ----------------------------
-- Indexes structure for table boardroom
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table boardroom
-- ----------------------------
ALTER TABLE [dbo].[boardroom] ADD PRIMARY KEY ([b_id])
GO

-- ----------------------------
-- Indexes structure for table boardroomManger
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table boardroomManger
-- ----------------------------
ALTER TABLE [dbo].[boardroomManger] ADD PRIMARY KEY ([bd_id])
GO

-- ----------------------------
-- Indexes structure for table boardroomType
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table boardroomType
-- ----------------------------
ALTER TABLE [dbo].[boardroomType] ADD PRIMARY KEY ([bdt_id])
GO

-- ----------------------------
-- Indexes structure for table car
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table car
-- ----------------------------
ALTER TABLE [dbo].[car] ADD PRIMARY KEY ([c_id])
GO

-- ----------------------------
-- Indexes structure for table carManger
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table carManger
-- ----------------------------
ALTER TABLE [dbo].[carManger] ADD PRIMARY KEY ([cm_id])
GO

-- ----------------------------
-- Indexes structure for table carOrUsers
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table carOrUsers
-- ----------------------------
ALTER TABLE [dbo].[carOrUsers] ADD PRIMARY KEY ([cou_id])
GO

-- ----------------------------
-- Indexes structure for table Dept
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Dept
-- ----------------------------
ALTER TABLE [dbo].[Dept] ADD PRIMARY KEY ([d_id])
GO

-- ----------------------------
-- Indexes structure for table Employee
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Employee
-- ----------------------------
ALTER TABLE [dbo].[Employee] ADD PRIMARY KEY ([e_id])
GO

-- ----------------------------
-- Indexes structure for table file_detile
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table file_detile
-- ----------------------------
ALTER TABLE [dbo].[file_detile] ADD PRIMARY KEY ([fd_id])
GO

-- ----------------------------
-- Indexes structure for table file_type
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table file_type
-- ----------------------------
ALTER TABLE [dbo].[file_type] ADD PRIMARY KEY ([ft_id])
GO

-- ----------------------------
-- Indexes structure for table files
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table files
-- ----------------------------
ALTER TABLE [dbo].[files] ADD PRIMARY KEY ([f_id])
GO

-- ----------------------------
-- Indexes structure for table leave
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table leave
-- ----------------------------
ALTER TABLE [dbo].[leave] ADD PRIMARY KEY ([l_id])
GO

-- ----------------------------
-- Indexes structure for table note
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table note
-- ----------------------------
ALTER TABLE [dbo].[note] ADD PRIMARY KEY ([n_id])
GO

-- ----------------------------
-- Indexes structure for table picketSeal
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table picketSeal
-- ----------------------------
ALTER TABLE [dbo].[picketSeal] ADD PRIMARY KEY ([ps_id])
GO

-- ----------------------------
-- Indexes structure for table Position
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Position
-- ----------------------------
ALTER TABLE [dbo].[Position] ADD PRIMARY KEY ([p_id])
GO

-- ----------------------------
-- Indexes structure for table proofOfearnings
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table proofOfearnings
-- ----------------------------
ALTER TABLE [dbo].[proofOfearnings] ADD PRIMARY KEY ([poe_id])
GO

-- ----------------------------
-- Indexes structure for table schedule
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table schedule
-- ----------------------------
ALTER TABLE [dbo].[schedule] ADD PRIMARY KEY ([s_id])
GO

-- ----------------------------
-- Indexes structure for table schedule_with
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table schedule_with
-- ----------------------------
ALTER TABLE [dbo].[schedule_with] ADD PRIMARY KEY ([sw_id])
GO

-- ----------------------------
-- Indexes structure for table seal
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table seal
-- ----------------------------
ALTER TABLE [dbo].[seal] ADD PRIMARY KEY ([s_id])
GO

-- ----------------------------
-- Indexes structure for table sealtype
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table sealtype
-- ----------------------------
ALTER TABLE [dbo].[sealtype] ADD PRIMARY KEY ([st_id])
GO

-- ----------------------------
-- Indexes structure for table Travel
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Travel
-- ----------------------------
ALTER TABLE [dbo].[Travel] ADD PRIMARY KEY ([t_id])
GO

-- ----------------------------
-- Indexes structure for table Users
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE [dbo].[Users] ADD PRIMARY KEY ([u_id])
GO

-- ----------------------------
-- Indexes structure for table webManger
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table webManger
-- ----------------------------
ALTER TABLE [dbo].[webManger] ADD PRIMARY KEY ([w_id])
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[announcement]
-- ----------------------------
ALTER TABLE [dbo].[announcement] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[approve]
-- ----------------------------
ALTER TABLE [dbo].[approve] ADD FOREIGN KEY ([a_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[approve] ADD FOREIGN KEY ([ar_id]) REFERENCES [dbo].[approveresults] ([ar_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[approve] ADD FOREIGN KEY ([at_id]) REFERENCES [dbo].[approveType] ([at_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[boardroomManger]
-- ----------------------------
ALTER TABLE [dbo].[boardroomManger] ADD FOREIGN KEY ([b_id]) REFERENCES [dbo].[boardroom] ([b_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[boardroomManger] ADD FOREIGN KEY ([bdt_id]) REFERENCES [dbo].[boardroomType] ([bdt_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[boardroomManger] ADD FOREIGN KEY ([bd_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[boardroomManger] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[carManger]
-- ----------------------------
ALTER TABLE [dbo].[carManger] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[carManger] ADD FOREIGN KEY ([c_id]) REFERENCES [dbo].[car] ([c_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[carManger] ADD FOREIGN KEY ([create_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[carOrUsers]
-- ----------------------------
ALTER TABLE [dbo].[carOrUsers] ADD FOREIGN KEY ([cm_id]) REFERENCES [dbo].[carManger] ([cm_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[carOrUsers] ADD FOREIGN KEY ([cmt_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[Employee]
-- ----------------------------
ALTER TABLE [dbo].[Employee] ADD FOREIGN KEY ([d_id]) REFERENCES [dbo].[Dept] ([d_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[Employee] ADD FOREIGN KEY ([p_id]) REFERENCES [dbo].[Position] ([p_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[file_detile]
-- ----------------------------
ALTER TABLE [dbo].[file_detile] ADD FOREIGN KEY ([f_type]) REFERENCES [dbo].[file_type] ([ft_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[file_detile] ADD FOREIGN KEY ([f_id]) REFERENCES [dbo].[files] ([f_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[files]
-- ----------------------------
ALTER TABLE [dbo].[files] ADD FOREIGN KEY ([d_id]) REFERENCES [dbo].[Dept] ([d_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[files] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[leave]
-- ----------------------------
ALTER TABLE [dbo].[leave] ADD FOREIGN KEY ([a_id ]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[leave] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[note]
-- ----------------------------
ALTER TABLE [dbo].[note] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[picketSeal]
-- ----------------------------
ALTER TABLE [dbo].[picketSeal] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[picketSeal] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[proofOfearnings]
-- ----------------------------
ALTER TABLE [dbo].[proofOfearnings] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[proofOfearnings] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[schedule]
-- ----------------------------
ALTER TABLE [dbo].[schedule] ADD FOREIGN KEY ([s_create_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[schedule_with]
-- ----------------------------
ALTER TABLE [dbo].[schedule_with] ADD FOREIGN KEY ([s_id]) REFERENCES [dbo].[schedule] ([s_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[schedule_with] ADD FOREIGN KEY ([s_with_uid]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[seal]
-- ----------------------------
ALTER TABLE [dbo].[seal] ADD FOREIGN KEY ([st_id]) REFERENCES [dbo].[sealtype] ([st_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[seal] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[seal] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[Travel]
-- ----------------------------
ALTER TABLE [dbo].[Travel] ADD FOREIGN KEY ([a_id]) REFERENCES [dbo].[approve] ([a_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
ALTER TABLE [dbo].[Travel] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[Users]
-- ----------------------------
ALTER TABLE [dbo].[Users] ADD FOREIGN KEY ([e_id]) REFERENCES [dbo].[Employee] ([e_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[webManger]
-- ----------------------------
ALTER TABLE [dbo].[webManger] ADD FOREIGN KEY ([u_id]) REFERENCES [dbo].[Users] ([u_id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
