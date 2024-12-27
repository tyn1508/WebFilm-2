-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th12 25, 2024 lúc 04:51 PM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `webphim`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `UserID` int NOT NULL,
  `MovieID` int NOT NULL,
  PRIMARY KEY (`UserID`,`MovieID`),
  KEY `FK_Favorites_Movies_New` (`MovieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `MovieID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `ReleaseYear` year DEFAULT NULL,
  `Duration` int DEFAULT NULL,
  `Description` text,
  `Country` varchar(100) DEFAULT NULL,
  `Quality` enum('HD','FullHD','4K') DEFAULT 'HD',
  `ThumbnailURL` varchar(500) DEFAULT NULL,
  `CategoryID` int DEFAULT NULL,
  `Views` int DEFAULT '0',
  `Rating` decimal(3,1) DEFAULT '0.0',
  `DateAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MovieID`),
  KEY `FK_Movies_Categories` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `JoinDate` date DEFAULT NULL,
  `IsAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`UserID`),
  KEY `FK_Users_Admin` (`IsAdmin`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK_Favorites_Movies` FOREIGN KEY (`MovieID`) REFERENCES `movies` (`MovieID`),
  ADD CONSTRAINT `FK_Favorites_Movies_New` FOREIGN KEY (`MovieID`) REFERENCES `movies` (`MovieID`),
  ADD CONSTRAINT `FK_Favorites_Users` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `FK_Favorites_Users_New` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `FK_Movies_Categories` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`),
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
