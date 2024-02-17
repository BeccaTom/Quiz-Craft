# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: qs
# Generation Time: 2024-02-17 02:26:22 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table operations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `operations`;

CREATE TABLE `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `questionId` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;

INSERT INTO `operations` (`id`, `userId`, `questionId`, `type`, `created_at`, `updated_at`)
VALUES
	(1,'4','2','Like','2023-08-06 09:45:03','2023-08-06 09:45:03'),
	(25,'4','8','Like','2023-08-06 09:57:50','2023-08-06 09:57:50'),
	(30,'4','5','Dislike','2023-08-06 09:59:51','2023-08-06 09:59:51'),
	(39,'4','12','Like','2023-08-06 10:01:43','2023-08-06 10:01:43'),
	(42,'2','10','Like','2023-08-07 18:10:27','2023-08-07 18:10:27'),
	(44,'2','6','Dislike','2024-01-31 17:36:37','2024-01-31 17:36:37');

/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `type` varchar(255) DEFAULT NULL,
  `answer` text,
  `options` text,
  `difficulty` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`id`, `title`, `type`, `answer`, `options`, `difficulty`, `subject`, `desc`, `created_at`, `updated_at`)
VALUES
	(2,'1+6=?','Single','7','3~2~7~8','Easy','Math','tttttttttttttt','2023-08-05 10:17:33','2023-08-05 15:44:59'),
	(4,'10+10=?','Single','20','23~20~1~43','Easy','Math','tttt','2023-08-05 15:44:36','2023-08-05 15:44:36'),
	(5,'Which are numbers?','Multiple','1~56','a~b~1~56','Easy','Math','tttt','2023-08-05 15:45:58','2023-08-05 15:45:58'),
	(6,'30 * 10 = 100 ?','True/False','Wrong','Right~Wrong','Easy','Math','qqq','2023-08-05 15:46:52','2023-08-05 15:46:52'),
	(7,'Which can be divided by 10?','Multiple','50~20~30','50~33~20~30','Easy','Math','aaaa','2023-08-05 15:47:44','2023-08-05 15:47:44'),
	(8,'3 is an even number','True/False','Wrong','Right~Wrong','Easy','Math','ccc','2023-08-05 15:48:21','2023-08-05 15:48:21'),
	(9,'60 / 20 = ?','Single','3','30~3~300~3000','Easy','Math','pppp','2023-08-05 16:04:10','2023-08-05 16:04:10'),
	(10,'1000 - 500 = ?','Single','500','500~300~200~1000','Easy','Math','mmm','2023-08-05 16:04:40','2023-08-05 16:04:40'),
	(11,'30 * 30 = ?','Single','900','10~900~300~100','Easy','Math','rrr','2023-08-05 16:05:21','2023-08-05 16:05:21'),
	(12,'60 * 30 = ?','Single','1800','10~543~300~1800','Easy','Math','uuu','2023-08-05 16:06:12','2023-08-05 16:06:12'),
	(13,'50 * 10 = ?','Single','500','500~543~76~876','Medium','Math','bbb','2023-08-05 16:06:49','2023-08-05 16:06:49');

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table records
# ------------------------------------------------------------

DROP TABLE IF EXISTS `records`;

CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `rightNum` int(11) DEFAULT NULL,
  `wrongNum` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;

INSERT INTO `records` (`id`, `userId`, `rightNum`, `wrongNum`, `time`, `type`, `subject`, `difficulty`, `created_at`, `updated_at`)
VALUES
	(1,'2',3,7,'16','True/False~Single~Multiple','Math','Easy','2023-08-05 17:29:19','2023-08-05 17:29:19'),
	(2,'2',0,10,'16','True/False~Single~Multiple','Math','Easy','2023-08-05 17:30:11','2023-08-05 17:30:11'),
	(3,'3',10,2,'30','True/False~Single~Multiple','Math','Easy','2023-08-05 17:31:08','2023-08-05 17:31:08'),
	(4,'4',8,2,'34','True/False~Single~Multiple','Math','Easy','2023-08-05 17:32:07','2023-08-05 17:32:07'),
	(5,'4',0,10,'160','True/False~Single~Multiple','Math','Easy','2023-08-05 17:50:02','2023-08-05 17:50:02'),
	(6,'4',0,10,'310','True/False~Single~Multiple','Math','Easy','2023-08-05 18:06:20','2023-08-05 18:06:20'),
	(7,'4',0,10,'156','True/False~Single~Multiple','Math','Easy','2023-08-06 09:19:15','2023-08-06 09:19:15'),
	(8,'4',0,10,'1691285370','True/False~Single~Multiple','Math','Easy','2023-08-06 09:29:30','2023-08-06 09:29:30'),
	(9,'4',0,10,'157','True/False~Single~Multiple','Math','Easy','2023-08-06 09:33:32','2023-08-06 09:33:32'),
	(10,'4',0,10,'156','True/False~Single~Multiple','Math','Easy','2023-08-06 09:37:08','2023-08-06 09:37:08'),
	(11,'4',0,10,'1691285913','True/False~Single~Multiple','Math','Easy','2023-08-06 09:38:33','2023-08-06 09:38:33'),
	(12,'2',2,8,'26','True/False~Single~Multiple','Math','Easy','2023-08-07 18:10:31','2023-08-07 18:10:31'),
	(13,'2',1,9,'24','True/False~Single~Multiple','Math','Easy','2024-01-31 17:36:58','2024-01-31 17:36:58');

/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `headpic` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `pwd`, `headpic`, `created_at`, `updated_at`)
VALUES
	(2,'aaa','a@qq.com','123','/pic9.png','2023-08-03 19:04:42','2023-08-03 19:04:42'),
	(3,'bbb','b@qq.com','123','/pic3.png','2023-08-05 17:30:28','2023-08-05 17:30:28'),
	(4,'ccc','c@qq.com','123','/pic2.png','2023-08-05 17:31:24','2023-08-05 17:31:24');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
