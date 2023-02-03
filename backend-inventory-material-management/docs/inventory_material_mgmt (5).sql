-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2021 at 07:22 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_material_mgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Inward_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Per_Unit_Price` float(10,2) NOT NULL,
  `Sub_Total` float(10,2) NOT NULL,
  `TAX_Percentage` float(10,2) NOT NULL,
  `TAX_Value` float(10,2) NOT NULL,
  `Total_Price` float(10,2) NOT NULL,
  `Barcode` varchar(50) DEFAULT NULL,
  `Manufacturer` varchar(50) DEFAULT NULL,
  `Serial_Number` varchar(50) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `AMC_Expiry` datetime DEFAULT NULL,
  `AMC_Vendor` varchar(50) DEFAULT NULL,
  `Product_Expiry` datetime DEFAULT NULL,
  `Status` enum('Unassigned','Assigned','Repair','Scarp','Lost','Return') NOT NULL DEFAULT 'Unassigned',
  `Current_Location` int(11) DEFAULT NULL,
  `Current_Department` varchar(50) DEFAULT NULL,
  `Current_Cost_Center` varchar(50) DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`ID`, `Product_ID`, `Inward_ID`, `Quantity`, `Per_Unit_Price`, `Sub_Total`, `TAX_Percentage`, `TAX_Value`, `Total_Price`, `Barcode`, `Manufacturer`, `Serial_Number`, `Model`, `AMC_Expiry`, `AMC_Vendor`, `Product_Expiry`, `Status`, `Current_Location`, `Current_Department`, `Current_Cost_Center`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 697, 1, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100001', 'Boult', '2020', 'BK1', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Assigned', 3, 'Mumbai', 'Narhe', '2021-09-09 06:55:28', '2021-09-23 16:10:26', NULL),
(2, 697, 1, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100002', 'MI', '2021', 'BK2', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(3, 700, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Assigned', 3, 'Mumbai', 'Narhe', '2021-09-09 06:55:28', '2021-09-23 16:10:26', NULL),
(4, 700, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(5, 700, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(6, 700, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(7, 701, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Assigned', 3, 'Mumbai', 'Narhe', '2021-09-09 06:55:28', '2021-09-23 16:10:27', NULL),
(8, 701, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, 'Mumbai', 'Narhe', '2021-09-09 06:55:28', '2021-09-09 06:57:57', NULL),
(9, 701, 1, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(10, 702, 1, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100003', 'paper', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, 'Mumbai', '100001', '2021-09-09 06:55:28', '2021-10-02 05:04:01', NULL),
(11, 697, 2, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100004', 'Boult', '2020', 'BK1', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(12, 697, 2, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100005', 'MI', '2021', 'BK2', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(13, 700, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(14, 700, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(15, 700, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(16, 700, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(17, 701, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(18, 701, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(19, 701, 2, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(20, 702, 2, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100006', 'paper', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(21, 697, 3, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100007', 'Boult', '2020', 'BK1', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(22, 697, 3, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100008', 'MI', '2021', 'BK2', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(23, 700, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(24, 700, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(25, 700, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(26, 700, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(27, 701, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(28, 701, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(29, 701, 3, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(30, 702, 3, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100009', 'paper', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(31, 697, 4, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100010', 'Boult', '2020', 'BK1', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(32, 697, 4, 1, 77.00, 77.00, 67.00, 51.59, 128.59, '100011', 'MI', '2021', 'BK2', '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(33, 700, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(34, 700, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(35, 700, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(36, 700, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'N95', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(37, 701, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(38, 701, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(39, 701, 4, 1, 45.90, 45.90, 45.88, 21.06, 66.96, NULL, 'classmate', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(40, 702, 4, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100012', 'paper', '1991', NULL, '2021-09-15 00:00:00', 'Sumit', '2021-10-11 00:00:00', 'Unassigned', 1, NULL, NULL, '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(41, 704, 5, 1, 567.00, 567.00, 56.00, 317.52, 884.52, '100013', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 6, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(42, 704, 5, 1, 567.00, 567.00, 56.00, 317.52, 884.52, '100014', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 6, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(43, 704, 5, 1, 567.00, 567.00, 56.00, 317.52, 884.52, '100015', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 3, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 16:39:03', NULL),
(44, 715, 5, 1, 45.90, 45.90, 45.88, 21.06, 66.96, '100016', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 6, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(45, 715, 5, 1, 45.90, 45.90, 45.88, 21.06, 66.96, '100017', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 6, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(46, 715, 5, 1, 45.90, 45.90, 45.88, 21.06, 66.96, '100018', NULL, NULL, NULL, NULL, NULL, NULL, 'Assigned', 6, 'Mumbai', '100003', '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(47, 715, 5, 1, 45.90, 45.90, 45.88, 21.06, 66.96, '100019', NULL, NULL, NULL, NULL, NULL, NULL, 'Unassigned', 1, NULL, NULL, '2021-09-29 13:28:23', '2021-09-29 13:28:23', NULL),
(48, 702, 6, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100020', NULL, NULL, NULL, NULL, NULL, NULL, 'Unassigned', 1, NULL, NULL, '2021-10-01 17:32:55', '2021-10-01 17:32:55', NULL),
(49, 702, 7, 1, 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '100021', NULL, NULL, NULL, NULL, NULL, NULL, 'Unassigned', 1, NULL, NULL, '2021-10-02 05:01:06', '2021-10-02 05:01:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `asset_transactions`
--

CREATE TABLE `asset_transactions` (
  `ID` int(11) NOT NULL,
  `Dispatch_ID` int(11) NOT NULL,
  `Asset_ID` int(11) NOT NULL,
  `Dated_On` datetime NOT NULL,
  `Location_From` int(11) NOT NULL,
  `Location_From_Department` varchar(50) DEFAULT NULL,
  `Location_From_Cost_Center` varchar(50) DEFAULT NULL,
  `Location_To` int(11) NOT NULL,
  `Location_To_Department` varchar(50) NOT NULL,
  `Location_To_Cost_Center` varchar(50) DEFAULT NULL,
  `Type_Of_Issue` enum('Dept To Dept','Office Transfer','Repair','Scrap','Return') NOT NULL DEFAULT 'Dept To Dept',
  `Collected_By` varchar(50) NOT NULL,
  `Mode_Of_Transport` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `UOM` varchar(20) NOT NULL,
  `Remark` varchar(50) NOT NULL,
  `User_Name` varchar(50) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `asset_transactions`
--

INSERT INTO `asset_transactions` (`ID`, `Dispatch_ID`, `Asset_ID`, `Dated_On`, `Location_From`, `Location_From_Department`, `Location_From_Cost_Center`, `Location_To`, `Location_To_Department`, `Location_To_Cost_Center`, `Type_Of_Issue`, `Collected_By`, `Mode_Of_Transport`, `Quantity`, `UOM`, `Remark`, `User_Name`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(6, 2, 1, '2020-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 09:40:22', '2021-08-25 09:40:22', NULL),
(7, 2, 2, '2020-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 09:40:22', '2021-08-25 09:40:22', NULL),
(8, 2, 3, '2020-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 09:40:23', '2021-08-25 09:40:23', NULL),
(9, 2, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 09:40:23', '2021-08-25 09:40:23', NULL),
(10, 2, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 09:40:23', '2021-08-25 09:40:23', NULL),
(11, 3, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:23:53', '2021-08-25 13:23:53', NULL),
(12, 3, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:23:53', '2021-08-25 13:23:53', NULL),
(13, 3, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:23:54', '2021-08-25 13:23:54', NULL),
(14, 3, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:23:54', '2021-08-25 13:23:54', NULL),
(15, 3, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:23:54', '2021-08-25 13:23:54', NULL),
(16, 5, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:35:35', '2021-08-25 13:35:35', NULL),
(17, 5, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:35:35', '2021-08-25 13:35:35', NULL),
(18, 5, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:35:35', '2021-08-25 13:35:35', NULL),
(19, 5, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:35:36', '2021-08-25 13:35:36', NULL),
(20, 5, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-25 13:35:36', '2021-08-25 13:35:36', NULL),
(21, 7, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-30 12:59:48', '2021-08-30 12:59:48', NULL),
(22, 7, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-30 12:59:49', '2021-08-30 12:59:49', NULL),
(23, 7, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-30 12:59:49', '2021-08-30 12:59:49', NULL),
(24, 7, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 12:59:49', '2021-08-30 12:59:49', NULL),
(25, 7, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 12:59:49', '2021-08-30 12:59:49', NULL),
(26, 9, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:05:23', '2021-08-30 13:05:23', NULL),
(27, 9, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:05:23', '2021-08-30 13:05:23', NULL),
(28, 9, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:05:23', '2021-08-30 13:05:23', NULL),
(29, 9, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:05:23', '2021-08-30 13:05:23', NULL),
(30, 9, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:05:23', '2021-08-30 13:05:23', NULL),
(31, 10, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:06:00', '2021-08-30 13:06:00', NULL),
(32, 10, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:06:00', '2021-08-30 13:06:00', NULL),
(33, 10, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-08-30 13:06:01', '2021-08-30 13:06:01', NULL),
(34, 10, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-30 13:06:01', '2021-08-30 13:06:01', NULL),
(35, 10, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-08-30 13:06:01', '2021-08-30 13:06:01', NULL),
(36, 11, 39, '2021-08-04 00:00:00', 1, NULL, NULL, 2, 'Nagpur', '00001', 'Office Transfer', 'Haresh', 'Online', 1, 'Box', '', 'Haresh', '2021-08-30 16:26:10', '2021-08-30 16:26:10', NULL),
(37, 13, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-01 05:52:32', '2021-09-01 05:52:32', NULL),
(38, 13, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-01 05:52:33', '2021-09-01 05:52:33', NULL),
(39, 13, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-01 05:52:33', '2021-09-01 05:52:33', NULL),
(40, 13, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-01 05:52:33', '2021-09-01 05:52:33', NULL),
(41, 13, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-01 05:52:33', '2021-09-01 05:52:33', NULL),
(42, 14, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(43, 14, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(44, 14, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(45, 14, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(46, 14, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Sumit', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(47, 15, 4, '2021-09-04 00:00:00', 1, NULL, 'Narhe', 2, 'Mumbai', '100001', 'Office Transfer', 'Haresh', 'Online', 1, 'Pkt', 'abc1', 'Sumit', '2021-09-01 12:03:53', '2021-09-01 12:03:53', NULL),
(48, 15, 39, '2021-09-04 00:00:00', 1, NULL, '00001', 2, 'Mumbai', '100001', 'Office Transfer', 'Haresh', 'Online', 1, 'Box', 'xyz2', 'Haresh', '2021-09-01 12:03:53', '2021-09-01 12:03:53', NULL),
(49, 16, 1, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-03 14:03:37', '2021-09-03 14:03:37', NULL),
(50, 16, 2, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-03 14:03:37', '2021-09-03 14:03:37', NULL),
(51, 16, 3, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-03 14:03:38', '2021-09-03 14:03:38', NULL),
(52, 16, 6, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-03 14:03:38', '2021-09-03 14:03:38', NULL),
(53, 16, 7, '2021-08-05 00:00:00', 1, NULL, 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-03 14:03:38', '2021-09-03 14:03:38', NULL),
(54, 17, 39, '2021-09-05 00:00:00', 1, NULL, '100001', 2, 'Mumbai', '100001', 'Office Transfer', 'k k r', 'Road', 1, 'Box', '', 'Haresh', '2021-09-04 11:32:09', '2021-09-04 11:32:09', NULL),
(56, 21, 1014, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:25', '2021-09-05 11:51:25', NULL),
(57, 21, 9, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:25', '2021-09-05 11:51:25', NULL),
(58, 21, 10, '2021-08-05 00:00:00', 1, NULL, 'Mumbai', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:26', '2021-09-05 11:51:26', NULL),
(59, 21, 13, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:26', '2021-09-05 11:51:26', NULL),
(60, 21, 1037, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:26', '2021-09-05 11:51:26', NULL),
(61, 21, 1038, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-05 11:51:26', '2021-09-05 11:51:26', NULL),
(82, 40, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(83, 40, 18, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(84, 40, 19, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(85, 40, 34, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(86, 40, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(87, 40, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(88, 41, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:01', '2021-09-06 05:16:01', NULL),
(89, 41, 23, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:01', '2021-09-06 05:16:01', NULL),
(90, 41, 24, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:01', '2021-09-06 05:16:01', NULL),
(91, 41, 45, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:01', '2021-09-06 05:16:01', NULL),
(92, 41, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:02', '2021-09-06 05:16:02', NULL),
(93, 41, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:16:02', '2021-09-06 05:16:02', NULL),
(94, 42, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:01', '2021-09-06 05:18:01', NULL),
(95, 42, 25, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:01', '2021-09-06 05:18:01', NULL),
(96, 42, 26, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:01', '2021-09-06 05:18:01', NULL),
(97, 42, 104, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:02', '2021-09-06 05:18:02', NULL),
(98, 42, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:02', '2021-09-06 05:18:02', NULL),
(99, 42, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:18:02', '2021-09-06 05:18:02', NULL),
(100, 43, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:43', '2021-09-06 05:23:43', NULL),
(101, 43, 30, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:43', '2021-09-06 05:23:43', NULL),
(102, 43, 31, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:43', '2021-09-06 05:23:43', NULL),
(103, 43, 111, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:43', '2021-09-06 05:23:43', NULL),
(104, 43, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:43', '2021-09-06 05:23:43', NULL),
(105, 43, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:23:44', '2021-09-06 05:23:44', NULL),
(106, 45, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(107, 45, 32, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(108, 45, 33, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(109, 45, 104, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(110, 45, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(111, 45, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:42:09', '2021-09-06 05:42:09', NULL),
(112, 46, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:02', '2021-09-06 05:55:02', NULL),
(113, 46, 41, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:02', '2021-09-06 05:55:02', NULL),
(114, 46, 42, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:02', '2021-09-06 05:55:02', NULL),
(115, 46, 111, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:02', '2021-09-06 05:55:02', NULL),
(116, 46, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:03', '2021-09-06 05:55:03', NULL),
(117, 46, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:55:03', '2021-09-06 05:55:03', NULL),
(118, 47, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:36', '2021-09-06 05:57:36', NULL),
(119, 47, 43, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:36', '2021-09-06 05:57:36', NULL),
(120, 47, 44, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:36', '2021-09-06 05:57:36', NULL),
(121, 47, 959, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:37', '2021-09-06 05:57:37', NULL),
(122, 47, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:37', '2021-09-06 05:57:37', NULL),
(123, 47, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 05:57:37', '2021-09-06 05:57:37', NULL),
(124, 48, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:00:59', '2021-09-06 06:00:59', NULL),
(125, 48, 100, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:00:59', '2021-09-06 06:00:59', NULL),
(126, 48, 101, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:00:59', '2021-09-06 06:00:59', NULL),
(127, 48, 960, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:00:59', '2021-09-06 06:00:59', NULL),
(128, 48, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:01:00', '2021-09-06 06:01:00', NULL),
(129, 48, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:01:00', '2021-09-06 06:01:00', NULL),
(130, 50, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:06', '2021-09-06 06:15:06', NULL),
(131, 50, 102, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:06', '2021-09-06 06:15:06', NULL),
(132, 50, 103, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:06', '2021-09-06 06:15:06', NULL),
(133, 50, 961, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:06', '2021-09-06 06:15:06', NULL),
(134, 50, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:06', '2021-09-06 06:15:06', NULL),
(135, 50, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:15:07', '2021-09-06 06:15:07', NULL),
(136, 51, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:38', '2021-09-06 06:17:38', NULL),
(137, 51, 107, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:38', '2021-09-06 06:17:38', NULL),
(138, 51, 108, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:38', '2021-09-06 06:17:38', NULL),
(139, 51, 962, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:38', '2021-09-06 06:17:38', NULL),
(140, 51, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:38', '2021-09-06 06:17:38', NULL),
(141, 51, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:17:39', '2021-09-06 06:17:39', NULL),
(158, 58, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:40', '2021-09-06 06:45:40', NULL),
(159, 58, 1023, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:40', '2021-09-06 06:45:40', NULL),
(160, 58, 1024, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:40', '2021-09-06 06:45:40', NULL),
(161, 58, 964, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:41', '2021-09-06 06:45:41', NULL),
(162, 58, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:41', '2021-09-06 06:45:41', NULL),
(163, 58, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 06:45:41', '2021-09-06 06:45:41', NULL),
(164, 59, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:00:15', '2021-09-06 07:00:15', NULL),
(165, 59, 1025, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:00:15', '2021-09-06 07:00:15', NULL),
(166, 59, 1026, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:00:15', '2021-09-06 07:00:15', NULL),
(167, 59, 965, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:01:06', '2021-09-06 07:01:06', NULL),
(168, 59, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:01:57', '2021-09-06 07:01:57', NULL),
(169, 59, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:02:48', '2021-09-06 07:02:48', NULL),
(170, 60, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(171, 60, 9, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(172, 60, 10, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(173, 60, 13, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(174, 60, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(175, 60, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(176, 61, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:13:16', '2021-09-06 07:13:16', NULL),
(177, 61, 11, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:13:17', '2021-09-06 07:13:17', NULL),
(178, 61, 12, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:13:17', '2021-09-06 07:13:17', NULL),
(179, 61, 20, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:14:08', '2021-09-06 07:14:08', NULL),
(180, 61, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:15:00', '2021-09-06 07:15:00', NULL),
(181, 61, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:15:51', '2021-09-06 07:15:51', NULL),
(182, 62, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:21', '2021-09-06 07:19:21', NULL),
(183, 62, 16, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:22', '2021-09-06 07:19:22', NULL),
(184, 62, 17, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:23', '2021-09-06 07:19:23', NULL),
(185, 62, 27, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:23', '2021-09-06 07:19:23', NULL),
(186, 62, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:23', '2021-09-06 07:19:23', NULL),
(187, 62, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:19:23', '2021-09-06 07:19:23', NULL),
(188, 63, 1014, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:16', '2021-09-06 07:27:16', NULL),
(189, 63, 18, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:16', '2021-09-06 07:27:16', NULL),
(190, 63, 19, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:17', '2021-09-06 07:27:17', NULL),
(191, 63, 34, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:17', '2021-09-06 07:27:17', NULL),
(192, 63, 1037, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:17', '2021-09-06 07:27:17', NULL),
(193, 63, 1038, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 07:27:17', '2021-09-06 07:27:17', NULL),
(206, 75, 1465, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:38', '2021-09-06 12:47:38', NULL),
(207, 75, 1466, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:38', '2021-09-06 12:47:38', NULL),
(208, 75, 25, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:38', '2021-09-06 12:47:38', NULL),
(209, 75, 26, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:39', '2021-09-06 12:47:39', NULL),
(210, 75, 1471, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:39', '2021-09-06 12:47:39', NULL),
(211, 75, 1474, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:47:39', '2021-09-06 12:47:39', NULL),
(214, 78, 1465, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:04', '2021-09-06 12:57:04', NULL),
(215, 78, 1466, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:04', '2021-09-06 12:57:04', NULL),
(216, 78, 30, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:04', '2021-09-06 12:57:04', NULL),
(217, 78, 31, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:05', '2021-09-06 12:57:05', NULL),
(218, 78, 1471, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:06', '2021-09-06 12:57:06', NULL),
(219, 78, 1474, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 12:57:06', '2021-09-06 12:57:06', NULL),
(220, 79, 1465, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:15', '2021-09-06 13:01:15', NULL),
(221, 79, 1466, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:15', '2021-09-06 13:01:15', NULL),
(222, 79, 32, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:15', '2021-09-06 13:01:15', NULL),
(223, 79, 33, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:15', '2021-09-06 13:01:15', NULL),
(224, 79, 1471, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:15', '2021-09-06 13:01:15', NULL),
(225, 79, 1474, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:01:16', '2021-09-06 13:01:16', NULL),
(226, 80, 1465, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:22', '2021-09-06 13:07:22', NULL),
(227, 80, 1466, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:22', '2021-09-06 13:07:22', NULL),
(228, 80, 1467, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:22', '2021-09-06 13:07:22', NULL),
(229, 80, 1468, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:22', '2021-09-06 13:07:22', NULL),
(230, 80, 1471, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:23', '2021-09-06 13:07:23', NULL),
(231, 80, 1474, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:07:23', '2021-09-06 13:07:23', NULL),
(232, 81, 1465, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:17', '2021-09-06 13:11:17', NULL),
(233, 81, 1466, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:17', '2021-09-06 13:11:17', NULL),
(234, 81, 1467, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:17', '2021-09-06 13:11:17', NULL),
(235, 81, 1468, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:18', '2021-09-06 13:11:18', NULL),
(236, 81, 1471, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:18', '2021-09-06 13:11:18', NULL),
(237, 81, 1474, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 13:11:18', '2021-09-06 13:11:18', NULL),
(251, 90, 1515, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:30', '2021-09-06 14:08:30', NULL),
(252, 90, 1516, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:30', '2021-09-06 14:08:30', NULL),
(253, 90, 1517, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:31', '2021-09-06 14:08:31', NULL),
(254, 90, 1518, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:31', '2021-09-06 14:08:31', NULL),
(255, 90, 1521, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:31', '2021-09-06 14:08:31', NULL),
(256, 90, 1524, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:08:32', '2021-09-06 14:08:32', NULL),
(259, 92, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:31', '2021-09-06 14:38:31', NULL),
(260, 92, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:31', '2021-09-06 14:38:31', NULL),
(261, 92, 1537, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:32', '2021-09-06 14:38:32', NULL),
(262, 92, 1538, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:32', '2021-09-06 14:38:32', NULL),
(263, 92, 1541, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:32', '2021-09-06 14:38:32', NULL),
(264, 92, 1544, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:38:32', '2021-09-06 14:38:32', NULL),
(265, 93, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:24', '2021-09-06 14:41:24', NULL),
(266, 93, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:24', '2021-09-06 14:41:24', NULL),
(267, 93, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:24', '2021-09-06 14:41:24', NULL),
(268, 93, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:24', '2021-09-06 14:41:24', NULL),
(269, 93, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:25', '2021-09-06 14:41:25', NULL),
(270, 93, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:41:25', '2021-09-06 14:41:25', NULL),
(271, 94, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:00', '2021-09-06 14:46:00', NULL),
(272, 94, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:01', '2021-09-06 14:46:01', NULL),
(273, 94, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:01', '2021-09-06 14:46:01', NULL),
(274, 94, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:01', '2021-09-06 14:46:01', NULL),
(275, 94, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:01', '2021-09-06 14:46:01', NULL),
(276, 94, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:46:01', '2021-09-06 14:46:01', NULL),
(277, 95, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:56', '2021-09-06 14:49:56', NULL),
(278, 95, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:56', '2021-09-06 14:49:56', NULL),
(279, 95, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:56', '2021-09-06 14:49:56', NULL),
(280, 95, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:56', '2021-09-06 14:49:56', NULL),
(281, 95, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:56', '2021-09-06 14:49:56', NULL),
(282, 95, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 14:49:57', '2021-09-06 14:49:57', NULL),
(283, 96, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(284, 96, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(285, 96, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(286, 96, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(287, 96, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(288, 96, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:03:18', '2021-09-06 15:03:18', NULL),
(289, 97, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:40', '2021-09-06 15:06:40', NULL),
(290, 97, 1536, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:41', '2021-09-06 15:06:41', NULL),
(291, 97, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:41', '2021-09-06 15:06:41', NULL),
(292, 97, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:41', '2021-09-06 15:06:41', NULL),
(293, 97, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:41', '2021-09-06 15:06:41', NULL),
(294, 97, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 15:06:41', '2021-09-06 15:06:41', NULL),
(304, 102, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(305, 102, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(306, 102, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(307, 102, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(308, 102, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(309, 103, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:14:10', '2021-09-06 16:14:10', NULL),
(310, 103, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:14:10', '2021-09-06 16:14:10', NULL),
(311, 103, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:14:10', '2021-09-06 16:14:10', NULL),
(312, 103, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:14:10', '2021-09-06 16:14:10', NULL),
(313, 103, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:14:11', '2021-09-06 16:14:11', NULL),
(319, 106, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:18:39', '2021-09-06 16:18:39', NULL),
(320, 106, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:18:39', '2021-09-06 16:18:39', NULL),
(321, 106, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:18:39', '2021-09-06 16:18:39', NULL),
(322, 106, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:18:39', '2021-09-06 16:18:39', NULL),
(323, 106, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:18:39', '2021-09-06 16:18:39', NULL),
(324, 107, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:22:52', '2021-09-06 16:22:52', NULL),
(325, 107, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:22:52', '2021-09-06 16:22:52', NULL),
(326, 107, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:22:52', '2021-09-06 16:22:52', NULL),
(327, 107, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:22:53', '2021-09-06 16:22:53', NULL),
(328, 107, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 16:22:53', '2021-09-06 16:22:53', NULL),
(329, 108, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:46:36', '2021-09-06 17:46:36', NULL),
(330, 108, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:46:36', '2021-09-06 17:46:36', NULL),
(331, 108, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:46:36', '2021-09-06 17:46:36', NULL),
(332, 108, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:46:36', '2021-09-06 17:46:36', NULL),
(333, 108, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:46:36', '2021-09-06 17:46:36', NULL),
(334, 109, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:50:06', '2021-09-06 17:50:06', NULL),
(335, 109, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:50:06', '2021-09-06 17:50:06', NULL),
(336, 109, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:50:06', '2021-09-06 17:50:06', NULL);
INSERT INTO `asset_transactions` (`ID`, `Dispatch_ID`, `Asset_ID`, `Dated_On`, `Location_From`, `Location_From_Department`, `Location_From_Cost_Center`, `Location_To`, `Location_To_Department`, `Location_To_Cost_Center`, `Type_Of_Issue`, `Collected_By`, `Mode_Of_Transport`, `Quantity`, `UOM`, `Remark`, `User_Name`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(337, 109, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:50:06', '2021-09-06 17:50:06', NULL),
(338, 109, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:50:07', '2021-09-06 17:50:07', NULL),
(339, 110, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(340, 110, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(341, 110, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(342, 110, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(343, 110, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(344, 111, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:53:56', '2021-09-06 17:53:56', NULL),
(345, 111, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:53:56', '2021-09-06 17:53:56', NULL),
(346, 111, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:53:57', '2021-09-06 17:53:57', NULL),
(347, 111, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:53:57', '2021-09-06 17:53:57', NULL),
(348, 111, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:53:57', '2021-09-06 17:53:57', NULL),
(349, 112, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:55:47', '2021-09-06 17:55:47', NULL),
(350, 112, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:55:47', '2021-09-06 17:55:47', NULL),
(351, 112, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:55:47', '2021-09-06 17:55:47', NULL),
(352, 112, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:55:48', '2021-09-06 17:55:48', NULL),
(353, 112, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:55:48', '2021-09-06 17:55:48', NULL),
(354, 113, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(355, 113, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(356, 113, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(357, 113, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(358, 113, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(359, 114, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(360, 114, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(361, 114, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(362, 114, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(363, 114, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(364, 115, 1535, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 18:03:23', '2021-09-06 18:03:23', NULL),
(365, 115, 1537, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 18:03:23', '2021-09-06 18:03:23', NULL),
(366, 115, 1538, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 18:03:23', '2021-09-06 18:03:23', NULL),
(367, 115, 1541, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 18:03:23', '2021-09-06 18:03:23', NULL),
(368, 115, 1544, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-06 18:03:23', '2021-09-06 18:03:23', NULL),
(369, 116, 2019, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(370, 116, 2020, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(371, 116, 2021, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(372, 116, 2022, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(373, 116, 2025, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(374, 116, 2028, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 06:23:52', '2021-09-08 06:23:52', NULL),
(377, 119, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 10:21:24', '2021-09-08 10:21:24', NULL),
(378, 120, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 10:23:43', '2021-09-08 10:23:43', NULL),
(379, 121, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 10:32:58', '2021-09-08 10:32:58', NULL),
(380, 122, 4, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 10:47:09', '2021-09-08 10:47:09', NULL),
(381, 123, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:16:05', '2021-09-08 11:16:05', NULL),
(382, 124, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:26:59', '2021-09-08 11:26:59', NULL),
(383, 124, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:27:00', '2021-09-08 11:27:00', NULL),
(384, 125, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:31:23', '2021-09-08 11:31:23', NULL),
(385, 125, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:31:23', '2021-09-08 11:31:23', NULL),
(386, 126, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:54:38', '2021-09-08 11:54:38', NULL),
(387, 126, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:54:38', '2021-09-08 11:54:38', NULL),
(388, 127, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:55:06', '2021-09-08 11:55:06', NULL),
(389, 127, 2, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:55:06', '2021-09-08 11:55:06', NULL),
(390, 128, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:56:28', '2021-09-08 11:56:28', NULL),
(391, 128, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 11:56:28', '2021-09-08 11:56:28', NULL),
(392, 129, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:03', '2021-09-08 12:01:03', NULL),
(393, 129, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:03', '2021-09-08 12:01:03', NULL),
(394, 130, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:22', '2021-09-08 12:01:22', NULL),
(395, 130, 2, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:22', '2021-09-08 12:01:22', NULL),
(396, 131, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:42', '2021-09-08 12:01:42', NULL),
(397, 131, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:01:43', '2021-09-08 12:01:43', NULL),
(398, 132, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:14:53', '2021-09-08 12:14:53', NULL),
(399, 132, 4, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:14:53', '2021-09-08 12:14:53', NULL),
(400, 133, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(401, 133, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(402, 133, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(403, 133, 4, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(404, 133, 7, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(405, 133, 10, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(406, 134, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(407, 134, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(408, 134, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(409, 134, 4, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(410, 134, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(411, 134, 10, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(412, 135, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:56', '2021-09-08 12:56:56', NULL),
(413, 135, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:57', '2021-09-08 12:56:57', NULL),
(414, 135, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:57', '2021-09-08 12:56:57', NULL),
(415, 135, 4, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:57', '2021-09-08 12:56:57', NULL),
(416, 135, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:57', '2021-09-08 12:56:57', NULL),
(417, 135, 10, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 12:56:57', '2021-09-08 12:56:57', NULL),
(418, 136, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(419, 136, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(420, 136, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(421, 136, 4, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(422, 136, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(423, 136, 10, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(424, 137, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:15', '2021-09-08 13:11:15', NULL),
(425, 137, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:15', '2021-09-08 13:11:15', NULL),
(426, 137, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:16', '2021-09-08 13:11:16', NULL),
(427, 137, 4, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:16', '2021-09-08 13:11:16', NULL),
(428, 137, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:16', '2021-09-08 13:11:16', NULL),
(429, 137, 10, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:11:16', '2021-09-08 13:11:16', NULL),
(430, 138, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:38:27', '2021-09-08 13:38:27', NULL),
(431, 138, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:38:27', '2021-09-08 13:38:27', NULL),
(432, 138, 11, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:38:27', '2021-09-08 13:38:27', NULL),
(433, 138, 12, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:38:27', '2021-09-08 13:38:27', NULL),
(434, 139, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:42:12', '2021-09-08 13:42:12', NULL),
(435, 139, 13, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:42:12', '2021-09-08 13:42:12', NULL),
(436, 139, 14, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:42:12', '2021-09-08 13:42:12', NULL),
(437, 140, 4, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:44:43', '2021-09-08 13:44:43', NULL),
(438, 140, 15, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:44:43', '2021-09-08 13:44:43', NULL),
(439, 140, 16, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:44:44', '2021-09-08 13:44:44', NULL),
(446, 143, 2, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:50:42', '2021-09-08 13:50:42', NULL),
(447, 143, 13, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:50:42', '2021-09-08 13:50:42', NULL),
(448, 143, 14, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:50:42', '2021-09-08 13:50:42', NULL),
(449, 143, 19, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:50:42', '2021-09-08 13:50:42', NULL),
(450, 144, 1, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:55:01', '2021-09-08 13:55:01', NULL),
(451, 144, 11, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:55:02', '2021-09-08 13:55:02', NULL),
(452, 144, 12, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:55:02', '2021-09-08 13:55:02', NULL),
(453, 144, 19, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:55:02', '2021-09-08 13:55:02', NULL),
(457, 146, 1, '2021-08-07 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:58:24', '2021-09-08 13:58:24', NULL),
(458, 146, 11, '2021-08-07 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:58:24', '2021-09-08 13:58:24', NULL),
(459, 146, 12, '2021-08-07 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:58:25', '2021-09-08 13:58:25', NULL),
(460, 146, 19, '2021-08-07 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 13:58:25', '2021-09-08 13:58:25', NULL),
(461, 147, 1, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:00:30', '2021-09-08 14:00:30', NULL),
(462, 147, 11, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:00:30', '2021-09-08 14:00:30', NULL),
(463, 147, 12, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:00:30', '2021-09-08 14:00:30', NULL),
(464, 147, 19, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:00:30', '2021-09-08 14:00:30', NULL),
(465, 148, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:04:11', '2021-09-08 14:04:11', NULL),
(466, 148, 11, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:04:11', '2021-09-08 14:04:11', NULL),
(467, 148, 12, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:04:11', '2021-09-08 14:04:11', NULL),
(468, 148, 19, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:04:11', '2021-09-08 14:04:11', NULL),
(472, 150, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:05:24', '2021-09-08 14:05:24', NULL),
(473, 150, 11, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:05:24', '2021-09-08 14:05:24', NULL),
(474, 150, 12, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:05:25', '2021-09-08 14:05:25', NULL),
(475, 150, 19, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:05:25', '2021-09-08 14:05:25', NULL),
(476, 151, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:06:06', '2021-09-08 14:06:06', NULL),
(477, 152, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:09:13', '2021-09-08 14:09:13', NULL),
(478, 153, 2, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:14:18', '2021-09-08 14:14:18', NULL),
(479, 154, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:16:30', '2021-09-08 14:16:30', NULL),
(480, 155, 4, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:18:40', '2021-09-08 14:18:40', NULL),
(481, 156, 5, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:20:01', '2021-09-08 14:20:01', NULL),
(482, 157, 6, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:25:45', '2021-09-08 14:25:45', NULL),
(483, 158, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:29:10', '2021-09-08 14:29:10', NULL),
(484, 158, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:29:10', '2021-09-08 14:29:10', NULL),
(485, 158, 7, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:29:10', '2021-09-08 14:29:10', NULL),
(486, 158, 10, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:29:10', '2021-09-08 14:29:10', NULL),
(487, 160, 2, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:31:07', '2021-09-08 14:31:07', NULL),
(488, 160, 4, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:31:07', '2021-09-08 14:31:07', NULL),
(489, 160, 8, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-08 14:31:07', '2021-09-08 14:31:07', NULL),
(490, 161, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:19:16', '2021-09-09 04:19:16', NULL),
(491, 161, 3, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:19:16', '2021-09-09 04:19:16', NULL),
(492, 161, 7, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:19:16', '2021-09-09 04:19:16', NULL),
(493, 163, 1, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:43:07', '2021-09-09 04:43:07', NULL),
(494, 163, 3, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:43:07', '2021-09-09 04:43:07', NULL),
(495, 163, 7, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:43:07', '2021-09-09 04:43:07', NULL),
(496, 164, 1, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:44:22', '2021-09-09 04:44:22', NULL),
(497, 164, 3, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:44:23', '2021-09-09 04:44:23', NULL),
(498, 164, 7, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:44:23', '2021-09-09 04:44:23', NULL),
(499, 165, 7, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 04:45:23', '2021-09-09 04:45:23', NULL),
(500, 166, 1, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:38:55', '2021-09-09 05:38:55', NULL),
(501, 166, 3, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:38:55', '2021-09-09 05:38:55', NULL),
(502, 166, 8, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:38:55', '2021-09-09 05:38:55', NULL),
(503, 167, 1, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:42:23', '2021-09-09 05:42:23', NULL),
(504, 167, 3, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:42:23', '2021-09-09 05:42:23', NULL),
(505, 167, 7, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:42:23', '2021-09-09 05:42:23', NULL),
(506, 168, 1, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:43:28', '2021-09-09 05:43:28', NULL),
(507, 168, 3, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:43:28', '2021-09-09 05:43:28', NULL),
(508, 168, 7, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:43:28', '2021-09-09 05:43:28', NULL),
(509, 169, 1, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:45:47', '2021-09-09 05:45:47', NULL),
(510, 169, 3, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:45:47', '2021-09-09 05:45:47', NULL),
(511, 169, 7, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:45:48', '2021-09-09 05:45:48', NULL),
(512, 170, 1, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:46:19', '2021-09-09 05:46:19', NULL),
(513, 170, 3, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:46:20', '2021-09-09 05:46:20', NULL),
(514, 170, 7, '2021-08-06 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:46:20', '2021-09-09 05:46:20', NULL),
(515, 171, 1, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:47:09', '2021-09-09 05:47:09', NULL),
(516, 171, 3, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:47:10', '2021-09-09 05:47:10', NULL),
(517, 171, 7, '2021-08-06 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 05:47:10', '2021-09-09 05:47:10', NULL),
(518, 172, 1, '2021-08-06 00:00:00', 4, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:03:30', '2021-09-09 06:03:30', NULL),
(519, 172, 3, '2021-08-06 00:00:00', 4, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:03:30', '2021-09-09 06:03:30', NULL),
(520, 172, 7, '2021-08-06 00:00:00', 4, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:03:30', '2021-09-09 06:03:30', NULL),
(521, 173, 1, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:06:48', '2021-09-09 06:06:48', NULL),
(522, 173, 3, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:06:49', '2021-09-09 06:06:49', NULL),
(523, 173, 7, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:06:49', '2021-09-09 06:06:49', NULL),
(524, 175, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:10:36', '2021-09-09 06:10:36', NULL),
(525, 175, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:10:37', '2021-09-09 06:10:37', NULL),
(526, 175, 7, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:10:37', '2021-09-09 06:10:37', NULL),
(527, 176, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:31:09', '2021-09-09 06:31:09', NULL),
(528, 176, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:31:09', '2021-09-09 06:31:09', NULL),
(529, 176, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:31:09', '2021-09-09 06:31:09', NULL),
(530, 177, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:27', '2021-09-09 06:32:27', NULL),
(531, 177, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:27', '2021-09-09 06:32:27', NULL),
(532, 177, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:27', '2021-09-09 06:32:27', NULL),
(533, 178, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:56', '2021-09-09 06:32:56', NULL),
(534, 178, 3, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:56', '2021-09-09 06:32:56', NULL),
(535, 178, 7, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 4, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:32:56', '2021-09-09 06:32:56', NULL),
(536, 179, 1, '2021-08-05 00:00:00', 4, 'Mumbai', 'Narhe', 5, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:05', '2021-09-09 06:53:05', NULL),
(537, 179, 3, '2021-08-05 00:00:00', 4, 'Mumbai', 'Narhe', 5, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:05', '2021-09-09 06:53:05', NULL),
(538, 179, 7, '2021-08-05 00:00:00', 4, 'Mumbai', 'Narhe', 5, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:06', '2021-09-09 06:53:06', NULL),
(539, 180, 1, '2021-08-05 00:00:00', 5, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:43', '2021-09-09 06:53:43', NULL),
(540, 180, 3, '2021-08-05 00:00:00', 5, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:44', '2021-09-09 06:53:44', NULL),
(541, 180, 7, '2021-08-05 00:00:00', 5, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:53:44', '2021-09-09 06:53:44', NULL),
(542, 181, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:54:11', '2021-09-09 06:54:11', NULL),
(543, 181, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:54:11', '2021-09-09 06:54:11', NULL),
(544, 181, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:54:11', '2021-09-09 06:54:11', NULL),
(545, 182, 1, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:56:46', '2021-09-09 06:56:46', NULL),
(546, 182, 3, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:56:46', '2021-09-09 06:56:46', NULL),
(547, 182, 7, '2021-08-05 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:56:47', '2021-09-09 06:56:47', NULL),
(548, 183, 1, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:57:16', '2021-09-09 06:57:16', NULL),
(549, 183, 3, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:57:17', '2021-09-09 06:57:17', NULL),
(550, 183, 7, '2021-08-05 00:00:00', 3, 'Mumbai', 'Narhe', 1, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:57:17', '2021-09-09 06:57:17', NULL),
(551, 184, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-09 06:57:40', '2021-09-09 06:57:40', NULL),
(552, 184, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-09 06:57:40', '2021-09-09 06:57:40', NULL),
(553, 184, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-09 06:57:40', '2021-09-09 06:57:40', NULL),
(554, 185, 8, '2021-08-06 00:00:00', 1, NULL, NULL, 3, 'Mumbai', 'Narhe', '', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Haresh', '2021-09-09 06:57:57', '2021-09-09 06:57:57', NULL),
(555, 187, 1, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-23 16:10:26', '2021-09-23 16:10:26', NULL),
(556, 187, 3, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-23 16:10:27', '2021-09-23 16:10:27', NULL),
(557, 187, 7, '2021-08-05 00:00:00', 1, 'Mumbai', 'Narhe', 3, 'Mumbai', 'Narhe', 'Office Transfer', 'Sumit Sakpal', 'ABC', 1, 'kg', 'OK', 'Amit', '2021-09-23 16:10:27', '2021-09-23 16:10:27', NULL),
(558, 188, 41, '2021-09-29 00:00:00', 1, NULL, NULL, 6, 'Mumbai', '100003', 'Office Transfer', 'IT System Admin', 'Road', 1, 'Box', 'ok', 'Swapnil', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(559, 188, 42, '2021-09-29 00:00:00', 1, NULL, NULL, 6, 'Mumbai', '100003', 'Office Transfer', 'IT System Admin', 'Road', 1, 'Box', 'ok', 'Swapnil', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(560, 188, 44, '2021-09-29 00:00:00', 1, NULL, NULL, 6, 'Mumbai', '100003', 'Office Transfer', 'IT System Admin', 'Road', 1, 'sfsdf', 'ok', 'Swapnil', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(561, 188, 45, '2021-09-29 00:00:00', 1, NULL, NULL, 6, 'Mumbai', '100003', 'Office Transfer', 'IT System Admin', 'Road', 1, 'sfsdf', 'ok', 'Swapnil', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(562, 188, 46, '2021-09-29 00:00:00', 1, NULL, NULL, 6, 'Mumbai', '100003', 'Office Transfer', 'IT System Admin', 'Road', 1, 'sfsdf', 'ok', 'Swapnil', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(563, 189, 43, '2021-09-29 00:00:00', 1, NULL, NULL, 3, 'Mumbai', '100003', 'Office Transfer', 'Haresh', 'Road', 1, 'Box', '', 'Shubham', '2021-09-29 16:39:03', '2021-09-29 16:39:03', NULL),
(564, 190, 10, '2021-10-01 00:00:00', 1, NULL, NULL, 1, 'Mumbai', '100001', 'Dept To Dept', 'sumit', 'road', 1, 'Box', '', '', '2021-10-01 17:31:55', '2021-10-01 17:31:55', NULL),
(565, 191, 10, '2021-10-02 00:00:00', 1, 'Mumbai', '100001', 1, 'Mumbai', '100001', 'Dept To Dept', 'Rakesh', 'Road', 1, 'Box', '', '', '2021-10-02 05:04:01', '2021-10-02 05:04:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cost_centers`
--

CREATE TABLE `cost_centers` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cost_centers`
--

INSERT INTO `cost_centers` (`ID`, `Name`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, '100004', '2021-09-01 05:41:18', '2021-09-01 08:27:58', NULL),
(3, '100001', '2021-09-01 08:34:43', '2021-09-01 08:34:43', NULL),
(4, '100003', '2021-09-01 08:34:55', '2021-09-01 08:36:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`ID`, `Name`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'Mumbai', '2021-09-01 05:10:37', '2021-09-01 05:38:50', NULL),
(4, 'Roll', '2021-09-01 08:07:28', '2021-09-01 08:07:37', '2021-09-01 08:09:30'),
(5, 'Pune nagpur', '2021-09-01 08:09:38', '2021-09-01 08:10:24', '2021-09-01 08:10:29'),
(6, 'Pune', '2021-09-01 08:10:37', '2021-09-01 08:10:37', NULL),
(7, 'Nagpur', '2021-09-01 08:10:44', '2021-09-01 08:10:44', NULL),
(8, 'abc', '2021-09-01 08:26:23', '2021-09-01 08:26:23', '2021-09-01 08:29:59'),
(9, '100002', '2021-09-01 08:27:24', '2021-09-01 08:27:24', '2021-09-01 08:29:53'),
(10, '100001', '2021-09-01 08:33:47', '2021-09-01 08:33:47', '2021-09-02 05:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `dispatch`
--

CREATE TABLE `dispatch` (
  `ID` int(11) NOT NULL,
  `Gate_Pass_No` varchar(50) NOT NULL,
  `Dated_On` datetime NOT NULL,
  `From_Location` varchar(50) NOT NULL,
  `To_Location` varchar(50) NOT NULL,
  `Type_Of_Issue` enum('Dept To Dept','Office Transfer','Repair','Scrap','Return') NOT NULL DEFAULT 'Dept To Dept',
  `Department` varchar(50) DEFAULT NULL,
  `Cost_Center` varchar(50) DEFAULT NULL,
  `Collected_By` varchar(50) NOT NULL,
  `Mode_Of_Transport` varchar(50) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `File_Name` varchar(50) DEFAULT NULL,
  `User_Type` varchar(20) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dispatch`
--

INSERT INTO `dispatch` (`ID`, `Gate_Pass_No`, `Dated_On`, `From_Location`, `To_Location`, `Type_Of_Issue`, `Department`, `Cost_Center`, `Collected_By`, `Mode_Of_Transport`, `Quantity`, `File_Name`, `User_Type`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(10, 'MBEPL/2021-22/000010', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000010.pdf', 'System Admin', '2021-08-30 13:06:00', '2021-08-30 13:06:01', NULL),
(11, 'MBEPL/2021-22/000011', '2021-08-04 00:00:00', '1', '2', 'Office Transfer', 'Nagpur', '00001', 'Haresh', 'Online', 1, 'MBEPL_2021-22_000011.pdf', 'IT', '2021-08-30 16:26:10', '2021-08-30 16:26:10', NULL),
(13, 'MBEPL/2021-22/000012', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000012.pdf', 'System Admin', '2021-09-01 05:52:32', '2021-09-01 05:52:33', NULL),
(14, 'MBEPL/2021-22/000014', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000014.pdf', 'System Admin', '2021-09-01 05:58:18', '2021-09-01 05:58:18', NULL),
(15, 'MBEPL/2021-22/000015', '2021-09-04 00:00:00', '1', '2', 'Office Transfer', 'Mumbai', '100001', 'Haresh', 'Online', 2, 'MBEPL_2021-22_000015.pdf', 'System Admin', '2021-09-01 12:03:52', '2021-09-01 12:03:53', NULL),
(16, 'MBEPL/2021-22/000016', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000016.pdf', 'System Admin', '2021-09-03 14:03:37', '2021-09-03 14:03:38', NULL),
(17, 'MBEPL/2021-22/000017', '2021-09-05 00:00:00', '1', '2', 'Office Transfer', 'Mumbai', '100001', 'k k r', 'Road', 1, 'MBEPL_2021-22_000017.pdf', 'IT', '2021-09-04 11:32:09', '2021-09-04 11:32:09', NULL),
(21, 'MBEPL/2021-22/000018', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000018.pdf', 'System Admin', '2021-09-05 11:51:25', '2021-09-05 11:51:26', NULL),
(40, 'MBEPL/2021-22/000022', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000022.pdf', 'System Admin', '2021-09-06 05:13:33', '2021-09-06 05:13:33', NULL),
(41, 'MBEPL/2021-22/000041', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000041.pdf', 'System Admin', '2021-09-06 05:16:01', '2021-09-06 05:16:02', NULL),
(42, 'MBEPL/2021-22/000042', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000042.pdf', 'System Admin', '2021-09-06 05:18:01', '2021-09-06 05:18:02', NULL),
(43, 'MBEPL/2021-22/000043', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000043.pdf', 'System Admin', '2021-09-06 05:23:43', '2021-09-06 05:23:44', NULL),
(45, 'MBEPL/2021-22/000044', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000044.pdf', 'System Admin', '2021-09-06 05:42:09', '2021-09-06 05:42:10', NULL),
(46, 'MBEPL/2021-22/000046', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000046.pdf', 'System Admin', '2021-09-06 05:55:02', '2021-09-06 05:55:03', NULL),
(47, 'MBEPL/2021-22/000047', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000047.pdf', 'System Admin', '2021-09-06 05:57:36', '2021-09-06 05:57:37', NULL),
(48, 'MBEPL/2021-22/000048', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000048.pdf', 'System Admin', '2021-09-06 06:00:59', '2021-09-06 06:01:00', NULL),
(50, 'MBEPL/2021-22/000049', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000049.pdf', 'System Admin', '2021-09-06 06:15:06', '2021-09-06 06:15:07', NULL),
(51, 'MBEPL/2021-22/000051', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000051.pdf', 'System Admin', '2021-09-06 06:17:38', '2021-09-06 06:17:39', NULL),
(58, 'MBEPL/2021-22/000052', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000052.pdf', 'System Admin', '2021-09-06 06:45:40', '2021-09-06 06:45:42', NULL),
(59, 'MBEPL/2021-22/000059', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000059.pdf', 'System Admin', '2021-09-06 07:00:15', '2021-09-06 07:03:39', NULL),
(60, 'MBEPL/2021-22/000060', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000060.pdf', 'System Admin', '2021-09-06 07:09:44', '2021-09-06 07:09:44', NULL),
(61, 'MBEPL/2021-22/000061', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000061.pdf', 'System Admin', '2021-09-06 07:13:16', '2021-09-06 07:16:42', NULL),
(62, 'MBEPL/2021-22/000062', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000062.pdf', 'System Admin', '2021-09-06 07:19:21', '2021-09-06 07:19:24', NULL),
(63, 'MBEPL/2021-22/000063', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000063.pdf', 'System Admin', '2021-09-06 07:27:16', '2021-09-06 07:27:17', NULL),
(75, 'MBEPL/2021-22/000064', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000064.pdf', 'System Admin', '2021-09-06 12:47:38', '2021-09-06 12:47:39', NULL),
(78, 'MBEPL/2021-22/000076', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000076.pdf', 'System Admin', '2021-09-06 12:57:04', '2021-09-06 12:57:06', NULL),
(79, 'MBEPL/2021-22/000079', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000079.pdf', 'System Admin', '2021-09-06 13:01:15', '2021-09-06 13:01:16', NULL),
(80, 'MBEPL/2021-22/000080', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000080.pdf', 'System Admin', '2021-09-06 13:07:21', '2021-09-06 13:07:23', NULL),
(81, 'MBEPL/2021-22/000081', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000081.pdf', 'System Admin', '2021-09-06 13:11:17', '2021-09-06 13:11:18', NULL),
(90, 'MBEPL/2021-22/000082', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000082.pdf', 'System Admin', '2021-09-06 14:08:29', '2021-09-06 14:08:32', NULL),
(92, 'MBEPL/2021-22/000091', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000091.pdf', 'System Admin', '2021-09-06 14:38:31', '2021-09-06 14:38:32', NULL),
(93, 'MBEPL/2021-22/000093', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000093.pdf', 'System Admin', '2021-09-06 14:41:24', '2021-09-06 14:41:25', NULL),
(94, 'MBEPL/2021-22/000094', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000094.pdf', 'System Admin', '2021-09-06 14:46:00', '2021-09-06 14:46:01', NULL),
(95, 'MBEPL/2021-22/000095', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000095.pdf', 'System Admin', '2021-09-06 14:49:56', '2021-09-06 14:49:57', NULL),
(96, 'MBEPL/2021-22/000096', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000096.pdf', 'System Admin', '2021-09-06 15:03:17', '2021-09-06 15:03:18', NULL),
(97, 'MBEPL/2021-22/000097', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000097.pdf', 'System Admin', '2021-09-06 15:06:40', '2021-09-06 15:06:41', NULL),
(102, 'MBEPL/2021-22/000098', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000098.pdf', 'System Admin', '2021-09-06 16:06:50', '2021-09-06 16:06:50', NULL),
(103, 'MBEPL/2021-22/000103', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000103.pdf', 'System Admin', '2021-09-06 16:14:10', '2021-09-06 16:14:11', NULL),
(106, 'MBEPL/2021-22/000104', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000104.pdf', 'System Admin', '2021-09-06 16:18:38', '2021-09-06 16:18:39', NULL),
(107, 'MBEPL/2021-22/000107', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000107.pdf', 'System Admin', '2021-09-06 16:22:52', '2021-09-06 16:22:53', NULL),
(108, 'MBEPL/2021-22/000108', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000108.pdf', 'System Admin', '2021-09-06 17:46:35', '2021-09-06 17:46:36', NULL),
(109, 'MBEPL/2021-22/000109', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000109.pdf', 'System Admin', '2021-09-06 17:50:06', '2021-09-06 17:50:07', NULL),
(110, 'MBEPL/2021-22/000110', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000110.pdf', 'System Admin', '2021-09-06 17:51:36', '2021-09-06 17:51:36', NULL),
(111, 'MBEPL/2021-22/000111', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000111.pdf', 'System Admin', '2021-09-06 17:53:56', '2021-09-06 17:53:57', NULL),
(112, 'MBEPL/2021-22/000112', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000112.pdf', 'System Admin', '2021-09-06 17:55:47', '2021-09-06 17:55:48', NULL),
(113, 'MBEPL/2021-22/000113', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000113.pdf', 'System Admin', '2021-09-06 17:58:03', '2021-09-06 17:58:03', NULL),
(114, 'MBEPL/2021-22/000114', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000114.pdf', 'System Admin', '2021-09-06 17:59:35', '2021-09-06 17:59:35', NULL),
(115, 'MBEPL/2021-22/000115', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 5, 'MBEPL_2021-22_000115.pdf', 'System Admin', '2021-09-06 18:03:22', '2021-09-06 18:03:23', NULL),
(116, 'MBEPL/2021-22/000116', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000116.pdf', 'System Admin', '2021-09-08 06:23:51', '2021-09-08 06:23:52', NULL),
(119, 'MBEPL/2021-22/000117', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000117.pdf', 'System Admin', '2021-09-08 10:21:23', '2021-09-08 10:21:24', NULL),
(120, 'MBEPL/2021-22/000120', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000120.pdf', 'System Admin', '2021-09-08 10:23:43', '2021-09-08 10:23:44', NULL),
(121, 'MBEPL/2021-22/000121', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000121.pdf', 'System Admin', '2021-09-08 10:32:57', '2021-09-08 10:32:58', NULL),
(122, 'MBEPL/2021-22/000122', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000122.pdf', 'System Admin', '2021-09-08 10:47:09', '2021-09-08 10:47:09', NULL),
(123, 'MBEPL/2021-22/000123', '2021-08-05 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000123.pdf', 'System Admin', '2021-09-08 11:16:05', '2021-09-08 11:16:05', NULL),
(124, 'MBEPL/2021-22/000124', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000124.pdf', 'System Admin', '2021-09-08 11:26:59', '2021-09-08 11:27:00', NULL),
(125, 'MBEPL/2021-22/000125', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000125.pdf', 'System Admin', '2021-09-08 11:31:22', '2021-09-08 11:31:23', NULL),
(126, 'MBEPL/2021-22/000126', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000126.pdf', 'System Admin', '2021-09-08 11:54:38', '2021-09-08 11:54:38', NULL),
(127, 'MBEPL/2021-22/000127', '2021-08-05 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000127.pdf', 'System Admin', '2021-09-08 11:55:06', '2021-09-08 11:55:06', NULL),
(128, 'MBEPL/2021-22/000128', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000128.pdf', 'System Admin', '2021-09-08 11:56:28', '2021-09-08 11:56:28', NULL),
(129, 'MBEPL/2021-22/000129', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000129.pdf', 'System Admin', '2021-09-08 12:01:03', '2021-09-08 12:01:03', NULL),
(130, 'MBEPL/2021-22/000130', '2021-08-05 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000130.pdf', 'System Admin', '2021-09-08 12:01:22', '2021-09-08 12:01:22', NULL),
(131, 'MBEPL/2021-22/000131', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000131.pdf', 'System Admin', '2021-09-08 12:01:42', '2021-09-08 12:01:43', NULL),
(132, 'MBEPL/2021-22/000132', '2021-08-05 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 2, 'MBEPL_2021-22_000132.pdf', 'System Admin', '2021-09-08 12:14:53', '2021-09-08 12:14:53', NULL),
(133, 'MBEPL/2021-22/000133', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000133.pdf', 'System Admin', '2021-09-08 12:38:38', '2021-09-08 12:38:38', NULL),
(134, 'MBEPL/2021-22/000134', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000134.pdf', 'System Admin', '2021-09-08 12:45:41', '2021-09-08 12:45:41', NULL),
(135, 'MBEPL/2021-22/000135', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000135.pdf', 'System Admin', '2021-09-08 12:56:56', '2021-09-08 12:56:57', NULL),
(136, 'MBEPL/2021-22/000136', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000136.pdf', 'System Admin', '2021-09-08 13:08:59', '2021-09-08 13:08:59', NULL),
(137, 'MBEPL/2021-22/000137', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 6, 'MBEPL_2021-22_000137.pdf', 'System Admin', '2021-09-08 13:11:15', '2021-09-08 13:11:16', NULL),
(138, 'MBEPL/2021-22/000138', '2021-08-05 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000138.pdf', 'System Admin', '2021-09-08 13:38:27', '2021-09-08 13:38:27', NULL),
(139, 'MBEPL/2021-22/000139', '2021-08-05 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000139.pdf', 'System Admin', '2021-09-08 13:42:12', '2021-09-08 13:42:12', NULL),
(140, 'MBEPL/2021-22/000140', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000140.pdf', 'System Admin', '2021-09-08 13:44:43', '2021-09-08 13:44:44', NULL),
(143, 'MBEPL/2021-22/000141', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000141.pdf', 'System Admin', '2021-09-08 13:50:42', '2021-09-08 13:50:42', NULL),
(144, 'MBEPL/2021-22/000144', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000144.pdf', 'System Admin', '2021-09-08 13:55:01', '2021-09-08 13:55:02', NULL),
(146, 'MBEPL/2021-22/000145', '2021-08-07 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000145.pdf', 'System Admin', '2021-09-08 13:58:24', '2021-09-08 13:58:25', NULL),
(147, 'MBEPL/2021-22/000147', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000147.pdf', 'System Admin', '2021-09-08 14:00:30', '2021-09-08 14:00:30', NULL),
(148, 'MBEPL/2021-22/000148', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000148.pdf', 'System Admin', '2021-09-08 14:04:11', '2021-09-08 14:04:11', NULL),
(150, 'MBEPL/2021-22/000149', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000149.pdf', 'System Admin', '2021-09-08 14:05:24', '2021-09-08 14:05:25', NULL),
(151, 'MBEPL/2021-22/000151', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000151.pdf', 'System Admin', '2021-09-08 14:06:06', '2021-09-08 14:06:06', NULL),
(152, 'MBEPL/2021-22/000152', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000152.pdf', 'System Admin', '2021-09-08 14:09:13', '2021-09-08 14:09:13', NULL),
(153, 'MBEPL/2021-22/000153', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000153.pdf', 'System Admin', '2021-09-08 14:14:18', '2021-09-08 14:14:18', NULL),
(154, 'MBEPL/2021-22/000154', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000154.pdf', 'System Admin', '2021-09-08 14:16:30', '2021-09-08 14:16:30', NULL),
(155, 'MBEPL/2021-22/000155', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000155.pdf', 'System Admin', '2021-09-08 14:18:40', '2021-09-08 14:18:40', NULL),
(156, 'MBEPL/2021-22/000156', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000156.pdf', 'System Admin', '2021-09-08 14:20:01', '2021-09-08 14:20:01', NULL),
(157, 'MBEPL/2021-22/000157', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000157.pdf', 'System Admin', '2021-09-08 14:25:45', '2021-09-08 14:25:45', NULL),
(158, 'MBEPL/2021-22/000158', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 4, 'MBEPL_2021-22_000158.pdf', 'System Admin', '2021-09-08 14:29:10', '2021-09-08 14:29:10', NULL),
(160, 'MBEPL/2021-22/000159', '2021-08-05 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000159.pdf', 'System Admin', '2021-09-08 14:31:07', '2021-09-08 14:31:08', NULL),
(161, 'MBEPL/2021-22/000161', '2021-08-05 00:00:00', '3', '4', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000161.pdf', 'System Admin', '2021-09-09 04:19:16', '2021-09-09 04:19:16', NULL),
(163, 'MBEPL/2021-22/000162', '2021-08-06 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000162.pdf', 'System Admin', '2021-09-09 04:43:07', '2021-09-09 04:43:07', NULL),
(164, 'MBEPL/2021-22/000164', '2021-08-06 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000164.pdf', 'System Admin', '2021-09-09 04:44:22', '2021-09-09 04:44:23', NULL),
(165, 'MBEPL/2021-22/000165', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000165.pdf', 'System Admin', '2021-09-09 04:45:23', '2021-09-09 04:45:23', NULL),
(166, 'MBEPL/2021-22/000166', '2021-08-06 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000166.pdf', 'System Admin', '2021-09-09 05:38:55', '2021-09-09 05:38:55', NULL),
(167, 'MBEPL/2021-22/000167', '2021-08-06 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000167.pdf', 'System Admin', '2021-09-09 05:42:23', '2021-09-09 05:42:23', NULL),
(168, 'MBEPL/2021-22/000168', '2021-08-06 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000168.pdf', 'System Admin', '2021-09-09 05:43:27', '2021-09-09 05:43:28', NULL),
(169, 'MBEPL/2021-22/000169', '2021-08-06 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000169.pdf', 'System Admin', '2021-09-09 05:45:47', '2021-09-09 05:45:48', NULL),
(170, 'MBEPL/2021-22/000170', '2021-08-06 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000170.pdf', 'System Admin', '2021-09-09 05:46:19', '2021-09-09 05:46:20', NULL),
(171, 'MBEPL/2021-22/000171', '2021-08-06 00:00:00', '3', '4', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000171.pdf', 'System Admin', '2021-09-09 05:47:09', '2021-09-09 05:47:10', NULL),
(172, 'MBEPL/2021-22/000172', '2021-08-06 00:00:00', '4', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000172.pdf', 'System Admin', '2021-09-09 06:03:30', '2021-09-09 06:03:31', NULL),
(173, 'MBEPL/2021-22/000173', '2021-08-06 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000173.pdf', 'System Admin', '2021-09-09 06:06:48', '2021-09-09 06:06:49', NULL),
(175, 'MBEPL/2021-22/000174', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000174.pdf', 'System Admin', '2021-09-09 06:10:36', '2021-09-09 06:10:37', NULL),
(176, 'MBEPL/2021-22/000176', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000176.pdf', 'System Admin', '2021-09-09 06:31:09', '2021-09-09 06:31:09', NULL),
(177, 'MBEPL/2021-22/000177', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000177.pdf', 'System Admin', '2021-09-09 06:32:26', '2021-09-09 06:32:27', NULL),
(178, 'MBEPL/2021-22/000178', '2021-08-05 00:00:00', '3', '4', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000178.pdf', 'System Admin', '2021-09-09 06:32:56', '2021-09-09 06:32:56', NULL),
(179, 'MBEPL/2021-22/000179', '2021-08-05 00:00:00', '4', '5', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000179.pdf', 'System Admin', '2021-09-09 06:53:05', '2021-09-09 06:53:06', NULL),
(180, 'MBEPL/2021-22/000180', '2021-08-05 00:00:00', '5', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000180.pdf', 'System Admin', '2021-09-09 06:53:43', '2021-09-09 06:53:44', NULL),
(181, 'MBEPL/2021-22/000181', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000181.pdf', 'System Admin', '2021-09-09 06:54:11', '2021-09-09 06:54:11', NULL),
(182, 'MBEPL/2021-22/000182', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000182.pdf', 'System Admin', '2021-09-09 06:56:46', '2021-09-09 06:56:47', NULL),
(183, 'MBEPL/2021-22/000183', '2021-08-05 00:00:00', '3', '1', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000183.pdf', 'System Admin', '2021-09-09 06:57:16', '2021-09-09 06:57:17', NULL),
(184, 'MBEPL/2021-22/000184', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000184.pdf', 'System Admin', '2021-09-09 06:57:40', '2021-09-09 06:57:40', NULL),
(185, 'MBEPL/2021-22/000185', '2021-08-06 00:00:00', '1', '3', '', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 1, 'MBEPL_2021-22_000185.pdf', 'System Admin', '2021-09-09 06:57:57', '2021-09-09 06:57:57', NULL),
(187, 'MBEPL/2021-22/000186', '2021-08-05 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', 'Narhe', 'Sumit Sakpal', 'ABC', 3, 'MBEPL_2021-22_000186.pdf', 'System Admin', '2021-09-23 16:10:26', '2021-09-23 16:10:27', NULL),
(188, 'MBEPL/2021-22/000188', '2021-09-29 00:00:00', '1', '6', 'Office Transfer', 'Mumbai', '100003', 'IT System Admin', 'Road', 5, 'MBEPL_2021-22_000188.pdf', 'IT', '2021-09-29 13:31:56', '2021-09-29 13:31:56', NULL),
(189, 'MBEPL/2021-22/000189', '2021-09-29 00:00:00', '1', '3', 'Office Transfer', 'Mumbai', '100003', 'Haresh', 'Road', 1, 'MBEPL_2021-22_000189.pdf', 'IT', '2021-09-29 16:39:03', '2021-09-29 16:39:03', NULL),
(190, 'MBEPL/2021-22/000190', '2021-10-01 00:00:00', '1', '1', 'Dept To Dept', 'Mumbai', '100001', 'sumit', 'road', 1, 'MBEPL_2021-22_000190.pdf', 'IT', '2021-10-01 17:31:54', '2021-10-01 17:31:55', NULL),
(191, 'MBEPL/2021-22/000191', '2021-10-02 00:00:00', '1', '1', 'Dept To Dept', 'Mumbai', '100001', 'Rakesh', 'Road', 1, 'MBEPL_2021-22_000191.pdf', 'IT', '2021-10-02 05:04:01', '2021-10-02 05:04:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inward`
--

CREATE TABLE `inward` (
  `ID` int(11) NOT NULL,
  `Challan_No` varchar(50) NOT NULL,
  `PO_Number` varchar(50) DEFAULT NULL,
  `Dated_On` datetime NOT NULL,
  `Vendor_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Sub_Total` float(10,2) NOT NULL,
  `Tax_value` float(10,2) NOT NULL,
  `Total_Price` float(10,2) NOT NULL,
  `User_Type` varchar(20) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inward`
--

INSERT INTO `inward` (`ID`, `Challan_No`, `PO_Number`, `Dated_On`, `Vendor_ID`, `Quantity`, `Sub_Total`, `Tax_value`, `Total_Price`, `User_Type`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'CH0200', NULL, '2021-08-05 00:00:00', 1, 10, 57253.30, 32046.27, 89299.57, 'IT', '2021-09-09 06:55:28', '2021-09-09 06:55:28', NULL),
(2, 'CH0200', NULL, '2021-08-06 00:00:00', 1, 10, 57253.30, 32046.27, 89299.57, 'Admin', '2021-09-09 06:55:48', '2021-09-09 06:55:48', NULL),
(3, 'CH0200', NULL, '2021-08-05 00:00:00', 1, 10, 57253.30, 32046.27, 89299.57, 'IT', '2021-09-09 06:56:32', '2021-09-09 06:56:32', NULL),
(4, 'CH0201', NULL, '2021-08-05 00:00:00', 1, 10, 57253.30, 32046.27, 89299.57, 'Admin', '2021-09-27 16:42:05', '2021-09-27 16:42:05', NULL),
(5, 'CH0203', NULL, '2021-09-29 00:00:00', 3, 7, 1884.60, 1036.80, 2921.40, 'IT', '2021-09-29 13:28:22', '2021-09-29 13:28:22', NULL),
(6, 'CH0205', NULL, '2021-10-01 00:00:00', 3, 1, 56778.00, 31795.68, 88573.68, 'IT', '2021-10-01 17:32:55', '2021-10-01 17:32:55', NULL),
(7, 'CH0206', NULL, '2021-10-02 00:00:00', 3, 1, 56778.00, 31795.68, 88573.68, 'IT', '2021-10-02 05:01:06', '2021-10-02 05:01:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `issue_types`
--

CREATE TABLE `issue_types` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `User_Type` varchar(20) NOT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `issue_types`
--

INSERT INTO `issue_types` (`ID`, `Name`, `User_Type`, `Is_Active`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'HardDisk issue', 'IT', 1, '2021-07-27 13:13:25', '2021-07-27 13:17:02', NULL),
(2, 'RAM issue', 'Admin', 1, '2021-07-27 13:13:35', '2021-07-27 13:17:38', NULL),
(3, 'ROM issue', 'IT', 1, '2021-07-27 13:13:38', '2021-07-28 07:49:29', NULL),
(5, 'Keyboard issue', 'Admin', 1, '2021-07-28 07:50:16', '2021-07-30 06:22:51', NULL),
(6, 'mouse issue', 'IT', 1, '2021-07-29 11:51:08', '2021-07-29 11:59:56', NULL),
(7, 'Processor issue', 'Admin', 1, '2021-07-30 05:45:04', '2021-07-30 06:11:14', NULL),
(8, 'SSD issue', 'IT', 1, '2021-07-30 08:56:02', '2021-07-30 08:56:27', NULL),
(9, 'Graphics issue', 'Admin', 1, '2021-07-30 10:12:59', '2021-07-30 10:13:17', NULL),
(10, 'Monitor issue', 'IT', 1, '2021-07-30 10:29:52', '2021-07-30 12:29:19', NULL),
(11, 'CPU issue', 'Admin', 1, '2021-07-30 10:36:06', '2021-09-29 09:18:59', NULL),
(13, 'Network', 'IT', 1, '2021-07-30 13:40:29', '2021-09-29 10:24:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_stocks`
--

CREATE TABLE `item_stocks` (
  `ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Dated_On` date NOT NULL,
  `Price` float(10,2) NOT NULL,
  `Opening_Quantity` int(11) DEFAULT 0,
  `Opening_Amount` float(10,2) DEFAULT 0.00,
  `Received_Quantity` int(11) DEFAULT 0,
  `Received_Amount` float(10,2) DEFAULT 0.00,
  `Returned_Quantity` int(11) DEFAULT 0,
  `Returned_Amount` float(10,2) DEFAULT 0.00,
  `Issue_Quantity` int(11) DEFAULT 0,
  `Issue_Amount` float(10,2) DEFAULT 0.00,
  `Closing_Quantity` int(11) NOT NULL DEFAULT 0,
  `Closing_Amount` float(10,2) NOT NULL DEFAULT 0.00,
  `Scrap_Lost_Quantity` int(11) NOT NULL DEFAULT 0,
  `Scrap_Lost_Amount` float(10,2) NOT NULL DEFAULT 0.00,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_stocks`
--

INSERT INTO `item_stocks` (`ID`, `Product_ID`, `Dated_On`, `Price`, `Opening_Quantity`, `Opening_Amount`, `Received_Quantity`, `Received_Amount`, `Returned_Quantity`, `Returned_Amount`, `Issue_Quantity`, `Issue_Amount`, `Closing_Quantity`, `Closing_Amount`, `Scrap_Lost_Quantity`, `Scrap_Lost_Amount`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 697, '2021-08-05', 77.00, 0, 0.00, 6, 771.54, 1, 128.59, 3, 385.77, 4, 514.36, 0, 0.00, '2021-09-09 06:55:28', '2021-09-27 16:42:05', NULL),
(2, 700, '2021-08-05', 45.90, 0, 0.00, 12, 803.52, 1, 66.96, 3, 200.88, 10, 669.60, 0, 0.00, '2021-09-09 06:55:28', '2021-09-27 16:42:05', NULL),
(3, 701, '2021-08-05', 45.90, 0, 0.00, 9, 602.64, 1, 66.96, 3, 200.88, 7, 468.72, 0, 0.00, '2021-09-09 06:55:28', '2021-09-27 16:42:05', NULL),
(4, 702, '2021-08-05', 56778.00, 0, 0.00, 3, 265721.03, 0, 0.00, 0, 0.00, 3, 265721.03, 0, 0.00, '2021-09-09 06:55:28', '2021-09-27 16:42:05', NULL),
(5, 697, '2021-08-06', 77.00, 4, 514.36, 2, 257.18, 0, 0.00, 0, 0.00, 6, 771.54, 0, 0.00, '2021-09-09 06:55:48', '2021-09-27 16:42:05', NULL),
(6, 700, '2021-08-06', 45.90, 10, 669.60, 4, 267.84, 0, 0.00, 0, 0.00, 14, 937.44, 0, 0.00, '2021-09-09 06:55:48', '2021-09-27 16:42:05', NULL),
(7, 701, '2021-08-06', 45.90, 7, 468.72, 3, 200.88, 0, 0.00, 0, 0.00, 10, 669.60, 1, 66.96, '2021-09-09 06:55:48', '2021-09-27 16:42:05', NULL),
(8, 702, '2021-08-06', 56778.00, 3, 265721.03, 1, 88573.68, 0, 0.00, 0, 0.00, 4, 354294.72, 0, 0.00, '2021-09-09 06:55:48', '2021-10-02 05:04:01', NULL),
(9, 704, '2021-09-29', 567.00, 0, 0.00, 3, 2653.56, 0, 0.00, 3, 2653.56, 0, 0.00, 0, 0.00, '2021-09-29 13:28:23', '2021-09-29 16:39:03', NULL),
(10, 715, '2021-09-29', 45.90, 0, 0.00, 4, 267.84, 0, 0.00, 3, 200.88, 1, 66.96, 0, 0.00, '2021-09-29 13:28:23', '2021-09-29 13:31:56', NULL),
(11, 702, '2021-10-01', 56778.00, 4, 354294.72, 1, 88573.68, 0, 0.00, 0, 0.00, 5, 442868.41, 0, 0.00, '2021-10-01 17:32:55', '2021-10-02 05:04:01', NULL),
(12, 702, '2021-10-02', 56778.00, 5, 442868.41, 1, 88573.68, 1, 88573.68, 0, 0.00, 6, 531442.06, 0, 0.00, '2021-10-02 05:01:06', '2021-10-02 05:04:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `ID` int(11) NOT NULL,
  `ALT_Code` varchar(20) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_Person` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Address` varchar(1000) DEFAULT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Is_Default` tinyint(1) NOT NULL DEFAULT 0,
  `Deleted_At` datetime DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`ID`, `ALT_Code`, `Name`, `Contact_Person`, `Email`, `Phone`, `State`, `City`, `Address`, `Is_Active`, `Is_Default`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(1, 'IN1', 'BDB 7th Floor', 'spiderman', 'abc@gmail.com', '6661560088', 'Maharashtra', 'Mumbai', 'CE7011-13, 7th Floor, Tower C, G-Block, Bharat Diamond Bourse, BKC, Bandra (E), Mumbai - 400051', 1, 1, NULL, '2021-07-30 06:15:44', '2021-08-30 17:53:17'),
(2, 'IN2', 'BDB 8th Floor', 'spiderman', 'abc@gmail.com', '66615600', 'Maharashtra', 'Mumbai', 'CC8014-15, 8th Floor, Tower C, G-Block, Bharat Diamond Bourse, BKC, Bandra (E), Mumbai - 400051', 1, 0, NULL, '2021-07-30 06:16:33', '2021-07-30 06:16:33'),
(3, 'IN3', 'Gita Office', 'spiderman', 'abc@gmail.com', '68111000', 'Maharashtra', 'Mumbai', 'Office No. 23A, 5th Floor Gita Smruti, Pandita Ramabai Road, Gamdevi, Mumbai - 400007', 1, 0, NULL, '2021-07-30 06:17:14', '2021-07-30 06:17:14'),
(4, 'IN4', 'Panchratna 3rd Floor', 'spiderman', 'abc@gmail.com', '23634492', 'Maharashtra', 'Mumbai', 'Office No. 322-322A, 6th Floor, Panchratna, Mama Parmanand Marg, Opera House, Mumbai - 400004', 1, 0, NULL, '2021-07-30 06:18:02', '2021-07-30 06:18:02'),
(5, 'IN5', 'Panchratna 6th Floor', 'spiderman', 'abc@gmail.com', '23634568', 'Maharashtra', 'Mumbai', 'Office No. 612A, 6th Floor, Panchratna, Mama Parmanand Marg, Opera House, Mumbai - 400004', 1, 0, NULL, '2021-07-30 06:18:49', '2021-07-30 06:18:49'),
(6, 'IN6', 'Vedanta 1st Floor', 'spiderman', 'abc@gmail.com', '68111000', 'Maharashtra', 'Mumbai', 'Unit No. 101, 1 st Floor,Vedanta Building, opp. Jafar Industrial Estate, Makwana Road, Marol, Andheri (E), Mumbai - 400059', 1, 0, NULL, '2021-07-30 06:19:45', '2021-07-30 06:19:45'),
(7, 'IN7', 'Vedanta 2nd Floor', 'spiderman', 'abc@gmail.com', '6811100044', 'Maharashtra', 'Mumbai', 'Unit No. 201, 2nd FloorVedanta Building, opp. Jafar Industrial Estate, Makwana Road, Marol, Andheri (E), Mumbai - 400059', 1, 0, NULL, '2021-07-30 06:20:33', '2021-07-30 14:24:45');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Deleted_At` datetime DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`ID`, `Product_ID`, `Name`, `Is_Active`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(1, 692, 'thor12', 1, NULL, '2021-07-30 13:27:20', '2021-07-30 13:27:20'),
(2, 700, 'thor11', 1, NULL, '2021-07-30 13:27:20', '2021-07-30 13:27:20'),
(3, 700, 'spiderman', 1, NULL, '2021-07-30 13:27:20', '2021-07-30 13:33:22'),
(4, 700, 'Sumit', 1, NULL, '2021-07-30 13:27:52', '2021-07-30 13:27:52'),
(5, 701, 'thor12', 1, NULL, '2021-07-31 01:15:23', '2021-07-31 01:15:23'),
(6, 701, 'thor11', 1, NULL, '2021-07-31 01:15:23', '2021-07-31 01:15:23'),
(7, 701, 'spiderman', 1, NULL, '2021-07-31 01:15:23', '2021-07-31 01:16:42'),
(8, 701, 'Sumit', 1, NULL, '2021-07-31 01:15:23', '2021-07-31 01:43:51'),
(9, 701, 'Sumit1', 1, NULL, '2021-07-31 01:43:39', '2021-07-31 01:43:39'),
(10, 702, 'aaa', 1, '2021-07-31 11:31:22', '2021-07-31 11:23:39', '2021-07-31 11:23:39'),
(11, 702, 'bbb', 1, '2021-07-31 11:31:22', '2021-07-31 11:23:39', '2021-07-31 11:23:39'),
(12, 702, 'ccc', 1, '2021-07-31 11:31:22', '2021-07-31 11:23:39', '2021-07-31 11:23:39'),
(13, 703, 'aaa', 1, '2021-07-31 16:29:22', '2021-07-31 13:15:34', '2021-07-31 13:15:34'),
(14, 703, 'vvvv', 1, '2021-07-31 16:29:22', '2021-07-31 13:15:34', '2021-07-31 13:15:34'),
(15, 703, 'cccc', 1, '2021-07-31 16:29:22', '2021-07-31 13:15:34', '2021-07-31 13:15:34'),
(16, 704, 'aaaaa', 1, '2021-07-31 16:29:59', '2021-07-31 16:28:29', '2021-07-31 16:28:29'),
(17, 704, 'ccccc', 1, '2021-07-31 16:29:59', '2021-07-31 16:28:29', '2021-07-31 16:28:29'),
(18, 704, 'dddd', 1, '2021-07-31 16:29:59', '2021-07-31 16:28:29', '2021-07-31 16:28:29'),
(19, 706, 'thor12', 1, NULL, '2021-08-04 06:16:36', '2021-08-04 06:16:36'),
(20, 706, 'thor11', 1, NULL, '2021-08-04 06:16:36', '2021-08-04 06:16:36'),
(21, 706, 'spiderman', 1, NULL, '2021-08-04 06:16:36', '2021-08-04 06:16:36'),
(22, 706, 'Sumit1', 1, NULL, '2021-08-04 06:16:36', '2021-08-04 06:16:36'),
(23, 707, 'thor12', 1, '2021-08-04 06:21:19', '2021-08-04 06:17:38', '2021-08-04 06:17:38'),
(24, 707, 'thor11', 1, '2021-08-04 06:21:19', '2021-08-04 06:17:38', '2021-08-04 06:17:38'),
(25, 707, 'spiderman', 1, '2021-08-04 06:21:19', '2021-08-04 06:17:38', '2021-08-04 06:17:38'),
(26, 707, 'Sumit1', 1, '2021-08-04 06:21:19', '2021-08-04 06:17:38', '2021-08-04 06:17:38'),
(27, 717, 'thor12', 1, NULL, '2021-08-26 11:34:05', '2021-08-26 11:34:05'),
(28, 717, 'thor11', 1, NULL, '2021-08-26 11:34:05', '2021-08-26 11:34:05'),
(29, 717, 'spiderman', 1, NULL, '2021-08-26 11:34:05', '2021-08-26 11:34:05'),
(30, 717, 'Sumit1', 1, NULL, '2021-08-26 11:34:05', '2021-08-26 11:34:05'),
(31, 717, 'thor112', 1, '2021-08-26 11:46:39', '2021-08-26 11:45:42', '2021-08-26 11:45:42'),
(32, 719, 'harry', 1, NULL, '2021-08-30 17:52:27', '2021-08-30 17:52:27'),
(33, 719, 'john', 1, NULL, '2021-08-30 17:52:27', '2021-08-30 17:52:27'),
(34, 719, 'mack', 1, NULL, '2021-08-30 17:52:27', '2021-08-30 17:52:27'),
(51, 724, 'thor12', 1, NULL, '2021-09-25 12:25:45', '2021-09-25 12:25:45'),
(52, 724, 'thor11', 1, NULL, '2021-09-25 12:25:45', '2021-09-25 12:25:45'),
(53, 724, 'spiderman', 1, NULL, '2021-09-25 12:25:45', '2021-09-25 12:25:45'),
(54, 724, 'Sumit1', 1, NULL, '2021-09-25 12:25:45', '2021-09-25 12:25:45'),
(55, 725, 'thor12', 1, NULL, '2021-09-25 12:28:20', '2021-09-25 12:28:20'),
(56, 725, 'thor11', 1, NULL, '2021-09-25 12:28:20', '2021-09-25 12:28:20'),
(57, 725, 'spiderman', 1, NULL, '2021-09-25 12:28:20', '2021-09-25 12:28:20'),
(58, 725, 'Sumit1', 1, NULL, '2021-09-25 12:28:20', '2021-09-25 12:28:20');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID` int(11) NOT NULL,
  `ALT_Code` varchar(20) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Product_Group` varchar(50) NOT NULL,
  `UOM` varchar(20) NOT NULL,
  `Asset_Holder` enum('IT','Admin') NOT NULL,
  `Category` enum('CAPEX','OPEX') NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Is_Individual_Tracking` tinyint(1) NOT NULL,
  `Price` float(10,2) NOT NULL,
  `Low_Stock_Quantity` int(11) NOT NULL,
  `TAX_Percentage` float(10,2) NOT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Deleted_At` datetime DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ID`, `ALT_Code`, `Name`, `Product_Group`, `UOM`, `Asset_Holder`, `Category`, `Description`, `Is_Individual_Tracking`, `Price`, `Low_Stock_Quantity`, `TAX_Percentage`, `Is_Active`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(1, 'CAPADM000001', 'VRF Outdoor Units 14.8TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 06:09:35'),
(2, 'CAPADM000002', 'VRF Outdoor Units 12.8TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 06:09:48'),
(3, 'CAPADM000003', 'Indr Unt Cealg Mount. Duct. Splts 5.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(4, 'CAPADM000004', 'Indr Unt Cealg Mount. Duct. Splts 4.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(5, 'CAPADM000005', 'Indr Unt Cealg Mount. Duct. Splts 3.1TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(6, 'CAPADM000006', 'Indr Unt Cealg Mount. Duct. Splts 2.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(7, 'CAPADM000007', 'Indr Unt Cealg Mount. Duct. Splts 2TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(8, 'CAPADM000008', 'Indr Unt Cealg Mount. Duct. Splts 1.6TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(9, 'CAPADM000009', 'Indr Unt Cealg Mount. Duct. Splts 1TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(10, 'CAPADM000010', 'High Wall Unit 1.6TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(11, 'CAPADM000011', 'High Wall Unit 1.2TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(12, 'CAPADM000012', 'High Wall Unit 1TR', 'HVAC', 'Nos', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:13:01'),
(13, 'CAPADM000013', 'Casset Unit 1.2TR', 'HVAC', 'Can', 'IT', 'OPEX', 'abcd', 0, 4.00, 6, 1.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:05'),
(14, 'CAPADM000014', 'Non VRV VRF Unit IndoorOutdoor Unit 2TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:12'),
(15, 'CAPADM000015', 'Non VRV VRF Unit IndoorOutdoor Unit 1TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:23'),
(16, 'CAPADM000016', 'AC Ducted Split Unit Indoor Unt 8.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:30'),
(17, 'CAPADM000017', 'AC Ducted Split Unit Indoor Unit 5.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:01:44'),
(18, 'CAPADM000018', 'AC Ducted Split Unit Outdoor Unit 8.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:40'),
(19, 'CAPADM000019', 'AC Ducted Split Unit Outdoor Unit 5.5TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:44'),
(20, 'CAPADM000020', 'AC Ducted Split Unit Outdoor Unit 11TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 09:14:54'),
(21, 'CAPADM000021', 'Drain Pump', 'HVAC', 'Pkt', 'IT', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:06:03'),
(22, 'CAPADM000022', 'Treate. Fres Air Unt TFA 3000CFMESP 55MM', 'HVAC', 'Nos', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 11:15:53'),
(23, 'CAPADM000023', 'Commercial Type System Controller', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(24, 'CAPADM000024', 'HVAC FCU 1.0TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(25, 'CAPADM000106', 'DX Unit 4TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(26, 'CAPADM000025', 'Air Conditioner Toshiba 2 Ton', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(27, 'CAPADM000026', 'Air Conditioner Toshiba 1 Ton', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(28, 'CAPADM000027', 'Aquaguard', 'FACILITY  EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(29, 'CAPADM000028', 'Assortment Lamp 2 in 1 Loose', 'Assortment Lamps', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(30, 'CAPADM000029', 'Assortment Lamp 4 in 1 Loose', 'Assortment Lamps', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(31, 'CAPADM000030', 'Assortment Lamp Singal Fix', 'Assortment Lamps', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(32, 'CAPADM000031', 'Assortment Lamp Singal Loose', 'Assortment Lamps', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(33, 'CAPADM000032', 'Candle Stand', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(34, 'CAPADM000033', 'Ceiling Fan', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(35, 'CAPADM000034', 'Chair With Arm', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(36, 'CAPADM000105', 'Training Table Uni', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(37, 'CAPADM000035', 'Chair Without Arm', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(38, 'CAPADM000036', 'Chimni', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(39, 'CAPADM000037', 'Coffee Machine', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(40, 'CAPADM000038', 'Digital Watch', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(41, 'CAPADM000039', 'Dish Washer', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(42, 'CAPADM000040', 'Door Video Phone', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(43, 'CAPADM000041', 'Electric Sigri', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(44, 'CAPADM000042', 'Electronic Weighing Scale', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(45, 'CAPADM000043', 'Executive Chair', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(46, 'CAPADM000044', 'File Compactor', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(47, 'CAPADM000045', 'Fire Extinguisher ABC 5 kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(48, 'CAPADM000046', 'Fire Extinguisher ABC-2 kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(49, 'CAPADM000047', 'Fire Extinguisher CO2 4.5 kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(50, 'CAPADM000048', 'Fire Extinguisher ABC 6 kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(51, 'CAPADM000049', 'Fire Extinguisher ABC 9 kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(52, 'CAPADM000050', 'Fire Extinguisher Modular Cleanagent 5kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(53, 'CAPADM000051', 'FireExtinguisher Modular Cleanagent 10kg', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(54, 'CAPADM000052', 'Flip Chart Stand With Board', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(55, 'CAPADM000053', 'Fog Machine', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(56, 'CAPADM000054', 'Foldable Table', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(57, 'CAPADM000055', 'Hanging Light Round', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(58, 'CAPADM000056', 'Hot Plate', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(59, 'CAPADM000057', 'Leather Chair', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(60, 'CAPADM000058', 'Locker 15 in 1', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(61, 'CAPADM000059', 'Locker 54 in 1', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(62, 'CAPADM000060', 'MB Name Plate', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(63, 'CAPADM000061', 'Mic', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(64, 'CAPADM000062', 'Mixer', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(65, 'CAPADM000099', 'Microwave', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(66, 'CAPADM000063', 'Motor 3 HP', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(67, 'CAPADM000064', 'Oven', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(68, 'CAPADM000065', 'Painting', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(69, 'CAPADM000066', 'Paper Shredder', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(70, 'CAPADM000067', 'Pedestal Fan', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(71, 'CAPADM000068', 'Plastic Chair', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(72, 'CAPADM000069', 'Plastic Drawer', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(73, 'CAPADM000070', 'Plastic Stool', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(74, 'CAPADM000071', 'Round Chair', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(75, 'CAPADM000072', 'Round Stool', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(76, 'CAPADM000073', 'Steel Sofa', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(77, 'CAPADM000074', 'Table Fan', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(78, 'CAPADM000075', 'Wooden Chair', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(79, 'CAPADM000076', 'Wooden Cupboard', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(80, 'CAPADM000077', 'Wooden Stool', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(81, 'CAPADM000078', 'Wooden Table', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(82, 'CAPADM000079', 'Wooden Towel Stand', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(83, 'CAPADM000080', 'Wooden TV Stand 4 in 1', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(84, 'CAPADM000081', 'Refridgerator', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(85, 'CAPADM000082', 'Sanitizer Stand', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(86, 'CAPADM000083', 'Sofa', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(87, 'CAPADM000084', 'Steel Rack', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(88, 'CAPADM000085', 'Toaster', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(89, 'CAPADM000086', 'Water Cooler', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(90, 'CAPADM000087', 'Water Dispenser', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(91, 'CAPADM000088', 'TV Stand', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(92, 'CAPADM000104', 'Storage Trolley', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(93, 'CAPADM000089', 'Trolly', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(94, 'CAPADM000090', 'Steel Dustbin', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(95, 'CAPADM000091', 'Wall Clock', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(96, 'CAPADM000092', 'Wall Fan', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(97, 'CAPADM000093', 'Waccum Cleaner', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(98, 'CAPADM000094', 'Ultra Sonic Cleaner', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(99, 'CAPADM000095', 'Weighing Scale 50kg Cap', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(100, 'CAPADM000096', 'Weighing Scale TS500 30kg Cap.', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(101, 'CAPADM000097', 'Weighing Scale', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(102, 'CAPADM000098', 'Printer Calculator', 'Office Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(103, 'CAPADM000100', 'LPG Sigri', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(104, 'CAPADM000101', 'Window AC 1.5 TR', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(105, 'CAPADM000102', 'Window AC', 'HVAC', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(106, 'CAPADM000103', 'Water Purifier', 'Pantry Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(107, 'OPX00001', 'Hand Sanitizer', 'Covid Expense', 'CAN', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(108, 'OPX00002', 'Thermometer Gun', 'Covid Expense', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(109, 'OPX00003', 'Masks', 'Covid Expense', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(110, 'OPX00004', 'Assortment Pad MBEPL 11 x 14', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(111, 'OPX00005', 'Assortment Pad MBEPL 11 x 17', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(112, 'OPX00006', 'Assortment Pad Paper 14 x 22', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(113, 'OPX00007', 'Acetone 5 Ltr', 'DIAMOND EXPORT & HANDLING', 'CAN', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(114, 'OPX00008', 'Ultrasonic Cleaner Ultra-Shine UTP-18L', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(115, 'OPX00009', 'Diamond DABBI 3 x 3', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(116, 'OPX00010', 'Diamond DABBI 8 x 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(117, 'OPX00011', 'Diamond DABBI 9 x 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(118, 'OPX00012', 'Diamond DABBI 9 x 6', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(119, 'OPX00013', 'Diamond DABBI 7 x 10', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(120, 'OPX00014', 'Diamond DABBI 9 x 12', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(121, 'OPX00015', 'Diamond DABBI 9 x 5 Imported', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(122, 'OPX00016', 'Diamond DABBI 9 x 6 Imported', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(123, 'OPX00017', 'Diamond DABBI 10 x 7 Imported', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(124, 'OPX00018', 'Diamond DABBI 12 x 9 Imported', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(125, 'OPX00019', 'Flourecent Lamp', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(126, 'OPX00020', 'JANGAD BOOK One Side Print', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(127, 'OPX00021', 'JANGAD BOOK Two Side Print', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(128, 'OPX00022', 'Loop 14X Baush & Lomb IMP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(129, 'OPX00023', 'Eye Loop 14X Sofer', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(130, 'OPX00024', 'Eye Loop LED', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(131, 'OPX00025', 'Loop 14X', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(132, 'OPX00026', 'Loop 10X Baush & Lomb', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(133, 'OPX00027', 'Loop 10X Rubin & Son', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(134, 'OPX00028', 'Inscription Loop ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(135, 'OPX00029', 'Magnifier Loop ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(136, 'OPX00030', 'Air Loop 14X Mehta', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(137, 'OPX00031', 'New York Loop 14X ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(138, 'OPX00032', 'Tripod 10X ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(139, 'OPX00033', 'Tripod 10X 21mm', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(140, 'OPX00034', 'Tripod 14X', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(141, 'OPX00035', 'Magnifier Tripod', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(142, 'OPX00036', 'Cotton Roll', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(143, 'OPX00037', 'Steel Lock 25 mm', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(144, 'OPX00038', 'Export Box Wrapper 23 x 36', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(145, 'OPX00039', 'CC Small Wrapper Sheet 10 x 5 x 1.5 ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(146, 'OPX00040', 'Leather Box 18x14x4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(147, 'OPX00041', 'CC Big Wrapper Sheet 10 x 5 x 2.5 ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(148, 'OPX00042', 'Aluminuim Box 7 X 4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(149, 'OPX00043', 'Aluminuim Box 10 X 7', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(150, 'OPX00044', 'Capsule 72 holes Daimond pck', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(151, 'OPX00045', 'Flutes no 2 Blue Daimond Tools', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(152, 'OPX00046', 'Export Box Wrapper Sheet No.7', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(153, 'OPX00047', 'Export Box Wrapper Sheet No.4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(154, 'OPX00048', 'Export Box Wrapper Sheet No.10', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(155, 'OPX00049', 'Weighing Scale Adopter', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(156, 'OPX00050', 'Weighing Pan White Steel', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(157, 'OPX00051', 'Seaves 112-5 No. I David', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(158, 'OPX00052', 'Seaves 80 No. I David', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(159, 'OPX00053', 'Seaves 82.5 No. I David', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(160, 'OPX00054', 'Selvet Printed', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(161, 'OPX00055', 'Selvet Blue Sigma', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(162, 'OPX00056', 'Leather Key Pouch Medium', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(163, 'OPX00057', 'Leather Key Pouch Small', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(164, 'OPX00058', 'Shovel No.4 Titanum', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(165, 'OPX00059', 'Velvet Tray 9 x 12', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(166, 'OPX00060', 'Velvet Tray 10 x 13', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(167, 'OPX00061', 'Velvet Tray 12 x 15', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(168, 'OPX00062', 'Velvet Tray 12 x 15 x 1', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(169, 'OPX00063', 'Vibrosorb', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(170, 'OPX00064', 'Sealing Wax Red Seal', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(171, 'OPX00065', 'Scoop No. 1', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(172, 'OPX00066', 'Scoop No. 2', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(173, 'OPX00067', 'Scoop No. 3', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(174, 'OPX00068', 'Scoop No. 4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(175, 'OPX00069', 'Scoop No. 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(176, 'OPX00070', 'Candle ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(177, 'OPX00071', 'Air Hand Blow Pump', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(178, 'OPX00072', 'Carpet Brush Soft', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(179, 'OPX00073', 'Carpet Brush Hard', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(180, 'OPX00074', 'Assortment Lamp Tube T-5 Philips', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(181, 'OPX00075', 'Packets White No. 2', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(182, 'OPX00076', 'Packets White No. 2.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(183, 'OPX00077', 'Packets White No. 3', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(184, 'OPX00078', 'Packets White No. 3.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(185, 'OPX00079', 'Packets White No. 4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(186, 'OPX00080', 'Packets Blue No. 2', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(187, 'OPX00081', 'Packets Blue No. 2.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(188, 'OPX00082', 'Packets White No. 2 Cloth', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(189, 'OPX00083', 'Packets White No. 2.5 Cloth', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(190, 'OPX00084', 'Packets White No. 2 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(191, 'OPX00085', 'Packets White No. 2.5 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(192, 'OPX00086', 'Packets White No. 3.5 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(193, 'OPX00087', 'Packets Blue No. 3.5 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(194, 'OPX00089', 'Packets Blue No. 2.5 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(195, 'OPX00090', 'Packets Colour No. 2.5 Crystal Sponge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(196, 'OPX00091', 'Packets Blue No. 3', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(197, 'OPX00092', 'Packets Blue No. 3.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(198, 'OPX00093', 'Packets Blue No. 4', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(199, 'OPX00094', 'Packets Colour No. 3.5 FWN', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(200, 'OPX00096', 'Packets White No. 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(201, 'OPX00097', 'Packets B Pink Printed Black', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(202, 'OPX00098', 'Packets Blue No.6', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(203, 'OPX00099', 'Packets Blue No.8', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(204, 'OPX00100', 'Packets Blue No.4 Velvet', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(205, 'OPX00101', 'Packets Blue No. 10', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(206, 'OPX00102', 'Packets SD GOG No.2', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(207, 'OPX00103', 'Packets SD GOG No.2.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(208, 'OPX00104', 'Packets SD GOG No.3', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(209, 'OPX00105', 'Packets SD GOG No.3.5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(210, 'OPX00106', 'Export Box No. 04 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(211, 'OPX00107', 'Export Box No. 07 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(212, 'OPX00108', 'Leather Box 10 x 6.5 x 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(213, 'OPX00109', 'Packing Box Layout 2x8', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(214, 'OPX00110', 'Export Box No. 10 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(215, 'OPX00111', 'Export Box No. 12 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(216, 'OPX00112', 'Export Box No. 14 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(217, 'OPX00113', 'Export Box No. 16 GP Heavy', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(218, 'OPX00114', 'Export Box No. 18 GP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(219, 'OPX00115', 'Export Box No. 20 GP Heavy 35G', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(220, 'OPX00116', 'Export Box No. 22 GP Heavy 35G', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(221, 'OPX00117', 'Export Box No. 24 GP Heavy 35G', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(222, 'OPX00118', 'Export Box 14 x 12 x 3 SP Size ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(223, 'OPX00119', 'Export Box CC Small GP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(224, 'OPX00120', 'Export Box CC Big GP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(225, 'OPX00121', 'Export Box 7 x 8 x 2.5 GP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(226, 'OPX00122', 'Export Box 7 x 10 x 2.5 GP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(227, 'OPX00123', 'Plastic Box No. 1100 Innova', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(228, 'OPX00124', 'Alluminium Box No. 7 ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(229, 'OPX00125', 'Adding Machine Roll', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(230, 'OPX00126', 'Printer Calculator Ribbon Super Tech', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(231, 'OPX00127', 'Digital Guage Presodium', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(232, 'OPX00128', 'Digital Guage WJT', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(233, 'OPX00129', 'Digital Guage WJT Round', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(234, 'OPX00130', 'Digital Guage Gemax 25mm', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(235, 'OPX00131', 'Digital Guage Gemax 15mm', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(236, 'OPX00132', 'Tweezer Holewala', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(237, 'OPX00133', 'Tweezer', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(238, 'OPX00134', 'Tweezer INOX', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(239, 'OPX00135', 'Tweezer Titanium', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(240, 'OPX00136', 'Air Tweezer Sofer Xf', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(241, 'OPX00137', 'Air Tweezer', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(242, 'OPX00138', 'Tripod 10 plus triplet', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(243, 'OPX00139', 'Zip Lock Bag 1.5 x 2', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(244, 'OPX00140', 'Zip Lock Bag 2 x 3 250 Gauge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(245, 'OPX00141', 'Zip Lock Bag 3 x 4 250 Guage', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(246, 'OPX00142', 'Zip Lock Bag 4 x 5', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(247, 'OPX00143', 'Zip Lock Bag 5 x 7  250 Gauge', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(248, 'OPX00144', 'Zip Lock Bag 8 x 10 SVP', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(249, 'OPX00145', 'Zip Lock Bag 10 x 12 250 Guage', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(250, 'OPX00146', 'Zip Lock Bag 10 x 14 250 Guage', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(251, 'OPX00147', 'Zip Lock Bag 1.5 x 2 I P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(252, 'OPX00148', 'Zip Lock Bag 2 x 3 P Pkt ', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(253, 'OPX00149', 'Zip Lock Bag 5 x 7 cm P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(254, 'OPX00150', 'Zip Lock Bag 6 x 8 cm P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(255, 'OPX00151', 'Zip Lock Bag 7 x 9 cm P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(256, 'OPX00152', 'Zip Lock Bag 8 x 12 cm P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(257, 'OPX00153', 'Zip Lock Bag 9 x 13 cm P Pkt', 'DIAMOND EXPORT & HANDLING', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(258, 'OPX00154', 'Sasa Liquid 5Ltr', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(259, 'OPX00155', 'Scotch Brite Sponge 1 pc', 'HK Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(260, 'OPX00156', 'Glass Duster', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(261, 'OPX00157', 'Wet Mop Refil', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(262, 'OPX00158', 'Sani Cubes', 'HK Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(263, 'OPX00159', 'Hand Gloves Rubber', 'HK Material', 'PAIR', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(264, 'OPX00160', 'Colin Spray 500 ML', 'HK Material', 'BOTTLE', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(265, 'OPX00161', 'Room Freshner Godrej', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(266, 'OPX00162', 'Air Pocket Godrej 10gm', 'HK Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(267, 'OPX00163', 'Floor Duster', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(268, 'OPX00164', 'Yellow Duster', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(269, 'OPX00165', 'Kandi Broom', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(270, 'OPX00166', 'Red Hit Spray', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(271, 'OPX00167', 'Floor Mop', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(272, 'OPX00168', 'Plastic Brush Gala Gold', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(273, 'OPX00169', 'Kitchen Wiper Gala', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(274, 'OPX00170', 'Toilet Wiper Gala', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(275, 'OPX00171', 'Garbage Bags Big 38 x 48 ', 'HK Material', 'ROLL', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(276, 'OPX00172', 'Garbage Bags Big 40 x 50', 'HK Material', 'ROLL', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(277, 'OPX00173', 'Garbage Bags Small 19 x 21', 'HK Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(278, 'OPX00174', 'FEM HANDWASH', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(279, 'OPX00175', 'Taski R6 5 Ltr', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(280, 'OPX00176', 'Taski R3 5 Ltr', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(281, 'OPX00177', 'Tissue Paper Roll', 'HK Material', 'ROLL', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(282, 'OPX00178', 'M Fold Tissue Paper', 'HK Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(283, 'OPX00179', 'Urinal Mat', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(284, 'OPX00180', 'Taski R2 5 ltr', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(285, 'OPX00181', 'Wet Mop Set Heavy', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(286, 'OPX00182', 'Dry Mop Set Heavy', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(287, 'OPX00183', 'Plastic Bucket 12 ltr', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(288, 'OPX00184', 'Glass Wiper 18', 'HK Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(289, 'OPX00185', 'Taski R5', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(290, 'OPX00186', 'Taski R1 5 ltr', 'HK Material', 'CAN', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(291, 'OPX00187', 'Lemon Tea', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(292, 'OPX00188', 'Coffee Continental', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(293, 'OPX00189', 'Ginger Tea', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(294, 'OPX00190', 'Paper Plate', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(295, 'OPX00191', 'Goodday 66 gm', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(296, 'OPX00192', 'Coffee Mug', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(297, 'OPX00193', 'Dairy Milk 13.2g', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(298, 'OPX00194', 'Himalaya Water 500 ml', 'Pantry Material', 'BOTTLE', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10');
INSERT INTO `products` (`ID`, `ALT_Code`, `Name`, `Product_Group`, `UOM`, `Asset_Holder`, `Category`, `Description`, `Is_Individual_Tracking`, `Price`, `Low_Stock_Quantity`, `TAX_Percentage`, `Is_Active`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(299, 'OPX00195', 'Bisleri 500 ml', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(300, 'OPX00196', 'Bisleri 250 ml', 'Pantry Material', 'BOTTLE', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(301, 'OPX00197', 'Britania Jim Jam Treat', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(302, 'OPX00198', 'Britani Cashew Cookies 100 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(303, 'OPX00199', 'Britania Jim Jam 100 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(304, 'OPX00200', 'Unibic Buiscuit', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(305, 'OPX00201', 'Hide & Sick 120 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(306, 'OPX00202', 'Monaco 37 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(307, 'OPX00203', 'Parle G 65 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(308, 'OPX00204', 'Marie Gold 43 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(309, 'OPX00205', 'Borborn 60 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(310, 'OPX00206', 'Digestive Nutry Choice 100 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(311, 'OPX00207', 'Diet Coke 300 ml', 'Pantry Material', 'BOTTLE', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(312, 'OPX00208', 'Coca Cola 300 ml', 'Pantry Material', 'BOTTLE', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(313, 'OPX00209', 'Sugar', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(314, 'OPX00210', 'Sugar Cube Daurala', 'Pantry Material', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(315, 'OPX00211', 'Society Tea Masala 500 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(316, 'OPX00212', 'Green Tea Bag', 'Pantry Material', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(317, 'OPX00213', 'Lemon Tea Bag', 'Pantry Material', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(318, 'OPX00214', 'Amul Butter 500 gm', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(319, 'OPX00215', 'Nes Coffee 500 gm', 'Pantry Material', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(320, 'OPX00216', 'Nes Coffee 200 gm', 'Pantry Material', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(321, 'OPX00217', 'Cow Ghee Dynimix 500 gm', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(322, 'OPX00218', 'Haldi 200 gm', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(323, 'OPX00219', 'Chilly Powder', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(324, 'OPX00220', 'Chas Masala Kapol', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(325, 'OPX00221', 'Tea Masala Everest', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(326, 'OPX00222', 'Kisan Tomato Ketchup', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(327, 'OPX00223', 'Kisan Jain Sauc', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(328, 'OPX00224', 'Silver Foil Jackson', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(329, 'OPX00225', 'Hincallo Wrap 9 mtrs', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(330, 'OPX00226', 'Badshah Kamal Tea', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(331, 'OPX00227', 'Nestle A plus', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(332, 'OPX00228', 'Diya Wat', 'Pantry Material', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(333, 'OPX00229', 'Tata Salt', 'Pantry Material', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(334, 'OPX00230', 'Citizen Calculator CT512 12 Digit', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(335, 'OPX00231', 'Casio Calculator MJ120 12 Digit', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(336, 'OPX00232', 'Casio Calculator DJ120 plus 12 Digit', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(337, 'OPX00233', 'Casio Printer Calculator DR120 TM', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(338, 'OPX00234', 'Dura cell AA', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(339, 'OPX00235', 'Dura cell AAA', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(340, 'OPX00236', 'Button Cell ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(341, 'OPX00237', 'Eveready Cell AAA Rechargeble', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(342, 'OPX00238', 'Binder Clip 15 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(343, 'OPX00239', 'Binder Clip 19 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(344, 'OPX00240', 'Binder Clip 25 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(345, 'OPX00241', 'Binder Clip 32 mm', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(346, 'OPX00242', 'Binder Clip 41 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(347, 'OPX00243', 'Binder Clip 51 mm', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(348, 'OPX00244', 'Branch Clips ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(349, 'OPX00245', 'Cutter Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(350, 'OPX00246', 'Cutter Medium', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(351, 'OPX00247', 'Cutter Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(352, 'OPX00248', 'Cutter Steel', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(353, 'OPX00249', 'Cutter Big Metal ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(354, 'OPX00250', 'SDI Lamination Cutter 0103', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(355, 'OPX00251', 'Brown Envelope 4.5 x 9.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(356, 'OPX00252', 'Brown Envelope 4 x 9', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(357, 'OPX00253', 'Brown Enveope 3 x 4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(358, 'OPX00254', 'Brown Enveope 4 x 5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(359, 'OPX00255', 'Brown Enveope 4 x 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(360, 'OPX00256', 'Brown Enveope 4 x 7', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(361, 'OPX00257', 'Brown Envelope 5 x 11', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(362, 'OPX00258', 'Brown Enveope 6 x 9', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(363, 'OPX00259', 'Brown Envelope 7 x 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(364, 'OPX00260', 'Brown Envelope 8 x 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(365, 'OPX00261', 'Brown Envelope A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(366, 'OPX00262', 'Brown Envelope 10 x 14', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(367, 'OPX00263', 'Brown Envelope 12 x 16', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(368, 'OPX00264', 'White Envelope 3x 4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(369, 'OPX00265', 'White Envelope 4 x 5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(370, 'OPX00266', 'White Enveope 4 x 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(371, 'OPX00267', 'White Envelope 4 x 7', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(372, 'OPX00268', 'White Envelope 4.5 x 5.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(373, 'OPX00269', 'White Envelope 4.5 x 9.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(374, 'OPX00270', 'White Envelope 5 x 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(375, 'OPX00271', 'White Envelope 5.5x 6.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(376, 'OPX00272', 'White Envelope 5 x 11', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(377, 'OPX00273', 'White Envelope 6 x 7', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(378, 'OPX00274', 'White Envelope 6 x 9', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(379, 'OPX00275', 'White Envelope 7 x 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(380, 'OPX00276', 'White Envelope 8 x 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(381, 'OPX00277', 'White Envelope A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(382, 'OPX00278', 'Cloth Envelope 4.5 x 9.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(383, 'OPX00279', 'Cloth Envelope 5 x 11', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(384, 'OPX00280', 'Cloth Envelope 10 x 12', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(385, 'OPX00281', 'Cloth Envelope 10 x 14', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(386, 'OPX00282', 'Cloth Envelope 12 x 14', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(387, 'OPX00283', 'Cloth Envelope 12 x 16', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(388, 'OPX00284', 'MBEPL Envelope 4.5 x 9.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(389, 'OPX00285', 'MBEPL Envelope A4 ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(390, 'OPX00286', 'Job Cover ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(391, 'OPX00287', 'Eraser Apsara Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(392, 'OPX00288', 'Eraser Apsara Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(393, 'OPX00289', 'Spring File', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(394, 'OPX00290', 'Spring File SPS2585', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(395, 'OPX00291', 'Spring File SPS 307T File', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(396, 'OPX00292', 'Plastic Patti File A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(397, 'OPX00293', 'Plastic Display File A4 20 Pocket', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(398, 'OPX00294', 'Plastic Display File FC 20 Pocket ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(399, 'OPX00295', 'Neo Swing Grip File 171 A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(400, 'OPX00296', 'Box File Steel Clip', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(401, 'OPX00297', 'Box File Surangiwala', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(402, 'OPX00298', 'Box File Half Level Surangiwala', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(403, 'OPX00299', 'Voucher Box File', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(404, 'OPX00300', 'Filing Cloth Red', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(405, 'OPX00301', 'Filing Cloth Green', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(406, 'OPX00302', 'Filing Cloth Yellow', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(407, 'OPX00303', 'Plastic Folder A4 L Type', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(408, 'OPX00304', 'Plastic Folder FC L Type', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(409, 'OPX00305', 'Swep Folder A4 Thick', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(410, 'OPX00306', 'Punch Folder A4 Thick', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(411, 'OPX00307', 'Punch Folder FC Thick', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(412, 'OPX00308', 'Paper Folder L Type A4 White', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(413, 'OPX00309', 'Paper Folder L Type A4 Craft', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(414, 'OPX00310', 'Paper Folder L Type Legal White', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(415, 'OPX00311', 'Paper Folder L Type Legal Craft', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(416, 'OPX00312', 'Paper Punch Folder A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(417, 'OPX00313', 'Paper Punch Folder Legal', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(418, 'OPX00314', 'Piyano Folder FC', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(419, 'OPX00315', 'Visiting Card Folder 120 Cards', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(420, 'OPX00316', 'Glue Stick 15 GM', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(421, 'OPX00317', 'Gum Bottle 100 ML Camlin', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(422, 'OPX00318', 'Fevi Quick', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(423, 'OPX00319', 'Letter Head A4', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(424, 'OPX00320', 'Letter Head Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(425, 'OPX00321', 'Water Bottle Aquapet', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(426, 'OPX00322', 'Dust Bin Plastic', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(427, 'OPX00323', 'Cloth Bag', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(428, 'OPX00324', 'Tea Serving Tray Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(429, 'OPX00325', 'Flip Chart Stand', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(430, 'OPX00326', 'Flip Chart Roll', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(431, 'OPX00327', 'Cloth Bag Blue', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(432, 'OPX00328', 'Pen Stand', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(433, 'OPX00329', 'Spunch Box', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(434, 'OPX00330', 'Sharpner', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(435, 'OPX00331', 'Key Chain Plastic', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(436, 'OPX00332', 'Mouse Pad ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(437, 'OPX00333', 'Magnetic Duster', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(438, 'OPX00334', 'Keyboard Cleaner Brush', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(439, 'OPX00335', 'File Divider', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(440, 'OPX00336', 'Drawing Brush No. 1', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(441, 'OPX00337', 'Drawing Brush No. 2', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(442, 'OPX00338', 'Drawing Brush No. 5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(443, 'OPX00339', 'Drawing Brush No. 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(444, 'OPX00340', 'Cartons 40 x 24 x 12', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(445, 'OPX00341', 'Cartons 16 x 12 x 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(446, 'OPX00342', 'Bubble Paper Roll', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(447, 'OPX00343', 'Brown Corrugated Roll ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(448, 'OPX00344', 'Note Book 100 Pages', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(449, 'OPX00345', 'Note Book200 Pages', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(450, 'OPX00346', 'Long Book 100 Pages', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(451, 'OPX00347', 'Long Book 200 Pages', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(452, 'OPX00348', 'Visit Book 200 Pages', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(453, 'OPX00349', 'A4 Size Paper J K Sparkle Pkt', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(454, 'OPX00350', 'FC Size Paper JK Copier Pkt', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(455, 'OPX00351', 'A4 Size Paper Pink Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(456, 'OPX00352', 'A4 Size Paper Blue Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(457, 'OPX00353', 'A5 Size Paper JK Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(458, 'OPX00354', 'A3 Size Paper Copy Power Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(459, 'OPX00355', 'A4 Executive Bond Paper 100 GSM Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(460, 'OPX00356', 'A4 Executive Bond Paper 85 GSM Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(461, 'OPX00357', 'A3 Executive Bond Paper 100 GSM Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(462, 'OPX00358', 'Legder Paper A4 90 GSM Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(463, 'OPX00359', 'Legder Paper FC 90 GSM Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(464, 'OPX00360', 'Lexi Ball Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(465, 'OPX00361', 'Add Gel Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(466, 'OPX00362', 'Use & Throw Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(467, 'OPX00363', 'Correction Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(468, 'OPX00364', 'Multimarker Pen Faber Castell', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(469, 'OPX00365', 'Reynolds Racer Gel Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(470, 'OPX00366', 'Gliter Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(471, 'OPX00367', 'Cello Pointec Gel Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(472, 'OPX00368', 'Graphic Pen Luxer', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(473, 'OPX00369', 'Permanent Marker Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(474, 'OPX00370', 'White Board Marker', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(475, 'OPX00371', 'Uniball Pen', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(476, 'OPX00372', 'Highlighter', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(477, 'OPX00373', 'Apsara Platium Pencil ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(478, 'OPX00374', 'Natraj Pencil ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(479, 'OPX00375', 'Pen Pencil 0.5 Cello Supreme', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(480, 'OPX00376', 'Pen Pencil 0.7 Faber Castell', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(481, 'OPX00377', 'Pencil Lead 0.5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(482, 'OPX00378', 'Pencil Lead 0.7', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(483, 'OPX00379', 'Doms Pencil ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(484, 'OPX00380', 'U Pin 26mm Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(485, 'OPX00381', 'U Pin 35mm Pkt', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(486, 'OPX00382', 'Stapler Pin Kangaro 10 No.', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(487, 'OPX00383', 'Stapler Pin Kangaro 24 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(488, 'OPX00384', 'Stapler Pin Kangaro 26 6', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(489, 'OPX00385', 'Stapler Pin Kangaro 23 8', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(490, 'OPX00386', 'Stapler Pin Kangaro 23 10', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(491, 'OPX00387', 'Stapler Pin Kangaro 23 13', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(492, 'OPX00388', 'Stapler Pin Kangaro 23 15', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(493, 'OPX00389', 'U Pin Plastic 28 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(494, 'OPX00390', 'U Pin Plastic 35 mm', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(495, 'OPX00391', 'Soft Board Pin', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(496, 'OPX00392', 'T Pin Box 400 GMS Box', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(497, 'OPX00393', 'Pin Magnet Box', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(498, 'OPX00394', 'Post It Pad 5 Colour', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(499, 'OPX00395', 'Post It Pad 4 Colour', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(500, 'OPX00396', 'Post It Pad 75 x 25 3 Colour', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(501, 'OPX00397', 'Post It Pad 1.5 x 2', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(502, 'OPX00398', 'Post It Pad 2x 3', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(503, 'OPX00399', 'Post It Pad 3 x 3', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(504, 'OPX00400', 'Post It Pad 3 x 4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(505, 'OPX00401', 'Post It Pad  3 x 5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(506, 'OPX00402', 'Post It Flag  Sign Here', 'STATIONERY', 'PKT', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(507, 'OPX00403', 'Voucher Book', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(508, 'OPX00404', 'Visiting Card', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(509, 'OPX00405', 'Birthday Greeting Card', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(510, 'OPX00406', 'Coffee Mug Printing ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(511, 'OPX00407', 'Gate Pass Book', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(512, 'OPX00408', 'Punch Machine DP 600', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(513, 'OPX00409', 'Punch Machine DP 800', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(514, 'OPX00410', 'Add Gel Refill', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(515, 'OPX00411', 'Cordin Refil', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(516, 'OPX00412', 'Lexi Refill', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(517, 'OPX00413', 'Jotter Pen Refill', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(518, 'OPX00414', 'Register 1Q', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(519, 'OPX00415', 'Register 2Q', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(520, 'OPX00416', 'Register 3Q', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(521, 'OPX00417', 'Register 4Q', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(522, 'OPX00418', 'Register 6Q', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(523, 'OPX00419', 'Register MCW 1Q Master Roll', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(524, 'OPX00420', 'Register MCW 2Q Master Roll', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(525, 'OPX00421', 'Nylon Rubber Band 12 No Leera', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(526, 'OPX00422', 'Nylon Rubber Band 19 No Leera', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(527, 'OPX00423', 'Ruller 12 Steel', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(528, 'OPX00424', 'Scissor Small Kangaro', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(529, 'OPX00425', 'Scissor Medi. Kangaro', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(530, 'OPX00426', 'Scissor Big Kangaro', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(531, 'OPX00427', 'Stamp Pad Camlin Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(532, 'OPX00428', 'Stamp Pad Faber Castel Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(533, 'OPX00429', 'Stamp Pad Ink 100 ML Camel', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(534, 'OPX00430', 'Nylon Rubber Stamp Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(535, 'OPX00431', 'Nylon Rubber Stamp Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(536, 'OPX00432', 'Stapler HD 10D Kangaro', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(537, 'OPX00433', 'Stapler Kangaroo 10 No.', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(538, 'OPX00434', 'Stapler Kangaroo HP45', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(539, 'OPX00435', 'Stapler Pin Remover SR100 Kangaro', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(540, 'OPX00436', 'Sticker No. 3', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(541, 'OPX00437', 'Sticker No. 00', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(542, 'OPX00438', 'Sticker No. 18', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(543, 'OPX00439', 'Colour Sticker 1.5 Round', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(544, 'OPX00440', '103 Round Colour Sticker', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(545, 'OPX00441', 'Multi Label Sticker P9', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(546, 'OPX00442', 'Sticker A4 12 Punchline', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(547, 'OPX00443', 'Sticker A4 16 Punchline', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(548, 'OPX00444', 'Hole Guard Sticker', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(549, 'OPX00445', 'Sticker Round', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(550, 'OPX00446', 'Sticker Air Freight', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(551, 'OPX00447', 'Cello Tape 1/2', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(552, 'OPX00448', 'Cello Tape 1 Thick', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(553, 'OPX00449', 'Cello Tape 1 Jumbo 1 x 100mtr', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(554, 'OPX00450', 'Cello Tape 2 Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(555, 'OPX00451', 'Brown Tape 2 Jumbo 2 x 100mtr', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(556, 'OPX00452', 'Brown Tape 4 Jumbo ', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(557, 'OPX00453', 'PVC Insulation Tape', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(558, 'OPX00454', 'Abro Tape Masking Tape 1in', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(559, 'OPX00455', 'Abro Tape Masking Tape 2inc', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(560, 'OPX00456', 'Correction Tape', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(561, 'OPX00457', 'Foam Tape 1', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(562, 'OPX00458', 'Foam Tape 2', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(563, 'OPX00459', 'Cello Tape Dispenser Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(564, 'OPX00460', 'Cello Tape Dispenser Big', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(565, 'OPX00461', 'Plastic Rassi Roll', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(566, 'OPX00462', 'Tissue Paper Box Jackson Harmony', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(567, 'OPX00463', 'Tissue Paper Box Jackson Maruti', 'STATIONERY', 'BOX', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(568, 'OPX00464', 'Tissue Roll Soft Selpak', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(569, 'OPX00465', 'Tissue Napkin Pkt', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(570, 'OPX00466', 'Hp Deskjet GT 5821 Cartridge', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(571, 'OPX00467', 'Toner 78A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(572, 'OPX00468', 'Toner 88A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(573, 'OPX00469', 'Toner 49A Refurbish Canon 308', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(574, 'OPX00470', 'Toner 12A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(575, 'OPX00471', 'Toner FX9 Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(576, 'OPX00472', 'Toner 05A Refurbish 319', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(577, 'OPX00473', 'Tonner 337A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(578, 'OPX00474', 'Tonner 925A Refurbish Canon', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(579, 'OPX00475', 'Toner 28A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(580, 'OPX00476', 'Tonner 051 Refurbish Canon', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(581, 'OPX00477', 'Drum Unit 051 Refurbish Canon', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(582, 'OPX00478', 'Toner 328 Refurbrish Canon', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(583, 'OPX00479', 'Tonner 319A Refurbish', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(584, 'OPX00480', 'Canon PG745 Small B Cartridge', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(585, 'OPX00481', 'Writing Pad Small Sunny', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(586, 'OPX00482', 'Writing Pad Medium Sunny', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(587, 'OPX00483', 'Writing Pad Big Sunny', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(588, 'OPX00484', 'Writing Pad FC Full Size Sunny', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(589, 'OPX00485', 'Writing Pad Matrix A5', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(590, 'OPX00486', 'Writing Pad Matrix A4', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(591, 'OPX00487', 'Writing Pad 1 by 4 Sundaram', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(592, 'OPX00488', 'Writing Pad 1 by 6 Sundaram', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(593, 'OPX00489', 'Writing Pad 1 by 8 Sundaram', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(594, 'OPX00490', 'Writing Pad 1 by 12 Sundaram', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(595, 'OPX00491', 'Spiral Pad No. 2 Ajanta Small', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(596, 'OPX00492', 'Writing Pad MBEPL', 'STATIONERY', 'NOS', 'Admin', 'OPEX', '', 0, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(597, 'CAPIT000001', 'Video Door Phone', 'Access Control Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(598, 'CAPIT000002', 'Access Control Panel', 'Access Control Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(599, 'CAPIT000003', 'Bio Stamp Reader', 'Access Control Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(600, 'CAPIT000004', 'Video Door Bell', 'Access Control Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(601, 'CAPIT000005', 'Amplifier Controllor', 'BMS-CCTV Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(602, 'CAPIT000006', 'Creston Processer', 'BMS-CCTV Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(603, 'CAPIT000007', 'Distriburation Amplifire', 'BMS-CCTV Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(604, 'CAPIT000008', 'Video Switcher', 'BMS-CCTV Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(605, 'CAPIT000009', 'CCTV Video Switcher', 'BMS-CCTV Equipments', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(606, 'CAPIT000010', 'Dome Camera', 'CCTV Camera', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(607, 'CAPIT000011', 'HD Camera', 'CCTV Camera', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(608, 'CAPIT000012', 'IP Camera', 'CCTV Camera', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(609, 'CAPIT000013', 'DVR 4 Ch', 'DIGITAL VEDIO RECORDER', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(610, 'CAPIT000014', 'DVR 16 Ch', 'DIGITAL VEDIO RECORDER', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(611, 'CAPIT000015', 'DVR 32 Ch', 'DIGITAL VEDIO RECORDER', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(612, 'CAPIT000016', 'DVR 256 Ch', 'DIGITAL VEDIO RECORDER', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(613, 'CAPIT000017', 'NVR 32 Ch', 'DIGITAL VEDIO RECORDER', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(614, 'CAPIT000018', 'Fire Pannel', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10');
INSERT INTO `products` (`ID`, `ALT_Code`, `Name`, `Product_Group`, `UOM`, `Asset_Holder`, `Category`, `Description`, `Is_Individual_Tracking`, `Price`, `Low_Stock_Quantity`, `TAX_Percentage`, `Is_Active`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(615, 'CAPIT000019', 'Heat Detector', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(616, 'CAPIT000020', 'Hooter', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(617, 'CAPIT000021', 'MCP Manual Call Point', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(618, 'CAPIT000022', 'Rodent', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(619, 'CAPIT000023', 'Smoke Detector', 'FIRE ALARM SYSTEM', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(620, 'CAPIT000024', 'TV 14 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(621, 'CAPIT000025', 'TV 17 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(622, 'CAPIT000026', 'TV 19 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(623, 'CAPIT000027', 'TV 24 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(624, 'CAPIT000028', 'TV 32 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(625, 'CAPIT000029', 'TV 86 Inch', 'Television Sets', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(626, 'CAPIT000030', 'Digital 6 Key Phone', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(627, 'CAPIT000031', 'Digital 8 Key Phone', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(628, 'CAPIT000032', 'Digital 12 Key Phone', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(629, 'CAPIT000034', 'Digital 24 Key Phone', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(630, 'CAPIT000035', 'Digital Phone Console', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(631, 'CAPIT000036', 'EPABX', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(632, 'CAPIT000037', 'IP Phone With Display', 'TELEPHONE EQUIPMENTS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(633, 'CAPIT000038', 'ATS  Automatic Transfer Switch ', 'Rack / PDU / Spike', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(634, 'CAPIT000039', 'PDU Server', 'Rack / PDU / Spike', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(635, 'CAPIT000040', '8 Ch SMPS', 'SMPS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(636, 'CAPIT000041', '16 Ch SMPS', 'SMPS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(637, 'CAPIT000042', 'Server SMPS', 'SMPS', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(638, 'CAPIT000043', 'UPS 1 KV', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(639, 'CAPIT000044', 'UPS 3 KV', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(640, 'CAPIT000045', 'UPS 5 KV', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(641, 'CAPIT000046', 'UPS 20 KV', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(642, 'CAPIT000047', 'UPS 40 KV', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(643, 'CAPIT000048', '65 AH Battery', 'UPS And Battrey', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-08-30 17:50:14'),
(644, 'CAPIT000049', 'SERVER', 'Computers All Types', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(645, 'CAPIT000050', 'All In One PC', 'Computers All Types', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(646, 'CAPIT000051', 'Desktop', 'Computers All Types', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(647, 'CAPIT000052', 'LAPTOP', 'Computers All Types', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(648, 'CAPIT000053', 'Thin Client', 'Computers All Types', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(649, 'CAPIT000054', 'Firewall', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(650, 'CAPIT000055', 'Storage', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(651, 'CAPIT000056', 'Barcode Scanner', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(652, 'CAPIT000057', 'Key Board With Cord', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(653, 'CAPIT000058', 'Key Board Without Cord', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(654, 'CAPIT000059', 'Mouse With Cord', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(655, 'CAPIT000060', 'Mouse without Cord', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(656, 'CAPIT000061', 'RF ID Scanner', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(657, 'CAPIT000062', 'Sarin Machine', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(658, 'CAPIT000063', 'Scanner', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(659, 'CAPIT000064', 'Projector', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(660, 'CAPIT000065', 'Apple TV', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(661, 'CAPIT000066', 'Audio Amplifire', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(662, 'CAPIT000067', 'CUE Controller', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(663, 'CAPIT000068', 'DVD Player', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(664, 'CAPIT000069', 'HDMI Switcher', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(665, 'CAPIT000070', 'Lutron Button Panel', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(666, 'CAPIT000071', 'Lutron Light Controller', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(667, 'CAPIT000073', 'Video Conference Device', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(668, 'CAPIT000074', 'WOW Vision', 'Computer And Accessories', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(669, 'CAPIT000075', 'Inkjet Fax', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(670, 'CAPIT000076', 'Barcode Printer', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(671, 'CAPIT000077', 'Deskjet - IP', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(672, 'CAPIT000078', 'LeaseJet All In One -  USB', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(673, 'CAPIT000079', 'LeaserJet - IP', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(674, 'CAPIT000080', 'LeaserJet - USB', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(675, 'CAPIT000081', 'MFD Printer', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(676, 'CAPIT000082', 'RF ID Printer', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(677, 'CAPIT000083', 'Thermal Printer', 'FAX', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(678, 'CAPIT000084', 'MONITOR 14\"', 'Monitor', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(679, 'CAPIT000085', 'MONITOR 17\"', 'Monitor', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(680, 'CAPIT000086', 'MONITOR 19\"', 'Monitor', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(681, 'CAPIT000087', 'MONITOR 20\"', 'Monitor', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(682, 'CAPIT000088', 'MONITOR 24\"', 'Monitor', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(683, 'CAPIT000089', '8 Port PoE Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-31 13:20:42'),
(684, 'CAPIT000090', '8 Port Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(685, 'CAPIT000091', '16 Port Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(686, 'CAPIT000092', '24 Port L2 Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(687, 'CAPIT000093', '24 Port PoE Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(688, 'CAPIT000094', '28 Port L2 Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(689, 'CAPIT000095', '48 Port L2 Switch', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(690, 'CAPIT000096', 'Access Point', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(691, 'CAPIT000097', 'Router Basic', 'Switches and Routers', 'NOS', 'Admin', 'CAPEX', '', 1, 0.00, 5, 0.00, 1, NULL, '2021-07-30 10:29:10', '2021-07-30 10:29:10'),
(692, 'IN1', 'Pen', 'Education', 'kg', 'Admin', 'CAPEX', 'This is testing', 1, 10.00, 5, 5.00, 1, NULL, '2021-07-30 10:37:42', '2021-08-18 09:27:11'),
(693, 'IN2', 'Mask', 'Health', 'Pkt', 'Admin', 'OPEX', 'This is testing', 0, 25.00, 5, 5.00, 1, NULL, '2021-07-30 10:37:42', '2021-08-18 09:27:11'),
(694, 'IN3', 'Notebook', 'Education', 'Box', 'Admin', 'CAPEX', 'This is testing', 1, 30.00, 5, 5.00, 1, NULL, '2021-07-30 10:41:20', '2021-08-18 09:27:11'),
(695, 'IN4', 'cardsheet', 'Education', 'Nos', 'Admin', 'CAPEX', 'This is testing', 1, 20.00, 5, 5.00, 1, NULL, '2021-07-30 10:41:20', '2021-08-18 09:27:11'),
(697, 'Alto7890', 'Headphone', 'Material group', 'Gram', 'Admin', 'CAPEX', 'Added', 1, 77.00, 45, 67.00, 1, NULL, '2021-07-30 11:15:19', '2021-07-30 11:15:19'),
(700, 'IN100', 'spiderman3', 'dj', 'sfsdf', 'Admin', 'OPEX', 'this is testing1', 0, 45.90, 12, 45.88, 1, NULL, '2021-07-30 12:41:58', '2021-07-30 13:33:22'),
(701, 'IN101', 'spiderman101', 'dj', 'sfsdf', 'Admin', 'OPEX', 'this is testing1', 0, 45.90, 12, 45.88, 1, NULL, '2021-07-31 01:15:23', '2021-07-31 01:43:51'),
(702, 'ALTO789087', 'Amnora', 'amenora', 'Box', 'IT', 'CAPEX', 'abcd amenora mall', 1, 56778.00, 45, 56.00, 1, NULL, '2021-07-31 11:23:39', '2021-07-31 11:23:39'),
(703, 'aaa', 'aaabbba', 'aaaabbbcc', 'Box', 'Admin', 'CAPEX', 'abcdefg', 1, 567.00, 45, 55.00, 1, NULL, '2021-07-31 13:15:34', '2021-07-31 16:29:22'),
(704, '0000ALTO', 'Aaaaadvane', 'aaaadvane', 'Box', 'IT', 'CAPEX', 'abcdef', 1, 567.00, 34, 56.00, 1, NULL, '2021-07-31 16:28:29', '2021-07-31 16:28:29'),
(706, 'IN101001', 'spiderman1011', 'dj', 'sfsdf', 'Admin', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, NULL, '2021-08-04 06:16:36', '2021-08-04 06:16:36'),
(707, 'IN1010011', 'spiderman10111', 'dj', 'sfsdf', 'IT', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, '2021-08-04 06:21:19', '2021-08-04 06:17:38', '2021-08-04 06:19:18'),
(715, 'IN1010012', 'spiderman101111', 'dj', 'sfsdf', 'IT', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, NULL, '2021-08-26 11:33:20', '2021-08-26 11:44:24'),
(717, 'IN1010013', 'spiderman10113', 'dj', 'sfsdf', 'IT', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, NULL, '2021-08-26 11:34:05', '2021-08-26 11:46:39'),
(719, 'OPEX23400', 'Power bank', 'Battery', 'Kg', 'IT', 'CAPEX', 'my battery product', 1, 55.00, 78, 56.00, 1, NULL, '2021-08-30 17:52:27', '2021-08-30 17:52:50'),
(724, 'IN10100114', 'spiderman10114', 'djwala', 'sfsdf', 'Admin', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, NULL, '2021-09-25 12:25:45', '2021-09-25 12:41:45'),
(725, 'IN1010015', 'spiderman10115', 'djwala1', 'sfsdf', 'IT', 'OPEX', 'this is testing1', 1, 45.90, 12, 45.88, 1, NULL, '2021-09-25 12:28:20', '2021-09-25 12:40:52');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `ID` int(11) NOT NULL,
  `PO_Number` varchar(50) NOT NULL,
  `Vendor_ID` int(11) NOT NULL,
  `PO_Date` datetime NOT NULL,
  `PO_Raised_By` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Sub_Total` float(10,2) NOT NULL,
  `Tax_value` float(10,2) NOT NULL,
  `PO_Total` float(10,2) NOT NULL,
  `File_Name` varchar(50) DEFAULT NULL,
  `User_Type` varchar(20) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`ID`, `PO_Number`, `Vendor_ID`, `PO_Date`, `PO_Raised_By`, `Quantity`, `Sub_Total`, `Tax_value`, `PO_Total`, `File_Name`, `User_Type`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'MBEPL/PO/IT/2021-22/000001', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 09:34:57', '2021-08-13 09:34:57', NULL),
(2, 'MBEPL/PO/IT/2021-22/000002', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 09:37:35', '2021-08-13 09:37:35', NULL),
(5, 'MBEPL/PO/IT/2021-22/000003', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 09:40:01', '2021-08-13 09:40:01', NULL),
(6, 'MBEPL/PO/IT/2021-22/000006', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 09:59:32', '2021-08-13 09:59:32', NULL),
(7, 'MBEPL/PO/IT/2021-22/000007', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 09:59:52', '2021-08-13 09:59:52', NULL),
(8, 'MBEPL/PO/IT/2021-22/000008', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:00:09', '2021-08-13 10:00:09', NULL),
(9, 'MBEPL/PO/IT/2021-22/000009', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:05:41', '2021-08-13 10:05:41', NULL),
(10, 'MBEPL/PO/IT/2021-22/000010', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:07:47', '2021-08-13 10:07:47', NULL),
(11, 'MBEPL/PO/IT/2021-22/000011', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:09:35', '2021-08-13 10:09:35', NULL),
(12, 'MBEPL/PO/IT/2021-22/000012', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:18:28', '2021-08-13 10:18:28', NULL),
(13, 'MBEPL/PO/IT/2021-22/000013', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:21:16', '2021-08-13 10:21:16', NULL),
(14, 'MBEPL/PO/IT/2021-22/000014', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:25:14', '2021-08-13 10:25:14', NULL),
(15, 'MBEPL/PO/IT/2021-22/000015', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:27:23', '2021-08-13 10:27:23', NULL),
(16, 'MBEPL/PO/IT/2021-22/000016', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:28:37', '2021-08-13 10:28:37', NULL),
(17, 'MBEPL/PO/IT/2021-22/000017', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:30:27', '2021-08-13 10:30:27', NULL),
(18, 'MBEPL/PO/IT/2021-22/000018', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:31:38', '2021-08-13 10:31:38', NULL),
(19, 'MBEPL/PO/IT/2021-22/000019', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:33:10', '2021-08-13 10:33:10', NULL),
(20, 'MBEPL/PO/IT/2021-22/000020', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:35:10', '2021-08-13 10:35:10', NULL),
(21, 'MBEPL/PO/IT/2021-22/000021', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:43:30', '2021-08-13 10:43:30', NULL),
(22, 'MBEPL/PO/IT/2021-22/000022', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 10:55:30', '2021-08-13 10:55:30', NULL),
(23, 'MBEPL/PO/IT/2021-22/000023', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:13:17', '2021-08-13 11:13:17', NULL),
(24, 'MBEPL/PO/IT/2021-22/000024', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:18:07', '2021-08-13 11:18:07', NULL),
(25, 'MBEPL/PO/IT/2021-22/000025', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:18:29', '2021-08-13 11:18:29', NULL),
(26, 'MBEPL/PO/IT/2021-22/000026', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:20:18', '2021-08-13 11:20:18', NULL),
(27, 'MBEPL/PO/IT/2021-22/000027', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:20:54', '2021-08-13 11:20:54', NULL),
(28, 'MBEPL/PO/IT/2021-22/000028', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:24:17', '2021-08-13 11:24:17', NULL),
(29, 'MBEPL/PO/IT/2021-22/000029', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:26:29', '2021-08-13 11:26:29', NULL),
(30, 'MBEPL/PO/IT/2021-22/000030', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:31:36', '2021-08-13 11:31:36', NULL),
(31, 'MBEPL/PO/IT/2021-22/000031', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:39:04', '2021-08-13 11:39:04', NULL),
(32, 'MBEPL/PO/IT/2021-22/000032', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:40:52', '2021-08-13 11:40:52', NULL),
(33, 'MBEPL/PO/IT/2021-22/000033', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:41:46', '2021-08-13 11:41:46', NULL),
(34, 'MBEPL/PO/IT/2021-22/000034', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:45:23', '2021-08-13 11:45:23', NULL),
(35, 'MBEPL/PO/IT/2021-22/000035', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:46:54', '2021-08-13 11:46:54', NULL),
(36, 'MBEPL/PO/IT/2021-22/000036', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:47:27', '2021-08-13 11:47:27', NULL),
(37, 'MBEPL/PO/IT/2021-22/000037', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:53:21', '2021-08-13 11:53:21', NULL),
(38, 'MBEPL/PO/IT/2021-22/000038', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:56:04', '2021-08-13 11:56:04', NULL),
(39, 'MBEPL/PO/IT/2021-22/000039', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:58:16', '2021-08-13 11:58:16', NULL),
(40, 'MBEPL/PO/IT/2021-22/000040', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 11:59:35', '2021-08-13 11:59:35', NULL),
(41, 'MBEPL/PO/IT/2021-22/000041', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 12:02:40', '2021-08-13 12:02:40', NULL),
(42, 'MBEPL/PO/IT/2021-22/000042', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 12:05:51', '2021-08-13 12:05:51', NULL),
(43, 'MBEPL/PO/IT/2021-22/000043', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 12:24:03', '2021-08-13 12:24:03', NULL),
(44, 'MBEPL/PO/IT/2021-22/000044', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 12:25:02', '2021-08-13 12:25:02', NULL),
(45, 'MBEPL/PO/IT/2021-22/000045', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 735.00, '', 'IT', '2021-08-13 12:30:24', '2021-08-13 12:30:24', NULL),
(46, 'MBEPL/PO/IT/2021-22/000046', 1, '2021-08-05 00:00:00', 26, 39, 700.00, 35.00, 735.00, '', 'IT', '2021-08-18 05:45:55', '2021-08-18 05:45:55', NULL),
(47, 'MBEPL/PO/IT/2021-22/000047', 1, '2021-08-05 00:00:00', 26, 39, 700.00, 35.00, 735.00, '', 'IT', '2021-08-18 05:50:03', '2021-08-18 05:50:03', NULL),
(48, 'MBEPL/PO/IT/2021-22/000048', 1, '2021-08-05 00:00:00', 26, 39, 700.00, 35.00, 735.00, '', 'IT', '2021-08-18 05:54:24', '2021-08-18 05:54:24', NULL),
(49, 'MBEPL/PO/IT/2021-22/000049', 1, '2021-08-18 00:00:00', 26, 2, 1134.00, 635.04, 1769.04, '', 'IT', '2021-08-18 09:10:49', '2021-08-18 09:10:49', NULL),
(50, 'MBEPL/PO/IT/2021-22/000050', 1, '2021-08-05 00:00:00', 26, 0, 0.00, 0.00, 0.00, '', 'IT', '2021-08-18 09:27:11', '2021-08-18 09:27:11', NULL),
(51, 'MBEPL/PO/IT/2021-22/000051', 1, '2021-08-05 00:00:00', 26, 39, 2500.00, 125.00, 2625.00, '', 'IT', '2021-08-18 09:32:08', '2021-08-18 09:32:08', NULL),
(52, 'MBEPL/PO/IT/2021-22/000052', 1, '2021-08-05 00:00:00', 26, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000052.pdf', 'IT', '2021-08-25 06:30:28', '2021-08-25 06:30:28', NULL),
(53, 'MBEPL/PO/Admin/2021-22/000053', 1, '2021-08-05 00:00:00', 29, 39, 2500.00, 125.00, 2625.00, 'MBEPL_Admin_2021-22_000053.pdf', 'Admin', '2021-08-25 11:25:00', '2021-08-25 11:25:01', NULL),
(54, 'MBEPL/PO/Admin/2021-22/000054', 1, '2021-08-05 00:00:00', 29, 39, 2500.00, 125.00, 2625.00, 'MBEPL_Admin_2021-22_000054.pdf', 'Admin', '2021-08-25 11:26:22', '2021-08-25 11:26:22', NULL),
(55, 'MBEPL/PO/Admin/2021-22/000055', 1, '2021-08-05 00:00:00', 29, 39, 2500.00, 125.00, 2625.00, 'MBEPL_Admin_2021-22_000055.pdf', 'Admin', '2021-08-25 11:29:39', '2021-08-25 11:29:39', NULL),
(56, 'MBEPL/PO/Admin/2021-22/000056', 1, '2021-08-05 00:00:00', 29, 39, 2500.00, 125.00, 2625.00, 'MBEPL_Admin_2021-22_000056.pdf', 'Admin', '2021-08-25 11:30:31', '2021-08-25 11:30:31', NULL),
(57, 'MBEPL/PO/undefined/2021-22/000057', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_undefined_2021-22_000057.pdf', 'System Admin', '2021-08-25 14:07:58', '2021-08-25 14:07:59', NULL),
(58, 'MBEPL/PO/IT/2021-22/000058', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000058.pdf', 'System Admin', '2021-08-25 14:08:44', '2021-08-25 14:08:44', NULL),
(59, 'MBEPL/PO/IT/2021-22/000059', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000059.pdf', 'System Admin', '2021-08-25 14:12:26', '2021-08-25 14:12:27', NULL),
(60, 'MBEPL/PO/IT/2021-22/000060', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000060.pdf', 'System Admin', '2021-08-25 14:31:08', '2021-08-25 14:31:08', NULL),
(61, 'MBEPL/PO/IT/2021-22/000061', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000061.pdf', 'System Admin', '2021-08-25 14:35:44', '2021-08-25 14:35:44', NULL),
(62, 'MBEPL/PO/IT/2021-22/000062', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000062.pdf', 'System Admin', '2021-08-25 14:36:53', '2021-08-25 14:36:54', NULL),
(63, 'MBEPL/PO/IT/2021-22/000063', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000063.pdf', 'System Admin', '2021-08-25 14:37:54', '2021-08-25 14:37:54', NULL),
(64, 'MBEPL/PO/IT/2021-22/000064', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000064.pdf', 'System Admin', '2021-08-25 14:38:28', '2021-08-25 14:38:28', NULL),
(65, 'MBEPL/PO/IT/2021-22/000065', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000065.pdf', 'System Admin', '2021-08-25 14:40:52', '2021-08-25 14:40:52', NULL),
(66, 'MBEPL/PO/IT/2021-22/000066', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000066.pdf', 'System Admin', '2021-08-25 14:41:37', '2021-08-25 14:41:38', NULL),
(67, 'MBEPL/PO/IT/2021-22/000067', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000067.pdf', 'System Admin', '2021-08-25 14:42:26', '2021-08-25 14:42:27', NULL),
(68, 'MBEPL/PO/IT/2021-22/000068', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000068.pdf', 'System Admin', '2021-08-25 14:51:26', '2021-08-25 14:51:27', NULL),
(69, 'MBEPL/PO/IT/2021-22/000069', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_2021-22_000069.pdf', 'System Admin', '2021-08-30 12:43:54', '2021-08-30 12:43:55', NULL),
(70, 'MBEPL/PO/IT/2021-22/000070', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_IT_PO_2021-22_000070.pdf', 'System Admin', '2021-08-30 12:47:27', '2021-08-30 12:47:27', NULL),
(71, 'MBEPL/PO/IT/2021-22/000071', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000071.pdf', 'System Admin', '2021-08-30 12:48:37', '2021-09-01 14:53:44', NULL),
(72, 'MBEPL/PO/IT/2021-22/000072', 3, '2021-08-04 00:00:00', 27, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000072.pdf', 'System Admin', '2021-08-30 13:27:48', '2021-08-30 13:27:48', NULL),
(73, 'MBEPL/PO/IT/2021-22/000073', 5, '2021-08-05 00:00:00', 27, 1, 56778.00, 31795.68, 88573.68, 'MBEPL_PO_IT_2021-22_000073.pdf', 'System Admin', '2021-08-30 13:36:44', '2021-08-30 13:36:44', NULL),
(74, 'MBEPL/PO/IT/2021-22/000074', 5, '2021-08-11 00:00:00', 27, 3, 170334.00, 95387.04, 265721.03, 'MBEPL_PO_IT_2021-22_000074.pdf', 'IT', '2021-08-30 13:44:19', '2021-09-01 13:58:43', NULL),
(75, 'MBEPL/PO/IT/2021-22/000075', 1, '2021-09-04 00:00:00', 27, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000075.pdf', 'IT', '2021-09-01 12:37:55', '2021-09-01 15:02:15', NULL),
(76, 'MBEPL/PO/IT/2021-22/000076', 1, '2021-09-04 00:00:00', 27, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000076.pdf', 'IT', '2021-09-01 12:38:15', '2021-09-01 16:57:53', NULL),
(77, 'MBEPL/PO/IT/2021-22/000077', 1, '2021-09-04 00:00:00', 27, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000077.pdf', 'IT', '2021-09-01 12:40:54', '2021-09-01 12:40:54', NULL),
(78, 'MBEPL/PO/IT/2021-22/000078', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000078.pdf', 'IT', '2021-09-01 13:52:40', '2021-09-01 13:52:41', NULL),
(79, 'MBEPL/PO/IT/2021-22/000079', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000079.pdf', 'IT', '2021-09-23 16:35:06', '2021-09-23 16:35:07', NULL),
(80, 'MBEPL/PO/IT/2021-22/000080', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000080.pdf', 'IT', '2021-09-23 16:58:59', '2021-09-23 16:59:00', NULL),
(81, 'MBEPL/PO/IT/2021-22/000081', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000081.pdf', 'IT', '2021-09-25 10:55:26', '2021-09-25 10:55:27', NULL),
(82, 'MBEPL/PO/IT/2021-22/000082', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000082.pdf', 'IT', '2021-09-25 11:06:37', '2021-09-25 11:06:38', NULL),
(83, 'MBEPL/PO/IT/2021-22/000083', 3, '2021-09-28 00:00:00', 27, 1, 56778.00, 31795.68, 88573.68, 'MBEPL_PO_IT_2021-22_000083.pdf', 'IT', '2021-09-28 06:09:07', '2021-09-28 06:09:07', NULL),
(84, 'MBEPL/PO/IT/2021-22/000084', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000084.pdf', 'IT', '2021-09-30 15:02:26', '2021-09-30 15:02:27', NULL),
(85, 'MBEPL/PO/IT/2021-22/000085', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000085.pdf', 'IT', '2021-09-30 15:11:28', '2021-09-30 15:11:28', NULL),
(86, 'MBEPL/PO/IT/2021-22/000086', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000086.pdf', 'IT', '2021-09-30 15:12:44', '2021-09-30 15:12:45', NULL),
(87, 'MBEPL/PO/IT/2021-22/000087', 1, '2021-08-05 00:00:00', 27, 39, 2500.00, 125.00, 2625.00, 'MBEPL_PO_IT_2021-22_000087.pdf', 'IT', '2021-09-30 15:55:06', '2021-09-30 15:55:07', NULL),
(88, 'MBEPL/PO/undefined/2021-22/000088', 3, '2021-10-02 00:00:00', 27, 1, 45.90, 21.06, 66.96, 'MBEPL_PO_undefined_2021-22_000088.pdf', 'Admin', '2021-10-01 14:25:17', '2021-10-01 14:25:17', NULL),
(89, 'MBEPL/PO/undefined/2021-22/000089', 3, '2021-10-02 00:00:00', 27, 2, 57345.00, 32113.20, 89458.20, 'MBEPL_PO_undefined_2021-22_000089.pdf', 'IT', '2021-10-01 14:29:08', '2021-10-01 14:29:08', NULL),
(90, 'MBEPL/PO/undefined/2021-22/000090', 3, '2021-10-03 00:00:00', 36, 2, 57345.00, 32113.20, 89458.20, 'MBEPL_PO_undefined_2021-22_000090.pdf', 'IT', '2021-10-01 14:34:36', '2021-10-01 14:34:36', NULL),
(91, 'MBEPL/PO/IT/2021-22/000091', 3, '2021-10-02 00:00:00', 26, 5, 283890.00, 158978.41, 442868.41, 'MBEPL_PO_IT_2021-22_000091.pdf', 'IT', '2021-10-02 04:46:38', '2021-10-02 04:46:38', NULL),
(92, 'MBEPL/PO/IT/2021-22/000092', 3, '2021-10-02 00:00:00', 26, 5, 2835.00, 1587.60, 4422.60, 'MBEPL_PO_IT_2021-22_000092.pdf', 'IT', '2021-10-02 04:47:40', '2021-10-02 04:47:40', NULL),
(93, 'MBEPL/PO/IT/2021-22/000093', 3, '2021-10-02 00:00:00', 26, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000093.pdf', 'IT', '2021-10-02 04:52:03', '2021-10-02 04:52:03', NULL),
(94, 'MBEPL/PO/IT/2021-22/000094', 3, '2021-10-02 00:00:00', 26, 2, 1134.00, 635.04, 1769.04, 'MBEPL_PO_IT_2021-22_000094.pdf', 'IT', '2021-10-02 04:53:24', '2021-10-02 04:53:24', NULL),
(95, 'MBEPL/PO/IT/2021-22/000095', 3, '2021-10-02 00:00:00', 36, 1, 567.00, 317.52, 884.52, 'MBEPL_PO_IT_2021-22_000095.pdf', 'IT', '2021-10-02 04:56:28', '2021-10-02 04:56:29', NULL),
(96, 'MBEPL/PO/IT/2021-22/000096', 3, '2021-10-02 00:00:00', 36, 1, 56778.00, 31795.68, 88573.68, 'MBEPL_PO_IT_2021-22_000096.pdf', 'IT', '2021-10-02 04:57:38', '2021-10-02 04:57:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `ID` int(11) NOT NULL,
  `Purchase_Order_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Description` varchar(150) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `UOM` varchar(20) NOT NULL,
  `Per_Unit_Price` float(10,2) NOT NULL,
  `Total_Price` float(10,2) NOT NULL,
  `TAX_Percentage` float(10,2) NOT NULL,
  `TAX_Value` float(10,2) NOT NULL,
  `Sub_Total` float(10,2) NOT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`ID`, `Purchase_Order_ID`, `Product_ID`, `Description`, `Quantity`, `UOM`, `Per_Unit_Price`, `Total_Price`, `TAX_Percentage`, `TAX_Value`, `Sub_Total`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 2, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 09:37:35', '2021-08-13 09:37:35', NULL),
(2, 2, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:37:35', '2021-08-13 09:37:35', NULL),
(3, 2, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 09:37:35', '2021-08-13 09:37:35', NULL),
(4, 2, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:37:35', '2021-08-13 09:37:35', NULL),
(5, 5, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 09:40:01', '2021-08-13 09:40:01', NULL),
(6, 5, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:40:01', '2021-08-13 09:40:01', NULL),
(7, 5, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 09:40:01', '2021-08-13 09:40:01', NULL),
(8, 5, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:40:01', '2021-08-13 09:40:01', NULL),
(9, 6, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 09:59:32', '2021-08-13 09:59:32', NULL),
(10, 6, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:59:32', '2021-08-13 09:59:32', NULL),
(11, 6, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 09:59:32', '2021-08-13 09:59:32', NULL),
(12, 6, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:59:32', '2021-08-13 09:59:32', NULL),
(13, 7, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 09:59:52', '2021-08-13 09:59:52', NULL),
(14, 7, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:59:52', '2021-08-13 09:59:52', NULL),
(15, 7, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 09:59:52', '2021-08-13 09:59:52', NULL),
(16, 7, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 09:59:52', '2021-08-13 09:59:52', NULL),
(17, 8, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:00:09', '2021-08-13 10:00:09', NULL),
(18, 8, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:00:09', '2021-08-13 10:00:09', NULL),
(19, 8, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:00:09', '2021-08-13 10:00:09', NULL),
(20, 8, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:00:09', '2021-08-13 10:00:09', NULL),
(21, 9, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:05:41', '2021-08-13 10:05:41', NULL),
(22, 9, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:05:41', '2021-08-13 10:05:41', NULL),
(23, 9, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:05:41', '2021-08-13 10:05:41', NULL),
(24, 9, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:05:41', '2021-08-13 10:05:41', NULL),
(25, 10, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:07:47', '2021-08-13 10:07:47', NULL),
(26, 10, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:07:47', '2021-08-13 10:07:47', NULL),
(27, 10, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:07:47', '2021-08-13 10:07:47', NULL),
(28, 10, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:07:47', '2021-08-13 10:07:47', NULL),
(29, 11, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:09:35', '2021-08-13 10:09:35', NULL),
(30, 11, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:09:35', '2021-08-13 10:09:35', NULL),
(31, 11, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:09:35', '2021-08-13 10:09:35', NULL),
(32, 11, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:09:35', '2021-08-13 10:09:35', NULL),
(33, 12, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:18:28', '2021-08-13 10:18:28', NULL),
(34, 12, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:18:28', '2021-08-13 10:18:28', NULL),
(35, 12, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:18:28', '2021-08-13 10:18:28', NULL),
(36, 12, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:18:28', '2021-08-13 10:18:28', NULL),
(37, 13, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:21:16', '2021-08-13 10:21:16', NULL),
(38, 13, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:21:16', '2021-08-13 10:21:16', NULL),
(39, 13, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:21:16', '2021-08-13 10:21:16', NULL),
(40, 13, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:21:16', '2021-08-13 10:21:16', NULL),
(41, 14, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:25:14', '2021-08-13 10:25:14', NULL),
(42, 14, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:25:14', '2021-08-13 10:25:14', NULL),
(43, 14, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:25:14', '2021-08-13 10:25:14', NULL),
(44, 14, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:25:14', '2021-08-13 10:25:14', NULL),
(45, 15, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:27:23', '2021-08-13 10:27:23', NULL),
(46, 15, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:27:23', '2021-08-13 10:27:23', NULL),
(47, 15, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:27:23', '2021-08-13 10:27:23', NULL),
(48, 15, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:27:23', '2021-08-13 10:27:23', NULL),
(49, 16, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:28:38', '2021-08-13 10:28:38', NULL),
(50, 16, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:28:38', '2021-08-13 10:28:38', NULL),
(51, 16, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:28:38', '2021-08-13 10:28:38', NULL),
(52, 16, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:28:38', '2021-08-13 10:28:38', NULL),
(53, 17, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:30:28', '2021-08-13 10:30:28', NULL),
(54, 17, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:30:28', '2021-08-13 10:30:28', NULL),
(55, 17, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:30:28', '2021-08-13 10:30:28', NULL),
(56, 17, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:30:28', '2021-08-13 10:30:28', NULL),
(57, 18, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:31:38', '2021-08-13 10:31:38', NULL),
(58, 18, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:31:38', '2021-08-13 10:31:38', NULL),
(59, 18, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:31:38', '2021-08-13 10:31:38', NULL),
(60, 18, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:31:38', '2021-08-13 10:31:38', NULL),
(61, 19, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:33:10', '2021-08-13 10:33:10', NULL),
(62, 19, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:33:10', '2021-08-13 10:33:10', NULL),
(63, 19, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:33:10', '2021-08-13 10:33:10', NULL),
(64, 19, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:33:10', '2021-08-13 10:33:10', NULL),
(65, 20, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:35:11', '2021-08-13 10:35:11', NULL),
(66, 20, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:35:11', '2021-08-13 10:35:11', NULL),
(67, 20, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:35:11', '2021-08-13 10:35:11', NULL),
(68, 20, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:35:11', '2021-08-13 10:35:11', NULL),
(69, 21, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:43:30', '2021-08-13 10:43:30', NULL),
(70, 21, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:43:30', '2021-08-13 10:43:30', NULL),
(71, 21, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:43:30', '2021-08-13 10:43:30', NULL),
(72, 21, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:43:30', '2021-08-13 10:43:30', NULL),
(73, 22, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 10:55:30', '2021-08-13 10:55:30', NULL),
(74, 22, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:55:30', '2021-08-13 10:55:30', NULL),
(75, 22, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 10:55:30', '2021-08-13 10:55:30', NULL),
(76, 22, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 10:55:30', '2021-08-13 10:55:30', NULL),
(77, 23, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:13:17', '2021-08-13 11:13:17', NULL),
(78, 23, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:13:17', '2021-08-13 11:13:17', NULL),
(79, 23, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:13:17', '2021-08-13 11:13:17', NULL),
(80, 23, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:13:17', '2021-08-13 11:13:17', NULL),
(81, 24, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:18:07', '2021-08-13 11:18:07', NULL),
(82, 24, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:18:07', '2021-08-13 11:18:07', NULL),
(83, 24, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:18:07', '2021-08-13 11:18:07', NULL),
(84, 24, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:18:07', '2021-08-13 11:18:07', NULL),
(85, 25, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:18:29', '2021-08-13 11:18:29', NULL),
(86, 25, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:18:29', '2021-08-13 11:18:29', NULL),
(87, 25, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:18:29', '2021-08-13 11:18:29', NULL),
(88, 25, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:18:29', '2021-08-13 11:18:29', NULL),
(89, 26, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:20:18', '2021-08-13 11:20:18', NULL),
(90, 26, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:20:18', '2021-08-13 11:20:18', NULL),
(91, 26, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:20:18', '2021-08-13 11:20:18', NULL),
(92, 26, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:20:18', '2021-08-13 11:20:18', NULL),
(93, 27, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:20:54', '2021-08-13 11:20:54', NULL),
(94, 27, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:20:54', '2021-08-13 11:20:54', NULL),
(95, 27, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:20:54', '2021-08-13 11:20:54', NULL),
(96, 27, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:20:54', '2021-08-13 11:20:54', NULL),
(97, 28, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:24:17', '2021-08-13 11:24:17', NULL),
(98, 28, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:24:17', '2021-08-13 11:24:17', NULL),
(99, 28, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:24:17', '2021-08-13 11:24:17', NULL),
(100, 28, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:24:17', '2021-08-13 11:24:17', NULL),
(101, 29, 692, '', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:26:29', '2021-08-13 11:26:29', NULL),
(102, 29, 693, '', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:26:29', '2021-08-13 11:26:29', NULL),
(103, 29, 694, '', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:26:29', '2021-08-13 11:26:29', NULL),
(104, 29, 695, '', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:26:29', '2021-08-13 11:26:29', NULL),
(105, 30, 692, NULL, 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:31:36', '2021-08-13 11:31:36', NULL),
(106, 30, 693, NULL, 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:31:36', '2021-08-13 11:31:36', NULL),
(107, 30, 694, NULL, 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:31:36', '2021-08-13 11:31:36', NULL),
(108, 30, 695, NULL, 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:31:36', '2021-08-13 11:31:36', NULL),
(109, 31, 692, NULL, 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:39:04', '2021-08-13 11:39:04', NULL),
(110, 31, 693, NULL, 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:39:04', '2021-08-13 11:39:04', NULL),
(111, 31, 694, NULL, 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:39:04', '2021-08-13 11:39:04', NULL),
(112, 31, 695, NULL, 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:39:04', '2021-08-13 11:39:04', NULL),
(113, 32, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:40:53', '2021-08-13 11:40:53', NULL),
(114, 32, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:40:53', '2021-08-13 11:40:53', NULL),
(115, 32, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:40:53', '2021-08-13 11:40:53', NULL),
(116, 32, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:40:53', '2021-08-13 11:40:53', NULL),
(117, 33, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:41:46', '2021-08-13 11:41:46', NULL),
(118, 33, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:41:46', '2021-08-13 11:41:46', NULL),
(119, 33, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:41:46', '2021-08-13 11:41:46', NULL),
(120, 33, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:41:46', '2021-08-13 11:41:46', NULL),
(121, 34, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:45:23', '2021-08-13 11:45:23', NULL),
(122, 34, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:45:23', '2021-08-13 11:45:23', NULL),
(123, 34, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:45:23', '2021-08-13 11:45:23', NULL),
(124, 34, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:45:23', '2021-08-13 11:45:23', NULL),
(125, 35, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:46:54', '2021-08-13 11:46:54', NULL),
(126, 35, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:46:54', '2021-08-13 11:46:54', NULL),
(127, 35, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:46:54', '2021-08-13 11:46:54', NULL),
(128, 35, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:46:54', '2021-08-13 11:46:54', NULL),
(129, 36, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:47:27', '2021-08-13 11:47:27', NULL),
(130, 36, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:47:27', '2021-08-13 11:47:27', NULL),
(131, 36, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:47:27', '2021-08-13 11:47:27', NULL),
(132, 36, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:47:27', '2021-08-13 11:47:27', NULL),
(133, 37, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:53:22', '2021-08-13 11:53:22', NULL),
(134, 37, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:53:22', '2021-08-13 11:53:22', NULL),
(135, 37, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:53:22', '2021-08-13 11:53:22', NULL),
(136, 37, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:53:22', '2021-08-13 11:53:22', NULL),
(137, 38, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:56:04', '2021-08-13 11:56:04', NULL),
(138, 38, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:56:04', '2021-08-13 11:56:04', NULL),
(139, 38, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:56:04', '2021-08-13 11:56:04', NULL),
(140, 38, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:56:04', '2021-08-13 11:56:04', NULL),
(141, 39, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:58:16', '2021-08-13 11:58:16', NULL),
(142, 39, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:58:16', '2021-08-13 11:58:16', NULL),
(143, 39, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:58:16', '2021-08-13 11:58:16', NULL),
(144, 39, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:58:16', '2021-08-13 11:58:16', NULL),
(145, 40, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 11:59:35', '2021-08-13 11:59:35', NULL),
(146, 40, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:59:35', '2021-08-13 11:59:35', NULL),
(147, 40, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 11:59:35', '2021-08-13 11:59:35', NULL),
(148, 40, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 11:59:35', '2021-08-13 11:59:35', NULL),
(149, 41, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 12:02:41', '2021-08-13 12:02:41', NULL),
(150, 41, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:02:41', '2021-08-13 12:02:41', NULL),
(151, 41, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 12:02:41', '2021-08-13 12:02:41', NULL),
(152, 41, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:02:41', '2021-08-13 12:02:41', NULL),
(153, 42, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 12:05:51', '2021-08-13 12:05:51', NULL),
(154, 42, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:05:51', '2021-08-13 12:05:51', NULL),
(155, 42, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 12:05:51', '2021-08-13 12:05:51', NULL),
(156, 42, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:05:51', '2021-08-13 12:05:51', NULL),
(157, 43, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 12:24:03', '2021-08-13 12:24:03', NULL),
(158, 43, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:24:03', '2021-08-13 12:24:03', NULL),
(159, 43, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 12:24:03', '2021-08-13 12:24:03', NULL),
(160, 43, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:24:03', '2021-08-13 12:24:03', NULL),
(161, 44, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 12:25:02', '2021-08-13 12:25:02', NULL),
(162, 44, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:25:02', '2021-08-13 12:25:02', NULL),
(163, 44, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 12:25:02', '2021-08-13 12:25:02', NULL),
(164, 44, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:25:02', '2021-08-13 12:25:02', NULL),
(165, 45, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-13 12:30:24', '2021-08-13 12:30:24', NULL),
(166, 45, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:30:24', '2021-08-13 12:30:24', NULL),
(167, 45, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-13 12:30:24', '2021-08-13 12:30:24', NULL),
(168, 45, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-13 12:30:24', '2021-08-13 12:30:24', NULL),
(169, 46, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-18 05:45:55', '2021-08-18 05:45:55', NULL),
(170, 46, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:45:55', '2021-08-18 05:45:55', NULL),
(171, 46, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-18 05:45:55', '2021-08-18 05:45:55', NULL),
(172, 46, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:45:55', '2021-08-18 05:45:55', NULL),
(173, 47, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-18 05:50:03', '2021-08-18 05:50:03', NULL),
(174, 47, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:50:03', '2021-08-18 05:50:03', NULL),
(175, 47, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-18 05:50:03', '2021-08-18 05:50:03', NULL),
(176, 47, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:50:03', '2021-08-18 05:50:03', NULL),
(177, 48, 692, 'Cello', 20, 'kg', 10.00, 200.00, 5.00, 10.00, 210.00, '2021-08-18 05:54:24', '2021-08-18 05:54:24', NULL),
(178, 48, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:54:24', '2021-08-18 05:54:24', NULL),
(179, 48, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-18 05:54:24', '2021-08-18 05:54:24', NULL),
(180, 48, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 05:54:24', '2021-08-18 05:54:24', NULL),
(181, 49, 704, 'new demo raise po', 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, '2021-08-18 09:10:50', '2021-08-18 09:10:50', NULL),
(182, 51, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-18 09:32:08', '2021-08-18 09:32:08', NULL),
(183, 51, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 09:32:08', '2021-08-18 09:32:08', NULL),
(184, 51, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-18 09:32:08', '2021-08-18 09:32:08', NULL),
(185, 51, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-18 09:32:08', '2021-08-18 09:32:08', NULL),
(186, 52, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 06:30:28', '2021-08-25 06:30:28', NULL),
(187, 52, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 06:30:28', '2021-08-25 06:30:28', NULL),
(188, 52, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 06:30:28', '2021-08-25 06:30:28', NULL),
(189, 52, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 06:30:28', '2021-08-25 06:30:28', NULL),
(190, 53, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 11:25:00', '2021-08-25 11:25:00', NULL),
(191, 53, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:25:00', '2021-08-25 11:25:00', NULL),
(192, 53, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 11:25:00', '2021-08-25 11:25:00', NULL),
(193, 53, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:25:00', '2021-08-25 11:25:00', NULL),
(194, 54, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 11:26:22', '2021-08-25 11:26:22', NULL),
(195, 54, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:26:22', '2021-08-25 11:26:22', NULL),
(196, 54, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 11:26:22', '2021-08-25 11:26:22', NULL),
(197, 54, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:26:22', '2021-08-25 11:26:22', NULL),
(198, 55, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 11:29:39', '2021-08-25 11:29:39', NULL),
(199, 55, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:29:39', '2021-08-25 11:29:39', NULL),
(200, 55, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 11:29:39', '2021-08-25 11:29:39', NULL),
(201, 55, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:29:39', '2021-08-25 11:29:39', NULL),
(202, 56, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 11:30:31', '2021-08-25 11:30:31', NULL),
(203, 56, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:30:31', '2021-08-25 11:30:31', NULL),
(204, 56, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 11:30:31', '2021-08-25 11:30:31', NULL),
(205, 56, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 11:30:31', '2021-08-25 11:30:31', NULL),
(206, 57, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:07:59', '2021-08-25 14:07:59', NULL),
(207, 57, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:07:59', '2021-08-25 14:07:59', NULL),
(208, 57, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:07:59', '2021-08-25 14:07:59', NULL),
(209, 57, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:07:59', '2021-08-25 14:07:59', NULL),
(210, 58, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:08:44', '2021-08-25 14:08:44', NULL),
(211, 58, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:08:44', '2021-08-25 14:08:44', NULL),
(212, 58, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:08:44', '2021-08-25 14:08:44', NULL),
(213, 58, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:08:44', '2021-08-25 14:08:44', NULL),
(214, 59, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:12:27', '2021-08-25 14:12:27', NULL),
(215, 59, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:12:27', '2021-08-25 14:12:27', NULL),
(216, 59, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:12:27', '2021-08-25 14:12:27', NULL),
(217, 59, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:12:27', '2021-08-25 14:12:27', NULL),
(218, 60, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:31:08', '2021-08-25 14:31:08', NULL),
(219, 60, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:31:08', '2021-08-25 14:31:08', NULL),
(220, 60, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:31:08', '2021-08-25 14:31:08', NULL),
(221, 60, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:31:08', '2021-08-25 14:31:08', NULL),
(222, 61, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:35:44', '2021-08-25 14:35:44', NULL),
(223, 61, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:35:44', '2021-08-25 14:35:44', NULL),
(224, 61, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:35:44', '2021-08-25 14:35:44', NULL),
(225, 61, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:35:44', '2021-08-25 14:35:44', NULL),
(226, 62, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:36:53', '2021-08-25 14:36:53', NULL),
(227, 62, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:36:53', '2021-08-25 14:36:53', NULL),
(228, 62, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:36:53', '2021-08-25 14:36:53', NULL),
(229, 62, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:36:53', '2021-08-25 14:36:53', NULL),
(230, 63, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:37:54', '2021-08-25 14:37:54', NULL),
(231, 63, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:37:54', '2021-08-25 14:37:54', NULL),
(232, 63, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:37:54', '2021-08-25 14:37:54', NULL),
(233, 63, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:37:54', '2021-08-25 14:37:54', NULL),
(234, 64, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:38:28', '2021-08-25 14:38:28', NULL),
(235, 64, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:38:28', '2021-08-25 14:38:28', NULL),
(236, 64, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:38:28', '2021-08-25 14:38:28', NULL),
(237, 64, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:38:28', '2021-08-25 14:38:28', NULL),
(238, 65, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:40:52', '2021-08-25 14:40:52', NULL),
(239, 65, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:40:52', '2021-08-25 14:40:52', NULL),
(240, 65, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:40:52', '2021-08-25 14:40:52', NULL),
(241, 65, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:40:52', '2021-08-25 14:40:52', NULL),
(242, 66, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:41:37', '2021-08-25 14:41:37', NULL),
(243, 66, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:41:37', '2021-08-25 14:41:37', NULL),
(244, 66, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:41:37', '2021-08-25 14:41:37', NULL),
(245, 66, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:41:37', '2021-08-25 14:41:37', NULL),
(246, 67, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:42:27', '2021-08-25 14:42:27', NULL),
(247, 67, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:42:27', '2021-08-25 14:42:27', NULL),
(248, 67, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:42:27', '2021-08-25 14:42:27', NULL),
(249, 67, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:42:27', '2021-08-25 14:42:27', NULL),
(250, 68, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-25 14:51:26', '2021-08-25 14:51:26', NULL),
(251, 68, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:51:26', '2021-08-25 14:51:26', NULL),
(252, 68, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-25 14:51:26', '2021-08-25 14:51:26', NULL),
(253, 68, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-25 14:51:26', '2021-08-25 14:51:26', NULL),
(254, 69, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-30 12:43:55', '2021-08-30 12:43:55', NULL),
(255, 69, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:43:55', '2021-08-30 12:43:55', NULL),
(256, 69, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-30 12:43:55', '2021-08-30 12:43:55', NULL),
(257, 69, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:43:55', '2021-08-30 12:43:55', NULL),
(258, 70, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-30 12:47:27', '2021-08-30 12:47:27', NULL),
(259, 70, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:47:27', '2021-08-30 12:47:27', NULL),
(260, 70, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-30 12:47:27', '2021-08-30 12:47:27', NULL),
(261, 70, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:47:27', '2021-08-30 12:47:27', NULL),
(262, 71, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-08-30 12:48:38', '2021-08-30 12:48:38', NULL),
(263, 71, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:48:38', '2021-08-30 12:48:38', NULL),
(264, 71, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-08-30 12:48:38', '2021-08-30 12:48:38', NULL),
(265, 71, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-08-30 12:48:38', '2021-08-30 12:48:38', NULL),
(266, 72, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-08-30 13:27:48', '2021-08-30 13:27:48', NULL),
(267, 73, 702, NULL, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '2021-08-30 13:36:44', '2021-08-30 13:36:44', NULL),
(268, 74, 702, NULL, 3, 'Box', 56778.00, 170334.00, 56.00, 95387.04, 265721.03, '2021-08-30 13:44:19', '2021-08-30 13:44:19', NULL),
(269, 75, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-09-01 12:37:56', '2021-09-01 12:37:56', NULL),
(270, 76, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-09-01 12:38:15', '2021-09-01 12:38:15', NULL),
(271, 77, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-09-01 12:40:54', '2021-09-01 12:40:54', NULL),
(272, 78, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-01 13:52:40', '2021-09-01 13:52:40', NULL),
(273, 78, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-01 13:52:40', '2021-09-01 13:52:40', NULL),
(274, 78, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-01 13:52:40', '2021-09-01 13:52:40', NULL),
(275, 78, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-01 13:52:40', '2021-09-01 13:52:40', NULL),
(276, 79, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-23 16:35:07', '2021-09-23 16:35:07', NULL),
(277, 79, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-23 16:35:07', '2021-09-23 16:35:07', NULL),
(278, 79, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-23 16:35:07', '2021-09-23 16:35:07', NULL),
(279, 79, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-23 16:35:07', '2021-09-23 16:35:07', NULL),
(280, 80, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-23 16:59:00', '2021-09-23 16:59:00', NULL),
(281, 80, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-23 16:59:00', '2021-09-23 16:59:00', NULL),
(282, 80, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-23 16:59:00', '2021-09-23 16:59:00', NULL),
(283, 80, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-23 16:59:00', '2021-09-23 16:59:00', NULL),
(284, 81, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-25 10:55:26', '2021-09-25 10:55:26', NULL),
(285, 81, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-25 10:55:26', '2021-09-25 10:55:26', NULL),
(286, 81, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-25 10:55:26', '2021-09-25 10:55:26', NULL),
(287, 81, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-25 10:55:26', '2021-09-25 10:55:26', NULL),
(288, 82, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-25 11:06:37', '2021-09-25 11:06:37', NULL),
(289, 82, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-25 11:06:37', '2021-09-25 11:06:37', NULL),
(290, 82, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-25 11:06:37', '2021-09-25 11:06:37', NULL),
(291, 82, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-25 11:06:37', '2021-09-25 11:06:37', NULL),
(292, 83, 702, 'abc', 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '2021-09-28 06:09:07', '2021-09-28 06:09:07', NULL),
(293, 84, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-30 15:02:27', '2021-09-30 15:02:27', NULL),
(294, 84, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:02:27', '2021-09-30 15:02:27', NULL),
(295, 84, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-30 15:02:27', '2021-09-30 15:02:27', NULL),
(296, 84, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:02:27', '2021-09-30 15:02:27', NULL),
(297, 85, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-30 15:11:28', '2021-09-30 15:11:28', NULL),
(298, 85, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:11:28', '2021-09-30 15:11:28', NULL),
(299, 85, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-30 15:11:28', '2021-09-30 15:11:28', NULL),
(300, 85, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:11:28', '2021-09-30 15:11:28', NULL),
(301, 86, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-30 15:12:44', '2021-09-30 15:12:44', NULL),
(302, 86, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:12:44', '2021-09-30 15:12:44', NULL),
(303, 86, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-30 15:12:44', '2021-09-30 15:12:44', NULL),
(304, 86, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:12:44', '2021-09-30 15:12:44', NULL),
(305, 87, 692, 'Cello', 20, 'kg', 100.00, 2000.00, 5.00, 100.00, 2100.00, '2021-09-30 15:55:06', '2021-09-30 15:55:06', NULL),
(306, 87, 693, 'N95', 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:55:06', '2021-09-30 15:55:06', NULL),
(307, 87, 694, 'Classmate', 10, 'Box', 30.00, 300.00, 5.00, 15.00, 315.00, '2021-09-30 15:55:06', '2021-09-30 15:55:06', NULL),
(308, 87, 695, 'Cello', 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, '2021-09-30 15:55:06', '2021-09-30 15:55:06', NULL),
(309, 88, 700, NULL, 1, 'sfsdf', 45.90, 45.90, 45.88, 21.06, 66.96, '2021-10-01 14:25:17', '2021-10-01 14:25:17', NULL),
(310, 89, 702, NULL, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '2021-10-01 14:29:08', '2021-10-01 14:29:08', NULL),
(311, 89, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-10-01 14:29:08', '2021-10-01 14:29:08', NULL),
(312, 90, 702, NULL, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '2021-10-01 14:34:36', '2021-10-01 14:34:36', NULL),
(313, 90, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-10-01 14:34:36', '2021-10-01 14:34:36', NULL),
(314, 91, 702, NULL, 5, 'Box', 56778.00, 283890.00, 56.00, 158978.41, 442868.41, '2021-10-02 04:46:38', '2021-10-02 04:46:38', NULL),
(315, 92, 704, NULL, 5, 'Box', 567.00, 2835.00, 56.00, 1587.60, 4422.60, '2021-10-02 04:47:40', '2021-10-02 04:47:40', NULL),
(316, 93, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-10-02 04:52:03', '2021-10-02 04:52:03', NULL),
(317, 94, 704, NULL, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, '2021-10-02 04:53:24', '2021-10-02 04:53:24', NULL),
(318, 95, 704, NULL, 1, 'Box', 567.00, 567.00, 56.00, 317.52, 884.52, '2021-10-02 04:56:28', '2021-10-02 04:56:28', NULL),
(319, 96, 702, NULL, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, '2021-10-02 04:57:38', '2021-10-02 04:57:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` int(11) NOT NULL,
  `ticket_number` varchar(255) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `query_description` varchar(1000) DEFAULT NULL,
  `query_regarding` enum('Covid Test','Bed Enquiry','Ambulance','Remdesivir Enquiry','Vaccine','Medicines','Insurance Claim') NOT NULL,
  `status` enum('Open','In Progress','On Hold','Cancelled','Completed') NOT NULL DEFAULT 'Open',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `ID` int(11) NOT NULL,
  `Request_Number` varchar(50) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Request_Department` enum('IT','Admin') NOT NULL,
  `Request_Type` enum('Procurement','Service Request') NOT NULL,
  `Location_ID` int(11) NOT NULL,
  `Status` enum('Open','Ready To Dispatch','Dispatched','Delivered','Resolved','Discarded','In Progress') NOT NULL DEFAULT 'Open',
  `Description` varchar(1000) DEFAULT NULL,
  `Priority` enum('Low','Medium','High') DEFAULT NULL,
  `Type_Of_Issue` int(11) DEFAULT NULL,
  `Request_Amount` float(10,2) DEFAULT NULL,
  `HOD_Approved` tinyint(1) NOT NULL DEFAULT 0,
  `HOD_Approved_Date` datetime DEFAULT NULL,
  `Head_Approved` tinyint(1) NOT NULL DEFAULT 0,
  `Head_Approved_Date` datetime DEFAULT NULL,
  `HOD_Reject_Reason` varchar(100) DEFAULT NULL,
  `Head_Reject_Reason` varchar(100) DEFAULT NULL,
  `Request_Date` datetime DEFAULT NULL,
  `HOD_Hash_ID` varchar(255) DEFAULT NULL,
  `Head_Hash_ID` varchar(255) DEFAULT NULL,
  `Assigned_To` int(11) DEFAULT NULL,
  `Requester_Remark` varchar(150) DEFAULT NULL,
  `Rating` varchar(10) DEFAULT NULL,
  `Support_Comment` varchar(150) DEFAULT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`ID`, `Request_Number`, `User_ID`, `Request_Department`, `Request_Type`, `Location_ID`, `Status`, `Description`, `Priority`, `Type_Of_Issue`, `Request_Amount`, `HOD_Approved`, `HOD_Approved_Date`, `Head_Approved`, `Head_Approved_Date`, `HOD_Reject_Reason`, `Head_Reject_Reason`, `Request_Date`, `HOD_Hash_ID`, `Head_Hash_ID`, `Assigned_To`, `Requester_Remark`, `Rating`, `Support_Comment`, `Updated_At`, `Deleted_At`) VALUES
(1, 'MBEPL/IT/2021-22/000001', 27, 'IT', 'Procurement', 1, 'Dispatched', NULL, NULL, NULL, 393.75, 0, '2021-08-12 11:44:45', 1, '2021-08-12 11:59:52', NULL, NULL, '2021-09-23 06:28:45', '9bfVXapbrjWOA6aS7o9GYrpHpF4we7j2s18gBhtYHx6VvgQGJUtjinZwyiOXJdRMuhd9txlhZhBkakyu', 'qdxQyP44eZcYf53HkrgoBeJSnoZ6VGUE8p8kgLpVrBIy6D86UBalbdYTcvwoLzjoNE15nHQu686U11Dx', NULL, 'a', NULL, '', '2021-09-25 09:37:49', NULL),
(2, 'MBEPL/Admin/2021-22/000002', 28, 'Admin', 'Service Request', 3, 'Open', 'This is testing', 'Low', 3, NULL, 1, '2021-08-12 19:03:37', 1, '2021-08-27 19:04:22', NULL, NULL, '2021-08-12 07:14:55', NULL, NULL, NULL, NULL, NULL, '', '2021-08-12 07:34:05', NULL),
(3, 'MBEPL/Admin/2021-22/000003', 28, 'Admin', 'Service Request', 3, 'Open', 'This is testing', 'Low', 3, NULL, 1, '2021-08-12 07:37:45', 1, '2021-08-12 07:37:45', NULL, NULL, '2021-08-12 07:37:45', NULL, NULL, 17, NULL, NULL, 'This is testing1', '2021-08-16 13:18:35', NULL),
(4, 'MBEPL/Admin/2021-22/000004', 28, 'Admin', 'Service Request', 3, 'Discarded', 'This is testing', 'Low', 3, NULL, 1, '2021-08-12 07:39:20', 1, '2021-08-12 07:39:20', NULL, NULL, '2021-08-12 07:39:20', NULL, NULL, 17, NULL, NULL, 'This is testing1', '2021-09-23 06:22:04', NULL),
(5, 'MBEPL/IT/2021-22/000005', 28, 'IT', 'Procurement', 1, 'Delivered', NULL, NULL, NULL, 420.00, 0, NULL, 0, NULL, NULL, NULL, '2021-08-12 12:08:35', '1MDx73dzOE2byE6Oplwo1SmvBTH33nR728SIzcMqHIV6lFYAPH4vpsqrsdc0hBLvcvFDCmnv6liuCBTY', 'XoPxlGQ5ZPkCwiyUZ0wELsSL7y4CDoWbzJ3hPwRXCI6BHsLWajuY59o9QRg0n2opjGKu6Pr7PXelTBal', NULL, 'a', NULL, '', '2021-08-23 09:56:48', NULL),
(6, 'MBEPL/IT/2021-22/000006', 28, 'IT', 'Procurement', 1, 'Open', NULL, NULL, NULL, 52.50, 1, '2021-08-12 12:12:45', 1, '2021-08-12 12:16:23', NULL, NULL, '2021-08-12 13:29:47', 'Jr9eqXRAeiZZBOvdVSerSM8zzBtrXLLDxGblN2FvD9f2fVL1jKH0Vvr342eBWfIwXAyPfOOTUXV5bZc3', 'RgJgvYlMNR1PsxV2RDPDkLisqpHxhz8yoC76Vw6IiOU1kfPng3l3FhWWQJyCwbIai50BDWHJx4gCObbo', NULL, NULL, NULL, '', '2021-09-29 16:37:51', NULL),
(7, 'MBEPL/IT/2021-22/000007', 28, 'IT', 'Procurement', 1, 'Open', NULL, NULL, NULL, 420.00, 1, '2021-08-12 12:17:35', 0, NULL, 'testing purpose', NULL, '2021-08-12 14:39:21', 'xjfVwPar6uaJDukhOsfz4FVIExn7I0xx9FK0qE7WByJdS4ZM9RqGuLgxTlv2PtSXM1HEXo4A7Tds7Yln', 'bDKmqDrydFadOaLDX9tBkOGbjorKWbkM6lB89Q3pZKKrpZDM9eqtCurNz83nGzVGXVHhT9yXVVUXccuT', NULL, NULL, NULL, '', '2021-08-12 12:17:35', NULL),
(8, 'MBEPL/IT/2021-22/000008', 28, 'IT', 'Procurement', 1, 'Delivered', NULL, NULL, NULL, 420.00, 1, '2021-08-12 12:18:47', 2, '2021-08-12 12:19:21', NULL, 'testing purpose', '2021-08-12 14:39:13', 'x0exnUnqB861YZJeep8MSb3ku77NwXnKelJBlIG5q8wdepgbGDb7z1BLvFQjPbbT2OpU6iExTcT89If4', 'PfWm3CExtx357rcIbPig1p4fN8a5Md7uLdS2s9pOWgq4xujMZJo5PN7x587SK0Yu3go0ez502bIwEojR', NULL, 'this is testing', NULL, '', '2021-08-12 12:39:11', NULL),
(9, 'MBEPL/IT/2021-22/000009', 28, 'IT', 'Service Request', 2, 'Open', 'abc issue', 'Low', 13, NULL, 1, '2021-08-17 14:53:03', 1, '2021-08-17 14:53:03', NULL, NULL, '2021-08-17 14:53:03', NULL, NULL, 17, NULL, NULL, '', '2021-09-23 06:22:08', NULL),
(10, 'MBEPL/IT/2021-22/000010', 28, 'IT', 'Service Request', 1, 'Open', NULL, NULL, NULL, 186013.00, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 14:55:11', 'Knpo2jB0jefSINQJX7PCyBElfZqaRKkzv0lsdVgHcy9ktybIp1X2JMlLXsKntFVVCKYUcSgaFRllLtbc', 'cJFZ2pmOWXJxoqN8g5K3XI8CfbchHyLqoJHsGtnRdiLwtcOxvgIw6qIAbkZ4nk9obuCqPBFz3HB66vRR', 18, 'this is testing', '7', '', '2021-10-01 13:22:11', NULL),
(11, 'MBEPL/IT/2021-22/000011', 28, 'IT', '', 6, 'Open', NULL, NULL, NULL, 446406.00, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 15:00:48', 'YOfmGB1AnQqr1ec8acqst0Co3RFqQiWY3qk1HBUbdES3i4FqJMam43FtA9dNdq4dGLt0zwHyuQsYnLiE', 'cQg7beLVfzuKg17tbmbwQpIbkioYqg72RHsAUAaNoF8aapziJxlLqvh0cVZYVKcZqlJVGIpmhoQGXlbJ', NULL, NULL, NULL, '', '2021-08-17 15:00:48', NULL),
(12, 'MBEPL/IT/2021-22/000012', 28, 'IT', 'Procurement', 6, 'Delivered', NULL, NULL, NULL, 177285.00, 1, NULL, 0, NULL, NULL, NULL, '2021-08-17 14:39:33', 'cbgSjhgBFgNIErAr8JW0L1KegGeVaN8wJwjMTdZpGiS2WEDgwW6jxSHdmrKJ2mb2BOTA1y4aKZuXqK4J', '7Cj9pGsTl69hf0UmMUpMuiuG8Z4ls73QjilZWTWHPmGZ3K9z1WBfjqYOCFaBIssbGOgov0S5I76jWRjR', NULL, NULL, NULL, '', '2021-09-23 11:37:08', NULL),
(13, 'MBEPL/IT/2021-22/000013', 1, 'IT', 'Procurement', 2, 'Open', NULL, NULL, NULL, 92.92, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 15:27:50', 'ccI4ZVBkQFCgNx8AZPGgWc6YOSrN5zuTDpLRUJorpeWCN32pkSNMEGWf7HSUuqxihuUP7cODVarvKLpn', NULL, NULL, NULL, NULL, '', '2021-09-28 17:22:29', NULL),
(14, 'MBEPL/IT/2021-22/000014', 1, 'IT', 'Procurement', 2, 'Open', NULL, NULL, NULL, 177163.52, 0, NULL, 0, NULL, NULL, NULL, '2021-07-17 15:36:50', 'xuQtMeHlHfzcSiJeLR1yYaAk8qzdYPLW5YhhC1pJqcwWNoz0fsXqziaxit2GDWHRWdKnVwSXQ03DXPYf', 'WxrvjnMKTUHgSxxvirwIJAJMHyGM0P9lE40Ve3cZI67ncJZ3ZBHWAQqIWaiVYIWy2CN9Nm4Ix47s6XKc', NULL, NULL, NULL, '', '2021-09-28 17:39:14', NULL),
(15, 'MBEPL/IT/2021-22/000015', 1, 'IT', 'Procurement', 2, 'Open', NULL, NULL, NULL, 177163.52, 0, NULL, 0, NULL, NULL, NULL, '2021-06-17 15:39:42', 'gusDhIiQ1mEIqKk2IiI3fHwvhgp4lACgSkUSoD3SueeuOo9dKlv6Ug9M7sl8pElHZGkpVSnCzLqjR3CW', 'q17uyybEHWNJGRepYotQ9bHmKma8KPQGRCe7hAzWxIH6tUqkpJITfLbgco8gQX4o2oemJi52o1bxN2sW', NULL, NULL, NULL, '', '2021-09-29 05:14:33', NULL),
(16, 'MBEPL/IT/2021-22/000016', 28, 'IT', 'Procurement', 2, 'Open', NULL, NULL, NULL, 177163.52, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 15:42:34', 'FQSZoYxtgY4tmXeCT0lM2u8YKNLaz3FBOd46DgwPxWsD6lraPIgnAeXxPPNdMtXKxx5CuCLiFcub6WsX', 'haFY97XN18ffVgFpRzROZ9LZ3TIHVO8xbc7gtfMzcMPDLTXrG4LZPzJXreMgmyYr7VwscsVanZYu86Do', NULL, NULL, NULL, '', '2021-09-28 17:22:45', NULL),
(17, 'MBEPL/IT/2021-22/000017', 28, 'IT', 'Procurement', 1, 'Open', NULL, NULL, NULL, 178916.41, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 16:25:10', 'OvJiXb7iYFiUeJZOISbc9BinEqo8eCwCyUo4EOAGDUL2r6Z4teCPB5YPWZsEmVQ5HSj8Yg9tN9PKeczL', 'JvUZHJXR2O58vHatw51DMy3IqcNpVIyp745tKiNdnXPvXtMsAxCl48fYubN1SiPN4YuH2CieG5oLNzMs', NULL, NULL, NULL, '', '2021-09-28 17:22:50', NULL),
(18, 'MBEPL/IT/2021-22/000018', 28, 'IT', 'Procurement', 6, 'Open', NULL, NULL, NULL, 1769.04, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 16:42:16', 'jEMJPyk07D60bDEkb0L3tllQoe3cCoNlgK88zkufbq1v3AW8CmKEp1sKmLUBjPBq0myaid8JGXhiba7U', 'xhRnj09aDEteqZneHQMKUB9hL3CVeXgJZ3IOTfyJCScbz8JehiiHQinSKwS6ClrAXlTnyIcTlrn18Idg', NULL, NULL, NULL, '', '2021-09-28 17:22:56', NULL),
(19, 'MBEPL/IT/2021-22/000019', 28, 'IT', 'Procurement', 6, 'Open', 'This is testing', 'High', 3, 178916.41, 0, NULL, 0, NULL, NULL, NULL, '2021-08-17 17:19:43', 'X8MbZlgUJ3CoPz2Br2ECo7UbhQ4kEiSq3R0H34bGWUxj9JxG8tFBxakUEulJmsLZpGh7bcXaXEDVtuxJ', 'wjRcTXpjoWLwAgFcqdEbM9F33lFV4ykHDugxoVhF0przZzdhSITpkT3vesE88bkCNi70Lv0JktdkBtCU', NULL, NULL, NULL, '', '2021-09-28 17:23:02', NULL),
(20, 'MBEPL/IT/2021-22/000020', 28, 'IT', 'Procurement', 1, 'Open', 'This is testing', 'Medium', 3, NULL, 0, NULL, 0, NULL, NULL, NULL, '2021-08-18 00:26:05', 'ggH2yWmKt2lRBS2XdWHmz0BQe0UXogF0m4XHRuGlYSOW6IjSVaAgOpZ3Ewf8B9EfqKAyv1ogeVKUb3Zi', 'M5FpNL4xtxem4xARhaqFahkWF1iCrnTranN0Y5UkZizP7yBnVnCjdO6BG1fCdCggTwbbTo93gKDAOq05', NULL, NULL, NULL, '', '2021-08-18 00:26:05', NULL),
(21, 'MBEPL/IT/2021-22/000021', 28, 'IT', 'Procurement', 1, 'Open', 'This is testing', 'Low', 3, NULL, 0, NULL, 0, NULL, NULL, NULL, '2021-08-18 00:32:22', '5Fqjt4KFydqwToY0WuPIPxaelyvIK1VQXtbA9Ee2atTnApjt82mVno66LR2LA8MNIepzg6630qgV0IdQ', 'HI8h9GAgUUtPqZ2E90iRRIsdI5KimiYsTZEYML4GMllT9F8YHMUO4LXWw1rRSRHo4AlVSMQVh61Knd0r', NULL, NULL, NULL, '', '2021-08-18 00:32:22', NULL),
(22, 'MBEPL/IT/2021-22/000022', 28, 'IT', 'Procurement', 1, 'Open', 'This is testing', 'Medium', 3, 178916.41, 0, NULL, 0, NULL, NULL, NULL, '2021-08-18 00:39:14', '6mzwpPZHoD3QNcMIAdmfo0EUlrWWQjYVOyvgQH8DRzyS9rZNZGJLj3tXWQdUnQUD72TMqGFiQNsqVUbK', 'uMVF1eWeRIeEm6mfy2oi6VaHD0CE0aJdsD80cPOyivFtDqpQCLKWySuscEoio0oJn5tAmPR0NyXOMUgd', NULL, NULL, NULL, '', '2021-09-28 17:23:07', NULL),
(23, 'MBEPL/IT/2021-22/000023', 28, 'IT', 'Procurement', 1, 'Delivered', 'This is testing', 'Low', 3, 268374.59, 0, NULL, 0, NULL, NULL, NULL, '2021-08-18 04:56:32', 'CygmgxL0Abge56Nohg5mbCXourSg7CBe6yDPSOBRoMLfTmhOEz0JRkfFiYEaUsvwr9CnQIojIbl3juYo', 'ci7cbt5PzIQJcDHP3ffCIEpifdyKUbIIafdHxDZ79piH2OpX5xd8QfgHZWC6o1nNZJHuxzaW8Gk9HWNM', NULL, 'OK', '4', '', '2021-09-29 16:00:32', NULL),
(24, 'MBEPL/Admin/2021-22/000024', 28, 'Admin', 'Service Request', 3, 'In Progress', 'This is testing', 'Low', 2, NULL, 1, '2021-08-19 13:06:55', 1, '2021-08-19 13:06:55', NULL, NULL, '2021-08-19 13:06:55', NULL, NULL, 18, NULL, NULL, 'abc', '2021-08-19 14:08:08', NULL),
(25, 'MBEPL/IT/2021-22/000025', 28, 'IT', 'Service Request', 3, 'Resolved', 'This is testing', 'High', 1, NULL, 1, '2021-08-19 13:08:05', 1, '2021-08-19 13:08:05', NULL, NULL, '2021-08-19 13:08:05', NULL, NULL, 18, 'ok', '4', 'abc', '2021-09-29 15:02:37', NULL),
(26, 'MBEPL/IT/2021-22/000026', 28, 'IT', 'Service Request', 3, 'Open', 'This is testing', 'High', 1, NULL, 1, '2021-08-19 13:09:10', 1, '2021-08-19 13:09:10', NULL, NULL, '2021-08-19 13:09:10', NULL, NULL, 17, NULL, NULL, '', '2021-08-23 13:59:32', NULL),
(27, '000027', 28, 'Admin', 'Procurement', 2, 'Open', NULL, NULL, NULL, 462.00, 1, '2021-09-03 16:39:43', 1, '2021-09-03 16:39:47', NULL, NULL, '2021-09-03 11:08:37', 'qEQA7mXXUkBvHILpqbMAGpJs7SnPVvikxm5BPTVfkW73XG0o8zvQynIhgQaHfWHlOPgf68resoeON2IC', NULL, NULL, NULL, NULL, NULL, '2021-09-28 17:23:12', NULL),
(28, '000028', 28, 'IT', 'Service Request', 4, 'Resolved', 'I want new one', 'High', 8, NULL, 1, '2021-09-29 10:27:04', 1, '2021-09-29 10:27:04', NULL, NULL, '2021-09-29 10:27:04', NULL, NULL, 18, 'ok', '10', 'anything else', '2021-10-01 14:16:56', NULL),
(29, '000029', 28, 'Admin', 'Service Request', 5, 'Resolved', 'I want new one', 'High', 9, NULL, 1, '2021-09-29 10:27:27', 1, '2021-09-29 10:27:27', NULL, NULL, '2021-09-29 10:27:27', NULL, NULL, 18, 'ok', '7', 'OK', '2021-10-01 14:16:50', NULL),
(30, '000030', 36, 'IT', 'Procurement', 6, 'Dispatched', NULL, NULL, NULL, 1969.92, 1, '2021-10-29 00:29:58', 1, '2021-09-29 12:37:02', NULL, NULL, '2021-09-29 12:28:37', 'tzs5XXirde2i95EEraSqVIeGSXvmWda9VVjD6QfDs0sMoXx5HvSedinNHW8arYVR3Ciatd8T6WKzZE7l', NULL, NULL, NULL, NULL, NULL, '2021-09-29 13:31:57', NULL),
(31, '000031', 28, 'IT', 'Service Request', 4, 'Resolved', 'it breaks', 'Medium', 10, NULL, 1, '2021-10-29 00:29:08', 1, '2021-09-29 16:19:06', NULL, NULL, '2021-09-29 16:19:06', NULL, NULL, 18, 'OK', '7', 'than ku', '2021-09-29 16:23:32', NULL),
(32, '000032', 28, 'IT', 'Procurement', 4, 'Open', NULL, NULL, NULL, 1769.04, 0, NULL, 0, NULL, NULL, NULL, '2021-09-29 16:54:21', '7Ve4lii12cftGuWNGRp74XIN2wYQQxNP06MYGAwtq9tQgdTQJFVhedE5RxWvMq59RzMTZzJIh3bBe0xJ', NULL, NULL, NULL, NULL, NULL, '2021-09-29 16:54:21', NULL),
(33, '000033', 28, 'IT', 'Procurement', 7, 'Open', NULL, NULL, NULL, 88573.68, 1, '2021-10-01 07:27:52', 0, NULL, NULL, NULL, '2021-10-01 07:26:33', 'b12j53vYYO72z0SoSAbp1L4vsPAS00zYKt7wdNdpxz5KR5WTgn7boJzYfY7PrfAB1oL2AovhjwnNuqH5', '99uOaYi4PiP5N3uBmC5vJ0h52wXrbry3CikOpin8NQYWTZkPv4JXtt34A7cxV8ttGYWjCG5qyRGNItZM', NULL, NULL, NULL, NULL, '2021-10-01 07:27:52', NULL),
(34, '000034', 36, 'IT', 'Procurement', 1, 'Dispatched', NULL, NULL, NULL, 88573.68, 1, '2021-10-01 09:53:57', 1, '2021-10-01 09:54:43', NULL, NULL, '2021-10-01 09:51:23', 'arV0yaCaIIctDablv69RBvpeUiaXUdg9eudiChRd8WSBmwTEc0KWhxscAeL3EAW8H5rLsJmdV0n3f5pu', 'EV0BNsVT20zCOs3J95f3AyZ5hHl6nCmfB7KuQAwGUk4MjPXZzIB6aG2KOArMpXgoMQXeCsfSub0K7jeZ', NULL, NULL, NULL, NULL, '2021-10-02 05:04:02', NULL),
(35, '000035', 28, 'IT', 'Service Request', 4, 'Resolved', 'OK', 'Medium', 1, NULL, 1, '2021-10-01 09:51:51', 1, '2021-10-01 09:51:51', NULL, NULL, '2021-10-01 09:51:51', NULL, NULL, 18, 'ok', '8', 'ok', '2021-10-01 10:18:55', NULL),
(36, '000036', 28, 'Admin', 'Service Request', 5, 'Open', 'it breaks', 'Low', 5, NULL, 1, '2021-10-01 09:52:15', 1, '2021-10-01 09:52:15', NULL, NULL, '2021-10-01 09:52:15', NULL, NULL, 18, NULL, NULL, NULL, '2021-10-01 13:21:59', NULL),
(37, '000037', 28, 'IT', 'Procurement', 2, 'Open', NULL, NULL, NULL, 88573.68, 1, '2021-10-01 12:15:04', 1, '2021-10-01 12:17:51', NULL, NULL, '2021-10-01 12:07:41', 'TWfYL40WEgKhEeKkzcRnV1Jr93cf1eHlKe9OPW8zDGnowTGYYokoPGJyk5BGNmmDrpLYaD7L8NOox7B1', 'COAKRP8pleUy7fdtk3kCByw1lRDnnnTO29rKdKM7AEpSNDN0a52zhHs87nLMiK0jRyFWrM0hwHkY9VLN', NULL, NULL, NULL, NULL, '2021-10-01 13:09:49', NULL),
(38, '000038', 28, 'Admin', 'Procurement', 4, 'Open', NULL, NULL, NULL, 195.55, 1, '2021-10-01 12:18:27', 1, '2021-10-01 12:18:27', NULL, NULL, '2021-10-01 12:09:10', 'EQDBSEsktd155yVkaxA4sQh89CkoJaiddG9s9zU5dCqq8SgfY4RujmWoiihmbhUD5z9mnluAslLMW80T', NULL, NULL, NULL, NULL, NULL, '2021-10-01 13:20:20', NULL),
(39, '000039', 28, 'IT', 'Service Request', 4, 'Open', 'Lan cable not working', 'Low', 13, NULL, 1, '2021-10-01 12:10:35', 1, '2021-10-01 12:10:35', NULL, NULL, '2021-10-01 12:10:35', NULL, NULL, 18, NULL, NULL, NULL, '2021-10-01 13:12:02', NULL),
(40, '000040', 28, 'Admin', 'Service Request', 6, 'Resolved', 'I want new AMD graphics', 'Low', 9, NULL, 1, '2021-10-01 12:11:24', 1, '2021-10-01 12:11:24', NULL, NULL, '2021-10-01 12:11:24', NULL, NULL, 18, 'ok', '6', 'ok', '2021-10-01 14:16:44', NULL),
(41, '000041', 28, 'IT', 'Service Request', 3, 'Resolved', 'ok', 'Low', 1, NULL, 1, '2021-10-02 04:32:38', 1, '2021-10-02 04:32:38', NULL, NULL, '2021-10-02 04:32:38', NULL, NULL, 18, 'thanku', '6', 'ok', '2021-10-02 04:34:21', NULL),
(42, '000042', 28, 'IT', 'Procurement', 5, 'Open', NULL, NULL, NULL, 884.52, 1, '2021-10-02 04:37:07', 1, '2021-10-02 04:37:07', NULL, NULL, '2021-10-02 04:36:15', '4AWsk6eSKYSXLDudS2UCd18uIMSSCXN08l507myko9M3qhR7YdEJ82KpM2OzKl3CWKpghl6PqM6AlYPu', NULL, NULL, NULL, NULL, NULL, '2021-10-02 05:02:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `request_items`
--

CREATE TABLE `request_items` (
  `ID` int(11) NOT NULL,
  `Request_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `UOM` varchar(20) NOT NULL,
  `Per_Unit_Price` float(10,2) NOT NULL,
  `Total_Price` float(10,2) NOT NULL,
  `TAX_Percentage` float(10,2) NOT NULL,
  `TAX_Value` float(10,2) NOT NULL,
  `Sub_Total` float(10,2) NOT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request_items`
--

INSERT INTO `request_items` (`ID`, `Request_ID`, `Product_ID`, `Quantity`, `UOM`, `Per_Unit_Price`, `Total_Price`, `TAX_Percentage`, `TAX_Value`, `Sub_Total`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(1, 6, 692, 5, 'kg', 10.00, 50.00, 5.00, 2.50, 52.50, NULL, '2021-08-12 06:28:45', '2021-09-29 16:37:51'),
(2, 1, 693, 4, 'Pkt', 25.00, 100.00, 5.00, 5.00, 105.00, NULL, '2021-08-12 06:28:45', '2021-08-12 06:28:45'),
(3, 1, 694, 5, 'Box', 30.00, 150.00, 5.00, 7.50, 157.50, NULL, '2021-08-12 06:28:45', '2021-08-12 06:28:45'),
(4, 1, 695, 5, 'Nos', 20.00, 100.00, 5.00, 5.00, 105.00, NULL, '2021-08-12 06:28:45', '2021-08-12 06:28:45'),
(5, 10, 704, 2, 'kg', 567.00, 1701.00, 56.00, 952.56, 2653.56, NULL, '2021-08-17 14:55:11', '2021-08-25 12:41:54'),
(6, 10, 13, 5, 'Can', 4.00, 20.00, 1.00, 0.20, 20.20, NULL, '2021-08-17 14:55:11', '2021-08-17 14:55:11'),
(7, 10, 702, 3, 'Pkt', 56778.00, 170334.00, 56.00, 95387.04, 265721.03, NULL, '2021-08-17 14:55:11', '2021-08-25 12:41:54'),
(8, 11, 704, 4, 'Box', 567.00, 2268.00, 56.00, 1270.08, 3538.08, NULL, '2021-08-17 15:00:48', '2021-08-17 15:00:48'),
(9, 11, 702, 5, 'Box', 56778.00, 283890.00, 56.00, 158978.41, 442868.41, NULL, '2021-08-17 15:00:48', '2021-08-17 15:00:48'),
(10, 12, 13, 34, 'Can', 4.00, 136.00, 1.00, 1.36, 137.36, NULL, '2021-08-17 15:26:32', '2021-08-17 15:26:32'),
(11, 12, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 15:26:32', '2021-08-17 15:26:32'),
(12, 13, 13, 23, 'Can', 4.00, 92.00, 1.00, 0.92, 92.92, NULL, '2021-08-17 15:27:51', '2021-09-28 17:22:29'),
(13, 14, 13, 4, 'Can', 4.00, 16.00, 1.00, 0.16, 16.16, NULL, '2021-08-17 15:36:50', '2021-09-28 17:39:14'),
(14, 14, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 15:36:50', '2021-09-28 17:39:14'),
(15, 15, 13, 4, 'Can', 4.00, 16.00, 1.00, 0.16, 16.16, NULL, '2021-08-17 15:39:43', '2021-09-29 05:14:33'),
(16, 15, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 15:39:43', '2021-09-29 05:14:33'),
(17, 16, 13, 4, 'Can', 4.00, 16.00, 1.00, 0.16, 16.16, NULL, '2021-08-17 15:42:34', '2021-09-28 17:22:45'),
(18, 16, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 15:42:34', '2021-09-28 17:22:45'),
(19, 17, 704, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-17 16:25:10', '2021-09-28 17:22:50'),
(20, 17, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 16:25:10', '2021-09-28 17:22:50'),
(21, 18, 704, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-17 16:42:16', '2021-09-28 17:22:56'),
(22, 19, 704, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-17 17:19:43', '2021-09-28 17:23:02'),
(23, 19, 702, 2, 'Box', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-17 17:19:43', '2021-09-28 17:23:02'),
(24, 20, 704, 2, 'kg', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-18 00:26:05', '2021-08-18 00:26:05'),
(25, 20, 702, 2, 'Pkt', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-18 00:26:05', '2021-08-18 00:26:05'),
(26, 21, 704, 2, 'kg', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-18 00:32:22', '2021-08-18 00:32:22'),
(27, 21, 702, 2, 'Pkt', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-18 00:32:22', '2021-08-18 00:32:22'),
(28, 22, 704, 2, 'kg', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-08-18 00:39:14', '2021-09-28 17:23:08'),
(29, 22, 702, 2, 'Pkt', 56778.00, 113556.00, 56.00, 63591.36, 177147.36, NULL, '2021-08-18 00:39:14', '2021-09-28 17:23:08'),
(30, 23, 704, 3, 'kg', 567.00, 1701.00, 56.00, 1270.08, 2653.56, NULL, '2021-08-18 04:56:32', '2021-08-26 12:18:40'),
(31, 23, 702, 3, 'Pkt', 56778.00, 170334.00, 56.00, 95387.04, 265721.03, NULL, '2021-08-18 04:56:32', '2021-08-26 12:18:40'),
(37, 27, 693, 10, 'Pkt', 25.00, 250.00, 5.00, 12.50, 262.50, NULL, '2021-09-03 11:08:38', '2021-09-28 17:23:12'),
(38, 27, 695, 2, 'Nos', 20.00, 40.00, 5.00, 2.00, 42.00, NULL, '2021-09-03 11:08:38', '2021-09-28 17:23:12'),
(39, 27, 694, 5, 'Box', 30.00, 150.00, 5.00, 7.50, 157.50, NULL, '2021-09-03 11:08:38', '2021-09-28 17:23:12'),
(40, 30, 704, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-09-29 12:28:37', '2021-09-29 13:29:18'),
(41, 30, 715, 3, 'sfsdf', 45.90, 137.70, 45.88, 63.18, 200.88, NULL, '2021-09-29 12:28:37', '2021-09-29 13:29:18'),
(42, 32, 704, 2, 'Box', 567.00, 1134.00, 56.00, 635.04, 1769.04, NULL, '2021-09-29 16:54:22', '2021-09-29 16:54:22'),
(43, 33, 702, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, NULL, '2021-10-01 07:26:33', '2021-10-01 07:26:33'),
(44, 34, 702, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, NULL, '2021-10-01 09:51:23', '2021-10-02 05:03:37'),
(45, 37, 702, 1, 'Box', 56778.00, 56778.00, 56.00, 31795.68, 88573.68, NULL, '2021-10-01 12:07:41', '2021-10-01 13:09:49'),
(46, 38, 700, 1, 'sfsdf', 45.90, 45.90, 45.88, 21.06, 66.96, NULL, '2021-10-01 12:09:10', '2021-10-01 13:20:20'),
(47, 38, 697, 1, 'Gram', 77.00, 77.00, 67.00, 51.59, 128.59, NULL, '2021-10-01 12:09:10', '2021-10-01 13:20:20'),
(48, 42, 704, 1, 'Box', 567.00, 567.00, 56.00, 952.56, 884.52, NULL, '2021-10-02 04:36:15', '2021-10-02 05:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`ID`, `Name`, `Is_Active`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'Can', 1, '2021-07-30 06:49:22', '2021-07-30 06:49:22', NULL),
(2, 'Nos', 1, '2021-07-30 06:49:33', '2021-07-30 06:49:33', NULL),
(3, 'Pkt', 1, '2021-07-30 06:49:46', '2021-07-30 06:49:46', NULL),
(4, 'Roll', 1, '2021-07-30 06:49:57', '2021-07-30 06:49:57', NULL),
(5, 'Box', 1, '2021-07-30 06:50:02', '2021-07-30 06:50:02', NULL),
(6, 'Kg', 1, '2021-07-30 06:50:08', '2021-07-30 06:50:08', NULL),
(7, 'Rft', 1, '2021-07-30 06:50:16', '2021-07-30 06:50:16', NULL),
(8, 'Sqmtr', 1, '2021-07-30 06:50:31', '2021-07-30 06:50:31', NULL),
(9, 'Sqft', 1, '2021-07-31 00:49:02', '2021-07-31 00:55:19', NULL),
(11, 'aa', 1, '2021-07-31 02:18:20', '2021-07-31 02:18:20', '2021-07-31 02:18:26'),
(12, 'aaa11', 1, '2021-07-31 11:06:01', '2021-07-31 11:06:17', '2021-07-31 11:06:48'),
(13, 'bbb', 1, '2021-07-31 11:06:29', '2021-07-31 11:06:29', '2021-07-31 13:05:04'),
(14, 'Sqft11111', 1, '2021-08-13 05:37:01', '2021-08-13 05:37:01', NULL),
(15, 'sumit', 1, '2021-08-13 05:39:34', '2021-08-13 05:39:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Employee_Code` varchar(20) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Mobile` varchar(20) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `User_Type` enum('System Admin','IT','Admin','Requester','Support','Approver','IT System Admin','Admin System Admin','') NOT NULL,
  `HOD` int(11) DEFAULT NULL,
  `HEAD` int(11) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `Department` varchar(50) DEFAULT NULL,
  `Cost_Center` varchar(50) DEFAULT NULL,
  `OTP` int(11) DEFAULT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Deleted_At` datetime DEFAULT NULL,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Employee_Code`, `Name`, `Email`, `Mobile`, `Password`, `User_Type`, `HOD`, `HEAD`, `Location`, `Department`, `Cost_Center`, `OTP`, `Is_Active`, `Deleted_At`, `Created_At`, `Updated_At`) VALUES
(1, 'EMP0056', 'Sumit1', 'patilharesh008@gmail.com', '9405264157', '$2a$10$985EIoLyz/y9SsAoo9zfNef3qQlVTRlyOoarTzt0v1hEXNu3gBhIK', 'System Admin', 13, 5, 'Pune', 'IT', 'asd', 4282, 1, NULL, '2021-07-27 11:29:25', '2021-08-23 10:09:07'),
(3, 'EMP8890', 'support update', 'support134589@gmail.com', '8989898989', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'IT', 13, 5, 'Delhi', 'Admin', 'asd', NULL, 1, NULL, '2021-07-27 11:39:19', '2021-07-31 11:44:38'),
(5, 'EMP0060', 'Ironman', 'ironman@gmail.com', '9405264158', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'System Admin', 16, 20, 'Delhi', 'IT', 'asd', NULL, 1, NULL, '2021-07-29 18:39:41', '2021-09-01 09:31:19'),
(13, 'EMP0062', 'spiderman', 'littlespeedster4@gmail.com', '9405264158', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'System Admin', 13, 5, 'Delhi', 'IT', 'asd', 1185, 1, NULL, '2021-07-29 19:51:13', '2021-08-23 16:04:21'),
(15, 'EMP0009911', 'jay patil', 'provider678@gmail.com', '9098877899', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 13, 5, 'mumbai', 'NON-IT', 'Nagpur', NULL, 1, NULL, '2021-07-30 07:09:45', '2021-07-30 08:48:00'),
(16, 'EMP0001', 'Requester1', 'request@gmail.com', '9405264158', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 5, 13, 'Delhi', 'Admin', 'asd', NULL, 1, NULL, '2021-07-30 07:17:24', '2021-08-30 17:53:45'),
(17, 'Emp000AA', 'aron finch', 'sumitsakpal021@gmail.com', '7876878878', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Support', 13, 5, 'kokan', 'department', 'Gao', NULL, 1, NULL, '2021-07-30 08:59:45', '2021-07-30 09:00:03'),
(18, 'EMP00089', 'name TT', 'patilharesh008@gmail.com', '7785959566', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Support', 5, 13, 'den', 'dell', 'denmark', NULL, 1, NULL, '2021-07-30 10:15:19', '2021-07-30 10:16:20'),
(19, 'EMP00990', 'amar patil', 'amarpatil990@gmail.com', '9990000909', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 13, 5, 'Cuba', 'Requester Departmet', 'Cuba', NULL, 1, '2021-07-30 11:22:13', '2021-07-30 11:21:44', '2021-07-30 11:22:13'),
(20, 'EMP00001', 'haresh patil', 'prov909@gmail.com', '9767629909', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 13, 5, 'pune', 'Admin111', 'Mumbai', NULL, 1, NULL, '2021-07-30 12:34:59', '2021-07-30 12:37:04'),
(22, '11111EMP', 'harsh patil', 'prova11@gmail.com', '9767629011', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'System Admin', 17, 5, 'tyuiiiiy', 'Department11', 'Abcdef', NULL, 1, '2021-07-31 11:44:58', '2021-07-31 11:43:48', '2021-07-31 11:43:49'),
(24, 'EMP00099', 'Requester2', 'abc@gmail.com', '9405264157', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 5, 13, 'Delhi', 'IT', 'asd', NULL, 1, '2021-08-04 10:15:02', '2021-08-04 10:11:39', '2021-08-04 10:13:31'),
(26, 'EMP00101', 'Sumit', 'sumitsakpal02@gmail.com', '9405264157', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'IT', 5, 13, 'Devgad', 'Admin', 'asd', 118, 1, NULL, '2021-08-04 14:09:24', '2021-08-25 05:13:21'),
(27, 'EMP00102', 'Zeal', 'dmc172036@zealeducation.com', '9405264157', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'System Admin', 26, 5, 'Devgad', 'Admin', 'asd', NULL, 1, NULL, '2021-08-04 14:12:26', '2021-08-04 14:12:26'),
(28, 'EMP00103', 'techsmit', 'hackertechsmit@gmail.com', '9405264157', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Requester', 26, 27, 'Devgad', 'Admin', 'asd', NULL, 1, NULL, '2021-08-04 14:51:13', '2021-08-04 14:51:13'),
(29, 'EMP00104', 'little speedster', 'littlespeedster4@gmail.com', '9405264157', '$2a$10$YWJUMOn/EebFAuyR5cpn4uw/Z5TK52uc4WXxoTEDktg.QLCUhgwpS', 'Admin', 26, 27, 'Devgad', 'Admin', 'asd', NULL, 1, NULL, '2021-08-04 14:55:09', '2021-08-04 14:55:09'),
(36, 'EMP00105', 'IT System Admin', 'littlespeedster4@gmail.com', '9405264157', '$2a$10$SH8AdMbXDsWtpo2eBmBO/eceYLh.AOs9HV/Qbhv5ZsNcAouQx0Va.', 'IT System Admin', 26, 27, 'Devgad', 'Admin', 'asd', NULL, 1, NULL, '2021-09-22 12:11:27', '2021-09-22 12:11:27'),
(37, 'EMP00106', 'Admin System Admin', 'littlespeedster4@gmail.com', '9405264157', '$2a$10$a3nQy3B0Vkqa2SlXUoJbNOFp8CojYV99liZaeUwjgiKgqa.Psqi7a', 'Admin System Admin', 26, 27, 'Devgad', 'Admin', 'asd', NULL, 1, NULL, '2021-09-22 12:12:06', '2021-09-22 12:12:06');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `ID` int(11) NOT NULL,
  `ALT_Code` varchar(20) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_Person` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `State` varchar(20) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `Address` varchar(1000) NOT NULL,
  `Pincode` varchar(6) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `GST_No` varchar(20) DEFAULT NULL,
  `PAN_No` varchar(20) DEFAULT NULL,
  `Bank_Name` varchar(50) DEFAULT NULL,
  `Account_Number` varchar(20) DEFAULT NULL,
  `Bank_Branch` varchar(50) DEFAULT NULL,
  `IFSC_Code` varchar(20) DEFAULT NULL,
  `Bank_Address` varchar(250) DEFAULT NULL,
  `Is_Active` tinyint(1) NOT NULL DEFAULT 1,
  `Created_At` datetime NOT NULL,
  `Updated_At` datetime NOT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`ID`, `ALT_Code`, `Name`, `Contact_Person`, `Email`, `Phone`, `State`, `Country`, `City`, `Address`, `Pincode`, `Description`, `GST_No`, `PAN_No`, `Bank_Name`, `Account_Number`, `Bank_Branch`, `IFSC_Code`, `Bank_Address`, `Is_Active`, `Created_At`, `Updated_At`, `Deleted_At`) VALUES
(1, 'IN1', 'spiderman26', 'Sumit11144', 'sumitsakpal02@gmail.com', '9766449791', 'MH', 'India', 'Devgad', 'Devgad', '416613', 'This is testing', '123456789112345', 'HJVJ54KH56', 'Bank Of India', '1468129041028122', 'Devgad', 'BKID0004747', 'Devgad', 1, '2021-08-19 07:20:35', '2021-08-19 07:20:35', NULL),
(3, 'IN24', 'spiderman24', 'Sumit11144', 'patilharesh008@gmail.com', '9766449791', 'MH', 'India', 'Devgad', 'Devgad', '416613', 'This is testing', '12345678111asdf', 'HJVJ54KH56', 'Bank Of India', '1468129041028122', 'Devgad', 'BKID0004747', 'Devgad', 1, '2021-08-19 07:20:44', '2021-08-30 13:26:05', NULL),
(5, 'IN3', 'Sumit', 'Sumit11144', 'hackertechsmit@gmail.com', '9766449791', 'MH', 'India', 'Devgad', 'Devgad', '416613', 'This is testing', '12345678911aaaa', 'HJVJ54KH56', 'Bank Of India', '1468129041028122', 'Devgad', 'BKID0004747', 'Devgad', 1, '2021-08-30 10:01:04', '2021-08-30 10:01:04', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Barcode` (`Barcode`),
  ADD KEY `Inward_ID` (`Inward_ID`),
  ADD KEY `assets_ibfk_2` (`Current_Location`),
  ADD KEY `assets_ibfk_3` (`Product_ID`);

--
-- Indexes for table `asset_transactions`
--
ALTER TABLE `asset_transactions`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Dispatch_ID` (`Dispatch_ID`),
  ADD KEY `Asset_ID` (`Asset_ID`),
  ADD KEY `Location_From` (`Location_From`),
  ADD KEY `Location_To` (`Location_To`);

--
-- Indexes for table `cost_centers`
--
ALTER TABLE `cost_centers`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `dispatch`
--
ALTER TABLE `dispatch`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `inward`
--
ALTER TABLE `inward`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Vendor_ID` (`Vendor_ID`);

--
-- Indexes for table `issue_types`
--
ALTER TABLE `issue_types`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `item_stocks`
--
ALTER TABLE `item_stocks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `ALT_Code` (`ALT_Code`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `manufacturers_ibfk_1` (`Product_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `ALT_Code` (`ALT_Code`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `PO_Number` (`PO_Number`),
  ADD KEY `Vendor_ID` (`Vendor_ID`) USING BTREE,
  ADD KEY `PO_Raised_By` (`PO_Raised_By`) USING BTREE;

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Product_ID` (`Product_ID`) USING BTREE,
  ADD KEY `Purchase_Order_ID` (`Purchase_Order_ID`) USING BTREE;

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Request_Number` (`Request_Number`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Location_ID` (`Location_ID`),
  ADD KEY `Type_Of_Issue` (`Type_Of_Issue`),
  ADD KEY `Assigned_To` (`Assigned_To`);

--
-- Indexes for table `request_items`
--
ALTER TABLE `request_items`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Product_ID` (`Product_ID`) USING BTREE,
  ADD KEY `Request_ID` (`Request_ID`) USING BTREE;

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Employee_Code` (`Employee_Code`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `ALT_Code` (`ALT_Code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `asset_transactions`
--
ALTER TABLE `asset_transactions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=566;

--
-- AUTO_INCREMENT for table `cost_centers`
--
ALTER TABLE `cost_centers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `dispatch`
--
ALTER TABLE `dispatch`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `inward`
--
ALTER TABLE `inward`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `issue_types`
--
ALTER TABLE `issue_types`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `item_stocks`
--
ALTER TABLE `item_stocks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=726;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=320;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `request_items`
--
ALTER TABLE `request_items`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`Inward_ID`) REFERENCES `inward` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assets_ibfk_2` FOREIGN KEY (`Current_Location`) REFERENCES `location` (`ID`),
  ADD CONSTRAINT `assets_ibfk_3` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `asset_transactions`
--
ALTER TABLE `asset_transactions`
  ADD CONSTRAINT `asset_transactions_ibfk_1` FOREIGN KEY (`Dispatch_ID`) REFERENCES `dispatch` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `asset_transactions_ibfk_2` FOREIGN KEY (`Asset_ID`) REFERENCES `assets` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `asset_transactions_ibfk_3` FOREIGN KEY (`Location_From`) REFERENCES `location` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `asset_transactions_ibfk_4` FOREIGN KEY (`Location_To`) REFERENCES `location` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `inward`
--
ALTER TABLE `inward`
  ADD CONSTRAINT `inward_ibfk_1` FOREIGN KEY (`Vendor_ID`) REFERENCES `vendors` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `item_stocks`
--
ALTER TABLE `item_stocks`
  ADD CONSTRAINT `item_stocks_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD CONSTRAINT `manufacturers_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`Vendor_ID`) REFERENCES `vendors` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_orders_ibfk_2` FOREIGN KEY (`PO_Raised_By`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_order_items_ibfk_2` FOREIGN KEY (`Purchase_Order_ID`) REFERENCES `purchase_orders` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_3` FOREIGN KEY (`Type_Of_Issue`) REFERENCES `issue_types` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_4` FOREIGN KEY (`Assigned_To`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `request_items`
--
ALTER TABLE `request_items`
  ADD CONSTRAINT `request_items_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_items_ibfk_2` FOREIGN KEY (`Request_ID`) REFERENCES `request` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
