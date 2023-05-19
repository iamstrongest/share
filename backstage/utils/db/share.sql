-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: share
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `collect`
--

DROP TABLE IF EXISTS `collect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collect` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '收藏id',
  `equ_id` int DEFAULT NULL COMMENT '器材id',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收藏';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collect`
--

LOCK TABLES `collect` WRITE;
/*!40000 ALTER TABLE `collect` DISABLE KEYS */;
INSERT INTO `collect` VALUES (21,3,0),(22,13,0),(27,5,0),(28,11,0),(32,14,0);
/*!40000 ALTER TABLE `collect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `restNum` int DEFAULT '20',
  `description` varchar(200) DEFAULT '暂无介绍',
  `price` float DEFAULT NULL,
  `type` varchar(200) DEFAULT NULL,
  `imageUrl` varchar(200) DEFAULT NULL COMMENT '图片',
  `unit` varchar(45) DEFAULT '1h/1小时' COMMENT '计费方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='体育器材';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (0,'羽毛球',20,'双人游戏',1,'球类','https://tse2-mm.cn.bing.net/th/id/OIP-C.KENQAkdF5rAXXZ1B2FtDuwHaDF?w=294&h=145&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(1,'篮球',5,'多人游戏',1.5,'球类','https://tse2-mm.cn.bing.net/th/id/OIP-C.KMkjS1W8ECjSKIHxRFXx_gHaHe?w=187&h=189&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(2,'足球',10,'多人游戏',2,'球类','https://tse3-mm.cn.bing.net/th/id/OIP-C.u-PFAbzmdQdGHJ--3gz79gHaG1?w=204&h=188&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(3,'象棋',5,'双人智力游戏',0.5,'娱乐','https://tse1-mm.cn.bing.net/th/id/OIP-C.fk0X4prWqVnEY-5CtnI71AHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(4,'健身器',3,'健身',2,'健身器材','https://tse4-mm.cn.bing.net/th/id/OIP-C.KJ3ei9nM-vgCmlqUPkgN6AHaHa?w=192&h=191&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(5,'跳绳',20,'一起跳一跳',0.5,'其它','https://tse3-mm.cn.bing.net/th/id/OIP-C.nsdyUUUXnuuGqKbeTFsINwHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(10,'乒乓球',10,'适合双人一起玩的球',1,'球类','https://tse2-mm.cn.bing.net/th/id/OIP-C.mR6Oyy_Er6oZw1kUMZioxgHaE8?w=284&h=189&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(11,'排球',8,'团队游戏',2,'球类','https://tse2-mm.cn.bing.net/th/id/OIP-C.Rxj4AWaVaca8M0Ua8WRkYwHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(12,'围棋',6,'双人斗智斗勇，传参中华文化',0.5,'娱乐','https://tse4-mm.cn.bing.net/th/id/OIP-C.qsLphkNpH9CwsLVX9rQTHwHaEk?w=283&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(13,'国际象棋',5,'双人斗智斗勇，接收世界棋局',0.5,'娱乐','https://tse2-mm.cn.bing.net/th/id/OIP-C.EEmmCabuZz4qUXsaQsm6DAHaE8?w=286&h=191&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(14,'收腹机',3,'单人健身腹部',2,'健身器材','https://tse1-mm.cn.bing.net/th/id/OIP-C.1dxv7JnK5nVVbQHv2XRcGQD6D6?w=171&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时'),(15,'哑铃',6,'对手部肌肉能起到健身作用',1.5,'健身器材','https://tse2-mm.cn.bing.net/th/id/OIP-C.jtyQDmRik4xPhcY7yPObXAHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.25&pid=1.7','1h/1小时');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_thumbs`
--

DROP TABLE IF EXISTS `follow_thumbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_thumbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT '点赞者的id',
  `follow_id` int DEFAULT NULL COMMENT '点赞列的id',
  `been_given_id` int DEFAULT NULL COMMENT '被赞者的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='回复者';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_thumbs`
--

LOCK TABLES `follow_thumbs` WRITE;
/*!40000 ALTER TABLE `follow_thumbs` DISABLE KEYS */;
INSERT INTO `follow_thumbs` VALUES (4,0,3,1),(7,0,13,2),(8,0,4,1),(9,0,11,0),(10,1,2,0),(11,0,1,2),(12,0,2,0),(14,0,22,0);
/*!40000 ALTER TABLE `follow_thumbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `land_thumbs`
--

DROP TABLE IF EXISTS `land_thumbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `land_thumbs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `land_id` int DEFAULT NULL COMMENT '楼主id',
  `user_id` int DEFAULT NULL COMMENT '点赞者id',
  `been_given_id` int DEFAULT NULL COMMENT '被攒者的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='点赞表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `land_thumbs`
--

LOCK TABLES `land_thumbs` WRITE;
/*!40000 ALTER TABLE `land_thumbs` DISABLE KEYS */;
INSERT INTO `land_thumbs` VALUES (7,0,0,0),(10,3,0,2),(11,16,0,0),(12,0,1,0),(14,4,0,0),(15,1,0,1),(18,2,0,0),(19,23,0,0);
/*!40000 ALTER TABLE `land_thumbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landlord`
--

DROP TABLE IF EXISTS `landlord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `landlord` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `goodNum` int DEFAULT '0',
  `time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='楼主的发帖';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landlord`
--

LOCK TABLES `landlord` WRITE;
/*!40000 ALTER TABLE `landlord` DISABLE KEYS */;
INSERT INTO `landlord` VALUES (0,0,'最爱运动了，来人打羽毛球',0,1669793985880),(1,1,'有没有小哥哥来跳绳',0,1669793916880),(2,0,'不打羽毛球，足球也可以，一起来踢球吧',0,1669793906880),(3,2,'楚界，杀啊，下象棋吧',0,1669793982880),(4,0,'你好呀晚上一起来打球吗',0,1669822512082),(5,1,'emoemoji',0,1669822522082),(6,2,'噫吁嚱，不再打游戏，看看书，陶冶身心',0,1669822612082),(7,2,'想去健身了',0,1669822312082),(8,0,'不会有人不会下国际象棋吧',0,1669822502082),(9,1,'我是小笨蛋，不会下',0,1669822518082),(10,0,'呀呼，gogogo',0,1669822507082),(13,0,'一次小尝试',0,1670314904930),(14,0,'星期二下午，讲了职业生涯规划',0,1670317079030),(15,0,'干巴爹',0,1670317157252),(16,0,'想要淦饭了',0,1670317232934),(17,0,'晚上有人去跑步吗？',0,1670421151636),(18,0,'今晚52分钟，完成大部分测试',0,1670507588477),(19,0,'现在是晚上9:53，有人想要去跑步吗',0,1670507649020),(20,0,'来水一帖',0,1670508058984),(21,0,'今天12/12',0,1670805832270),(22,0,'15',0,1670805949087),(23,0,'今天回家啦',0,1671075169853);
/*!40000 ALTER TABLE `landlord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` bigint DEFAULT NULL,
  `payName` varchar(200) DEFAULT NULL COMMENT '租借的而器材名字，器材之间，用-隔开。',
  `user_id` int DEFAULT NULL,
  `nums` varchar(200) DEFAULT NULL COMMENT '数量集合列表',
  `payTime` bigint DEFAULT NULL COMMENT '创建订单，并且支付了前1个小时的金额，开始计算的时间',
  `returnTime` bigint DEFAULT NULL COMMENT '归还时间',
  `pay_status` int DEFAULT '0' COMMENT '0表示创建了订单，但是还没有支付。\n1表示支付了前1个小时的订单，并且还没有归还。\n2表示支付了完整的订单，即用户确认了归还。',
  `cost` float DEFAULT '0' COMMENT '总花费',
  `prices` varchar(200) DEFAULT NULL COMMENT '单价集合列表',
  `idList` varchar(200) DEFAULT NULL COMMENT '器材的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,15907909832,'羽毛球-篮球',0,'1-2',1669879411104,1669904110136,2,28,'1-1.5',NULL),(2,15907909832,'足球',0,'1',1669881594150,1670203274123,2,180,'2',NULL),(14,15907909832,'足球-篮球-乒乓球-排球',0,'1-1-1-1',1670416870901,1670416977600,2,6.5,'2-1.5-1-2',NULL),(20,15907909832,'篮球',0,'1',1670418646888,1670418651138,2,1.5,'1.5',NULL),(44,15907909832,'哑铃-围棋',0,'1-1',1670509556701,1670509603301,2,2,'1.5-0.5',NULL),(45,15907909832,'国际象棋',0,'1',1670510298124,1670510301504,2,0.5,'0.5',NULL),(46,15907909832,'国际象棋-围棋',0,'1-2',1670510472965,1670510477133,2,1.5,'0.5-0.5',NULL),(47,15907909832,'象棋-国际象棋-围棋-哑铃',0,'1-1-1-1',1670510749592,1670510756901,2,3,'0.5-0.5-0.5-1.5',NULL),(48,15907909832,'跳绳-排球',0,'1-1',1670567488929,1670567544836,2,2.5,'0.5-2',NULL),(49,15907909832,'象棋',0,'1',1670567578942,1670567843035,2,0.5,'0.5',NULL),(50,15907909832,'象棋',0,'1',1670567861285,1670568019700,2,0.5,'0.5',NULL),(51,15907909832,'象棋',0,'2',1670568030637,1670568064753,2,1,'0.5',NULL),(52,15907909832,'象棋',0,'3',1670568075312,1670568153525,2,1.5,'0.5',NULL),(54,15907909832,'国际象棋-象棋',0,'1-1',1670569138699,1670569458559,2,1,'0.5-0.5','13-3'),(55,15907909832,'国际象棋-跳绳',0,'1-1',1670569843637,1670569851263,2,1,'0.5-0.5','13-5'),(56,15907909832,'象棋-国际象棋',0,'2-2',1670569865223,1670569889637,2,2,'0.5-0.5','3-13'),(58,15907909832,'象棋',0,'1',1670570241155,1670570713803,2,0,'0.5','3'),(59,15907909832,'象棋',0,'1',1670570727271,1670570732751,2,0,'0.5','3'),(60,15907909832,'象棋-国际象棋-跳绳-排球',0,'1-1-1-1',1670572164789,1670572180191,2,3.5,'0.5-0.5-0.5-2','3-13-5-11'),(62,15907909832,'象棋-国际象棋',0,'1-1',1670805497791,1670805527787,2,1,'0.5-0.5','3-13'),(63,15907909832,'象棋',0,'1',1670801595902,1670805741324,2,0,'0.5','3'),(64,15907909832,'象棋-国际象棋',0,'1-1',1670805770292,1670805777946,2,1,'0.5-0.5','3-13'),(65,15907909832,'象棋-国际象棋',0,'1-1',1670805800652,1670807769706,2,1,'0.5-0.5','3-13'),(66,15907909832,'国际象棋',0,'1',1670701782009,1670807900767,2,0,'0.5','13'),(67,15907909832,'象棋',0,'2',1670607949815,1670807982530,2,0,'0.5','3'),(68,15907909832,'国际象棋-象棋',0,'1-1',1670781053668,1670808119345,2,8,'0.5-0.5','13-3'),(69,15907909832,'象棋-国际象棋',0,'1-1',1670768133747,1670808160950,2,12,'0.5-0.5','3-13'),(70,15907909832,'象棋-国际象棋',0,'1-1',1670758178294,1670808209121,2,14,'0.5-0.5','3-13'),(71,15907909832,'象棋-国际象棋-跳绳',0,'1-1-1',1670708245103,1670808283136,2,42,'0.5-0.5-0.5','3-13-5'),(72,15907909832,'象棋',0,'1',1670808412757,1670808416165,2,0,'0.5','3'),(73,15907909832,'跳绳-排球',0,'1-1',1670778428524,1670808472688,2,22.5,'0.5-2','5-11'),(74,15907909832,'国际象棋-跳绳',0,'1-1',1670708500923,1670808536194,2,14,'0.5-0.5','13-5'),(75,15907909832,'跳绳-国际象棋',0,'1-1',1670708549156,1670808621616,2,28,'0.5-0.5','5-13'),(76,15907909832,'象棋-国际象棋',0,'1-1',1671075226887,1671075234257,2,1,'0.5-0.5','3-13'),(77,15907909832,'国际象棋-跳绳',0,'1-1',1671075497230,1671075503291,2,1,'0.5-0.5','13-5'),(78,15907909832,'跳绳-排球',0,'1-1',1671075801447,1671075805028,2,2.5,'0.5-2','5-11'),(79,15907909832,'国际象棋',0,'1',1671076014268,1671076018257,2,0,'0.5','13'),(80,15907909832,'收腹机',0,'1',1671076278232,1671076285107,2,0,'2','14'),(81,15907909832,'收腹机-排球',0,'1-1',1671076632733,1671076637368,2,4,'2-2','14-11'),(82,15907909832,'国际象棋-跳绳',0,'1-1',1671076720987,1671076724322,2,1,'0.5-0.5','13-5');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor` int DEFAULT NULL,
  `publish_id` int DEFAULT NULL,
  `reply_id` int DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `goodNum` int DEFAULT '0',
  `time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='回复';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,0,2,0,'啥时候有空，一起约一约',0,1669794086880),(2,0,0,2,'现在就有空，你要一起来玩吗',0,1669794186880),(3,1,0,1,'小姐姐，等等我啊，去哪儿跳绳',0,1669794326880),(4,1,1,0,'操场，一起来跳绳',0,1669794016880),(5,2,1,2,'等我，我打完LOL就来',0,1669794186280),(6,2,2,1,'搞快点，花儿都要谢了',0,1669794486880),(7,4,2,0,'好的',0,1669822945530),(9,3,0,2,'好的',0,1670315218775),(10,5,0,1,'不要emoji',0,1670316316318),(11,2,0,2,'好的',0,1670325852237),(12,7,0,2,'小姐姐，带我一个',0,1670326576638),(13,0,3,2,'美女,一起打球',0,1670333144901),(14,14,0,0,'加油',0,1670421126614),(15,1,0,1,'不如篮球',0,1670507562784),(16,4,0,0,'明天一起约',0,1670508042561),(17,15,0,0,'',0,1670805836379),(18,21,0,0,'嗯，吃早餐了',0,1670805854928),(19,21,0,0,'喝了豆浆',0,1670805872377),(20,2,0,0,'好的',0,1670805937275),(21,23,0,0,'啥时候',0,1671075182043),(22,23,0,0,'晚上6:30的火车，回来再一起运动吧',0,1671075205391);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` bigint DEFAULT NULL,
  `username` varchar(45) DEFAULT '用户XXX',
  `description` varchar(45) DEFAULT '该用户太懒了，啥都没有留下' COMMENT '个人介绍',
  `money` int DEFAULT '1000',
  `mode` varchar(200) DEFAULT NULL COMMENT '第三方登录方式',
  `imageUrl` varchar(200) DEFAULT 'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png' COMMENT '头像，拥有默认头像',
  `credit` int DEFAULT '100',
  `password` varchar(45) DEFAULT '000000',
  `token` varchar(200) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,15907909832,'风微凉','七月半',91,NULL,'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png',100,'111110','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6MTU5MDc5MDk4MzIsImlhdCI6MTY3MTExNDI1NiwiZXhwIjoxNjcxOTc4MjU2fQ.pEXKf6tL7NEoMYDmbHer9X4Vc11ISaFi754arLjV9sQ','1309148358@qq.com'),(1,13117909832,'小明','看书打游戏运动',1000,NULL,'https://cn.bing.com/th/id/OIP-C.Bb5-9UnYNdi31mnkv6WUsAAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',100,'000000','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6MTMxMTc5MDk4MzIsImlhdCI6MTY3MDMzNjY1MywiZXhwIjoxNjcxMjAwNjUzfQ.gu7PIyJ7lpPWmLyMZRUfqRUVtArSGyCxmESzTTrgS_0',''),(2,15083966272,'小兰','上班运动睡觉觉',1000,NULL,'https://tse2-mm.cn.bing.net/th/id/OIP-C.gPv9oNqdl8USuFx16ydUpgAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',100,'000000',NULL,NULL),(3,13597990713,'沫沫','一起运动生过',800,NULL,'https://tse2-mm.cn.bing.net/th/id/OIP-C.WGMRZGPu5Ii2RSco4SNoKQAAAA?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',100,'000000',NULL,NULL),(4,15907909831,'用户XXX','该用户太懒了，啥都没有留下',0,NULL,'https://tse1-mm.cn.bing.net/th/id/OIP-C.0PXw4pj1uofc3j5VDrrKQwAAAA?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',100,'110110',NULL,NULL),(5,13117908780,'用户XXX','该用户太懒了，啥都没有留下',1000,NULL,'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png',100,'111111','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMTE3OTA4NzgwIiwiaWF0IjoxNjcwMzgwNzU4LCJleHAiOjE2NzEyNDQ3NTh9.RCSTbc-q5rruQG5Zq2B4TArHxna8mP7YTaP-oojUpro',NULL),(6,12345678901,'用户XXX','该用户太懒了，啥都没有留下',1000,NULL,'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png',100,'123123','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEyMzQ1Njc4OTAxIiwiaWF0IjoxNjcwODA2NDQ3LCJleHAiOjE2NzE2NzA0NDd9.V_Vl14Jo2r6mdlk3MJ8i85FYNUt87uOwWIfQPQaO2vY','2231806486@qq.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'share'
--

--
-- Dumping routines for database 'share'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-20 20:41:41
