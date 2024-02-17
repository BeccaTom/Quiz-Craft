-- MySQL dump 10.13  Distrib 8.3.0, for macos13.6 (arm64)
--
-- Host: localhost    Database: qs
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `questionId` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations`
--

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` VALUES (1,'4','2','Like','2023-08-06 09:45:03','2023-08-06 09:45:03'),(25,'4','8','Like','2023-08-06 09:57:50','2023-08-06 09:57:50'),(30,'4','5','Dislike','2023-08-06 09:59:51','2023-08-06 09:59:51'),(39,'4','12','Like','2023-08-06 10:01:43','2023-08-06 10:01:43'),(42,'2','10','Like','2023-08-07 18:10:27','2023-08-07 18:10:27'),(44,'2','6','Dislike','2024-01-31 17:36:37','2024-01-31 17:36:37');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (2,'1+6=?','Single','7','3~2~7~8','Easy','Math','tttttttttttttt','2023-08-05 10:17:33','2023-08-05 15:44:59'),(4,'10+10=?','Single','20','23~20~1~43','Easy','Math','tttt','2023-08-05 15:44:36','2023-08-05 15:44:36'),(5,'Which are numbers?','Multiple','1~56','a~b~1~56','Easy','Math','tttt','2023-08-05 15:45:58','2023-08-05 15:45:58'),(6,'30 * 10 = 100 ?','True/False','Wrong','Right~Wrong','Easy','Math','qqq','2023-08-05 15:46:52','2023-08-05 15:46:52'),(7,'Which can be divided by 10?','Multiple','50~20~30','50~33~20~30','Easy','Math','aaaa','2023-08-05 15:47:44','2023-08-05 15:47:44'),(8,'3 is an even number','True/False','Wrong','Right~Wrong','Easy','Math','ccc','2023-08-05 15:48:21','2023-08-05 15:48:21'),(9,'60 / 20 = ?','Single','3','30~3~300~3000','Easy','Math','pppp','2023-08-05 16:04:10','2023-08-05 16:04:10'),(10,'1000 - 500 = ?','Single','500','500~300~200~1000','Easy','Math','mmm','2023-08-05 16:04:40','2023-08-05 16:04:40'),(11,'30 * 30 = ?','Single','900','10~900~300~100','Easy','Math','rrr','2023-08-05 16:05:21','2023-08-05 16:05:21'),(12,'60 * 30 = ?','Single','1800','10~543~300~1800','Easy','Math','uuu','2023-08-05 16:06:12','2023-08-05 16:06:12'),(13,'50 * 10 = ?','Single','500','500~543~76~876','Medium','Math','bbb','2023-08-05 16:06:49','2023-08-05 16:06:49'),(14,'What is the force that keeps objects in orbit around the Earth?','Single','Friction','Friction~Gravity','Easy','Physics','na','2024-02-17 10:11:27','2024-02-17 10:11:27'),(15,'What is the unit of electrical resistance?','Single','Watt','Ohm~Watt','Easy','Physics','na','2024-02-17 14:30:22','2024-02-17 14:30:22'),(16,'What is the speed of light in a vacuum?','Single','3 x 10^8 meters per second','3 x 10^8 meters per second~3 x 10^6 meters per second','Easy','Physics','na','2024-02-17 14:31:36','2024-02-17 14:31:36'),(17,'What type of energy is possessed by a moving object?','Single','Kinetic Energy','Potential Energy~Kinetic Energy','Easy','Physics','na\n','2024-02-17 14:32:09','2024-02-17 14:32:09'),(18,'What device is used to measure temperature?','Single','Thermometer','Barometer~Thermometer','Easy','Physics','na','2024-02-17 14:32:32','2024-02-17 14:32:32'),(19,'What is the formula for density?','Single','Mass/Volume','Mass/Volume~Mass X Volume','Easy','Physics','na','2024-02-17 14:33:04','2024-02-17 14:33:04'),(20,'What is the acceleration due to gravity on Earth\'s surface?','Single','9.8 m/s^2','9.8 m/s^2~9.8 km/h^2','Easy','Physics','na','2024-02-17 14:33:32','2024-02-17 14:33:32'),(21,'What is the primary source of Earth\'s energy?','Single','The Sun','The Moon~The Sun','Easy','Physics','na','2024-02-17 14:34:06','2024-02-17 14:34:06'),(22,'What do we call the bending of light as it passes from one medium to another?','Single','Refraction','Reflection~Refraction','Easy','Physics','na','2024-02-17 14:34:25','2024-02-17 14:34:25'),(23,'What particle is found in the nucleus of an atom along with neutrons?','Single','Proton','Electron~Proton','Easy','Physics','na','2024-02-17 14:34:44','2024-02-17 14:34:44'),(24,'What principle explains why planes fly?','Single','Bernoulli\'s Principle','Pascal\'s Principle~Bernoulli\'s Principle','Medium','Physics','na','2024-02-17 14:35:28','2024-02-17 14:35:28'),(25,'What phenomenon causes the Northern and Southern Lights?','Single','Solar Winds','Solar Winds~Lunar Eclipse','Medium','Physics','na','2024-02-17 14:35:47','2024-02-17 14:35:47'),(26,'What is the name for a material that allows electricity to flow through it easily?','Single','Conductor','Insulator~Conductor','Medium','Physics','na','2024-02-17 14:36:26','2024-02-17 14:36:26'),(27,'What is the principle behind the working of a hydraulic lift?','Single','Pascal\'s Law','Pascal\'s Law~Archimedes\' Principle','Medium','Physics','na','2024-02-17 14:36:58','2024-02-17 14:36:58'),(28,'What is the term for the number of protons in an atom\'s nucleus?','Single','Atomic Number','Atomic Number~Mass Number','Medium','Physics','na','2024-02-17 14:37:29','2024-02-17 14:37:29'),(29,'What phenomenon describes the change in frequency or wavelength of a wave in relation to an observer who is moving relative to the wave source?','Single','Doppler Effect','Doppler Effect~Photoelectric Effect','Medium','Physics','na','2024-02-17 14:38:23','2024-02-17 14:38:23'),(30,'What is the unit of measure for the intensity of sound?','Single','Decibel','Decibel~Hertz','Medium','Physics','na','2024-02-17 14:39:00','2024-02-17 14:39:00');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `rightNum` int DEFAULT NULL,
  `wrongNum` int DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES (1,'2',3,7,'16','True/False~Single~Multiple','Math','Easy','2023-08-05 17:29:19','2023-08-05 17:29:19'),(2,'2',0,10,'16','True/False~Single~Multiple','Math','Easy','2023-08-05 17:30:11','2023-08-05 17:30:11'),(3,'3',10,2,'30','True/False~Single~Multiple','Math','Easy','2023-08-05 17:31:08','2023-08-05 17:31:08'),(4,'4',8,2,'34','True/False~Single~Multiple','Math','Easy','2023-08-05 17:32:07','2023-08-05 17:32:07'),(5,'4',0,10,'160','True/False~Single~Multiple','Math','Easy','2023-08-05 17:50:02','2023-08-05 17:50:02'),(6,'4',0,10,'310','True/False~Single~Multiple','Math','Easy','2023-08-05 18:06:20','2023-08-05 18:06:20'),(7,'4',0,10,'156','True/False~Single~Multiple','Math','Easy','2023-08-06 09:19:15','2023-08-06 09:19:15'),(8,'4',0,10,'1691285370','True/False~Single~Multiple','Math','Easy','2023-08-06 09:29:30','2023-08-06 09:29:30'),(9,'4',0,10,'157','True/False~Single~Multiple','Math','Easy','2023-08-06 09:33:32','2023-08-06 09:33:32'),(10,'4',0,10,'156','True/False~Single~Multiple','Math','Easy','2023-08-06 09:37:08','2023-08-06 09:37:08'),(11,'4',0,10,'1691285913','True/False~Single~Multiple','Math','Easy','2023-08-06 09:38:33','2023-08-06 09:38:33'),(12,'2',2,8,'26','True/False~Single~Multiple','Math','Easy','2023-08-07 18:10:31','2023-08-07 18:10:31'),(13,'2',1,9,'24','True/False~Single~Multiple','Math','Easy','2024-01-31 17:36:58','2024-01-31 17:36:58'),(14,'5',9,1,'47','True/False~Single~Multiple','Math','Easy','2024-02-17 09:53:51','2024-02-17 09:53:51'),(15,'5',7,3,'30','True/False~Single~Multiple','Math','Easy','2024-02-17 12:57:53','2024-02-17 12:57:53'),(16,'5',7,3,'1708192712','True/False~Single~Multiple','Math','Easy','2024-02-17 12:58:32','2024-02-17 12:58:32'),(17,'5',7,3,'1706484525','True/False~Single~Multiple','Math','Easy','2024-02-17 12:58:38','2024-02-17 12:58:38'),(18,'5',6,4,'24','True/False~Single~Multiple','Math','Easy','2024-02-17 12:59:27','2024-02-17 12:59:27'),(19,'5',6,4,'1708192799','True/False~Single~Multiple','Math','Easy','2024-02-17 12:59:59','2024-02-17 12:59:59'),(20,'5',6,4,'1706484741','True/False~Single~Multiple','Math','Easy','2024-02-17 13:02:13','2024-02-17 13:02:13'),(21,'5',7,3,'30','True/False~Single~Multiple','Math','Easy','2024-02-17 13:02:59','2024-02-17 13:02:59'),(22,'5',7,3,'1708192993','True/False~Single~Multiple','Math','Easy','2024-02-17 13:03:13','2024-02-17 13:03:13'),(23,'5',7,3,'1706484818','True/False~Single~Multiple','Math','Easy','2024-02-17 13:03:31','2024-02-17 13:03:31'),(24,'5',7,3,'1706486772','True/False~Single~Multiple','Math','Easy','2024-02-17 13:07:36','2024-02-17 13:07:36'),(25,'5',7,3,'1706486797','True/False~Single~Multiple','Math','Easy','2024-02-17 13:08:03','2024-02-17 13:08:03'),(26,'5',7,3,'1706486812','True/False~Single~Multiple','Math','Easy','2024-02-17 13:08:18','2024-02-17 13:08:18'),(27,'5',7,3,'1706486951','True/False~Single~Multiple','Math','Easy','2024-02-17 13:10:37','2024-02-17 13:10:37'),(28,'5',7,3,'1706487118','True/False~Single~Multiple','Math','Easy','2024-02-17 13:13:25','2024-02-17 13:13:25'),(29,'5',7,3,'1706487156','True/False~Single~Multiple','Math','Easy','2024-02-17 13:14:03','2024-02-17 13:14:03'),(30,'5',1,3,'190','True/False~Single~Multiple','Math','Easy','2024-02-17 13:18:19','2024-02-17 13:18:19'),(31,'5',10,0,'38','True/False~Single~Multiple','Math','Easy','2024-02-17 13:19:33','2024-02-17 13:19:33'),(32,'5',10,0,'1708194106','True/False~Single~Multiple','Math','Easy','2024-02-17 13:21:46','2024-02-17 13:21:46'),(33,'5',10,0,'1706486858','True/False~Single~Multiple','Math','Easy','2024-02-17 13:37:32','2024-02-17 13:37:32'),(34,'5',10,0,'1706488673','True/False~Single~Multiple','Math','Easy','2024-02-17 13:39:20','2024-02-17 13:39:20'),(35,'5',10,0,'1706488808','True/False~Single~Multiple','Math','Easy','2024-02-17 13:41:37','2024-02-17 13:41:37'),(36,'5',10,0,'1706488857','True/False~Single~Multiple','Math','Easy','2024-02-17 13:42:26','2024-02-17 13:42:26'),(37,'5',10,0,'1706488874','True/False~Single~Multiple','Math','Easy','2024-02-17 13:42:43','2024-02-17 13:42:43'),(38,'5',10,0,'1706488889','True/False~Single~Multiple','Math','Easy','2024-02-17 13:42:58','2024-02-17 13:42:58'),(39,'5',10,0,'1706488895','True/False~Single~Multiple','Math','Easy','2024-02-17 13:43:04','2024-02-17 13:43:04'),(40,'5',9,1,'27','Single','Physics','Easy','2024-02-17 14:58:32','2024-02-17 14:58:32'),(41,'5',9,1,'1708199962','Single','Physics','Easy','2024-02-17 14:59:22','2024-02-17 14:59:22'),(42,'5',9,1,'28','Single','Physics','Easy','2024-02-17 15:00:04','2024-02-17 15:00:04');
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `headpic` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'aaa','a@qq.com','123','/pic9.png','2023-08-03 19:04:42','2023-08-03 19:04:42'),(3,'bbb','b@qq.com','123','/pic3.png','2023-08-05 17:30:28','2023-08-05 17:30:28'),(4,'ccc','c@qq.com','123','/pic2.png','2023-08-05 17:31:24','2023-08-05 17:31:24'),(5,'Becca Tom','rebeccatom8@gmail.com','lance12','/pic9.png','2024-02-17 09:48:39','2024-02-17 09:48:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-17 15:23:15
