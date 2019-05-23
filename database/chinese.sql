/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 106.14.145.218:3306
 Source Schema         : chinese

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 23/05/2019 21:14:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `author` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ctime` varchar(16) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` text COLLATE utf8mb4_bin NOT NULL,
  `href` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `insert_time` date DEFAULT NULL,
  `thumbnail_urls` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `summary` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for pub_wechat_user
-- ----------------------------
DROP TABLE IF EXISTS `pub_wechat_user`;
CREATE TABLE `pub_wechat_user` (
  `wechat_user_code` int(11) NOT NULL AUTO_INCREMENT COMMENT '微信用户编码',
  `open_id` varchar(255) NOT NULL COMMENT '微信账号',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `idcard` varchar(255) DEFAULT NULL COMMENT '身份证',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `ctime` datetime NOT NULL COMMENT '创建时间',
  `mtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `invalid` char(1) NOT NULL DEFAULT 'N' COMMENT '是否无效 N 有效 Y 无效',
  PRIMARY KEY (`wechat_user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='微信用户表';

SET FOREIGN_KEY_CHECKS = 1;
