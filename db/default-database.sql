-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 144.24.193.208    Database: s4_openfi
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.22-MariaDB-0ubuntu0.22.04.1

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
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `mac` char(17) NOT NULL COMMENT 'MAC have to be stored without separations, like\r\n0AB1D3',
  `model` varchar(100) DEFAULT NULL,
  `nick` varchar(100) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`mac`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='device credentials and data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `device` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `risk` varchar(20) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `comments` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='openfi logging';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,'Status','OpenFi System','26-01-2026 21:15','Info','Defult test log, OpenFi ready','testiculo'),(33,'Status','OpenFi System','2026-01-27 20:50:14','Warn','Bienvenido a los logs OpenFi','');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `networks`
--

DROP TABLE IF EXISTS `networks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `networks` (
  `name` varchar(100) DEFAULT NULL,
  `subnet` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='network subnet list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `networks`
--

LOCK TABLES `networks` WRITE;
/*!40000 ALTER TABLE `networks` DISABLE KEYS */;
/*!40000 ALTER TABLE `networks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdata` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `theme` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='user preferences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES ('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','coolmail@gmail.com','spanish','dark');
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wifi`
--

DROP TABLE IF EXISTS `wifi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wifi` (
  `ssid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='wifi networks list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wifi`
--

LOCK TABLES `wifi` WRITE;
/*!40000 ALTER TABLE `wifi` DISABLE KEYS */;
/*!40000 ALTER TABLE `wifi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 's4_openfi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 22:03:20
