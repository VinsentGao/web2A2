-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fun Run','Charity running and fitness events'),(2,'Gala Dinner','Formal charity dinner events'),(3,'Silent Auction','Charity auction events'),(4,'Concert','Charity music concerts'),(5,'Workshop','Educational charity workshops');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `full_description` text DEFAULT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `venue_details` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT NULL,
  `fundraising_goal` decimal(15,2) DEFAULT NULL,
  `current_progress` decimal(15,2) DEFAULT 0.00,
  `is_active` tinyint(1) DEFAULT 1,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Sydney Charity Marathon','Annual marathon for children\'s medical fund','Join our annual charity marathon to raise crucial funds for children\'s hospitals. Includes 5km fun run, 10km challenge, and half marathon.','2025-10-15','07:00:00','Sydney','Start and finish at Sydney Domain Park',1,1,50.00,50000.00,32500.00,1,NULL,'2025-10-04 03:15:13'),(2,'Starlight Charity Gala','Elegant charity fundraising dinner','A formal dinner event at a luxury hotel featuring three-course meal, live music, and celebrity guest speakers.','2025-09-20','18:30:00','Sydney','Grand Ballroom, Hilton Hotel',2,1,150.00,30000.00,18500.00,1,NULL,'2025-10-04 03:15:13'),(3,'Eco Art Auction','Silent auction supporting environmental art','Silent auction featuring works by local artists with environmental themes. Proceeds fund art education programs.','2025-11-05','17:00:00','Melbourne','Gallery 2, Melbourne Art Centre',3,2,25.00,20000.00,8500.00,1,NULL,'2025-10-04 03:15:13'),(4,'Hope Charity Concert','Local musicians fundraising for mental health','Enjoy an evening of music while supporting mental health awareness. Features pop, rock, and classical performances.','2025-10-28','19:00:00','Melbourne','Elisabeth Murdoch Hall',4,2,40.00,15000.00,9200.00,1,NULL,'2025-10-04 03:15:13'),(5,'Kids Coding Workshop','Free programming for underprivileged children','Volunteer-led basic programming workshop providing tech education opportunities.','2025-09-30','10:00:00','Sydney','Computer Lab, Tech Library',5,1,0.00,5000.00,3200.00,1,NULL,'2025-10-04 03:15:13');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mission_statement` text DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'Heart Charity Foundation','Helping underprivileged children and families create a better future','contact@heartcharity.org','+61 2 1234 5678','Sydney, NSW 2000'),(2,'Green Action Organization','Protecting the environment for a sustainable future','info@greenaction.org','+61 3 9876 5432','Melbourne, VIC 3000');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04 11:26:39
