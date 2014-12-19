-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2012 年 09 月 28 日 10:15
-- 服务器版本: 5.5.12
-- PHP 版本: 5.4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `permission`
--

-- --------------------------------------------------------

--
-- 表的结构 `base_department`
--

CREATE TABLE IF NOT EXISTS `base_department` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `simpleCode` varchar(20) NOT NULL,
  `simpleName` varchar(20) NOT NULL,
  `fullName` varchar(64) DEFAULT NULL,
  `masterId` bigint(18) DEFAULT NULL,
  `parentId` bigint(18) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `orderNum` tinyint(4) NOT NULL,
  `deptState` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `base_department`
--

INSERT INTO `base_department` (`id`, `simpleCode`, `simpleName`, `fullName`, `masterId`, `parentId`, `phone`, `fax`, `orderNum`, `deptState`) VALUES
(1, 'dev_all', '研发总部', '研发总部', NULL, 0, '', '', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `base_dictionary`
--

CREATE TABLE IF NOT EXISTS `base_dictionary` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `parentId` bigint(18) NOT NULL,
  `orderNum` tinyint(4) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `base_dictionary`
--

INSERT INTO `base_dictionary` (`id`, `code`, `name`, `parentId`, `orderNum`, `status`) VALUES
(1, 'sys_level', '系统字典', 0, 1, 1),
(2, 'actions', '权限操作点', 1, 1, 1),
(3, 'ADD', '新增/添加', 2, 1, 1),
(4, 'EDIT', '修改', 2, 2, 1),
(5, 'VIEW', '查看', 2, 3, 1),
(6, 'DEL', '删除', 2, 4, 1),
(7, 'AUTH', '审核', 2, 5, 1);

-- --------------------------------------------------------

--
-- 表的结构 `base_module`
--

CREATE TABLE IF NOT EXISTS `base_module` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `stable` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(128) DEFAULT NULL,
  `actions` varchar(256) DEFAULT NULL,
  `parentId` bigint(18) NOT NULL,
  `orderNum` tinyint(4) NOT NULL,
  `isVisible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `base_module`
--

INSERT INTO `base_module` (`id`, `stable`, `name`, `url`, `actions`, `parentId`, `orderNum`, `isVisible`) VALUES
(1, 'sys', '系统管理', '', NULL, 0, 1, 1),
(2, 'sys_module', '功能菜单管理', 'jsp/base/permission/pmodule_manager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 1, 1),
(3, 'sys_dictionary', '字典管理', '/jsp/base/sys/dictionary_manager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 2, 1),
(4, 'sys_user', '用户管理', '/jsp/base/permission/puserManager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 3, 1),
(5, 'sys_department', '部门管理', '/jsp/base/sys/department_manager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 4, 1),
(6, 'sys_role', '角色管理', '/jsp/base/permission/role_manager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 5, 1),
(7, 'sys_role_action', '角色权限配置', '/jsp/base/permission/role_actions.jsp', 'EDIT', 1, 6, 1),
(8, 'sys_role_user', '角色用户配置', '/jsp/base/permission/role_user.jsp', 'ADD,DEL', 1, 7, 1),
(9, 'sys_region', '行政区域管理', '/jsp/base/sys/region_manager.jsp', 'ADD,DEL,EDIT,VIEW', 1, 8, 1);

-- --------------------------------------------------------

--
-- 表的结构 `base_region`
--

CREATE TABLE IF NOT EXISTS `base_region` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `code` varchar(24) NOT NULL,
  `name` varchar(32) NOT NULL,
  `parentCode` varchar(24) NOT NULL,
  `orderNum` tinyint(4) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `base_region`
--

INSERT INTO `base_region` (`id`, `code`, `name`, `parentCode`, `orderNum`, `status`) VALUES
(1, '100000000000000000000000', '地球', '0', 1, 1),
(2, '100001000000000000000000', '中国', '100000000000000000000000', 1, 1),
(3, '100001001000000000000000', '广东', '100001000000000000000000', 1, 1),
(4, '100002000000000000000000', '俄罗斯', '100000000000000000000000', 2, 1),
(5, '100001001001000000000000', '广州', '100001001000000000000000', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `base_role`
--

CREATE TABLE IF NOT EXISTS `base_role` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `parentId` bigint(18) NOT NULL,
  `roleName` varchar(64) NOT NULL DEFAULT '',
  `mark` varchar(256) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `base_role`
--

INSERT INTO `base_role` (`id`, `parentId`, `roleName`, `mark`) VALUES
(1, 0, '超级管理员', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `base_role_action`
--

CREATE TABLE IF NOT EXISTS `base_role_action` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `roleId` bigint(18) NOT NULL,
  `modStable` varchar(50) NOT NULL,
  `modActions` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `base_role_action`
--

INSERT INTO `base_role_action` (`id`, `roleId`, `modStable`, `modActions`) VALUES
(1, 1, 'sys', ''),
(2, 1, 'sys_module', 'ADD,EDIT,VIEW'),
(3, 1, 'sys_dictionary', 'ADD,EDIT,VIEW'),
(4, 1, 'sys_user', 'ADD,EDIT,VIEW'),
(5, 1, 'sys_department', 'ADD,EDIT,VIEW'),
(6, 1, 'sys_role', 'ADD,EDIT,VIEW'),
(8, 1, 'sys_role_user', 'ADD'),
(9, 1, 'sys_role_action', 'EDIT'),
(10, 1, 'sys_region', 'ADD,EDIT,VIEW');

-- --------------------------------------------------------

--
-- 表的结构 `base_role_user`
--

CREATE TABLE IF NOT EXISTS `base_role_user` (
  `urId` bigint(18) NOT NULL AUTO_INCREMENT,
  `userId` bigint(18) NOT NULL,
  `roleId` bigint(18) NOT NULL,
  PRIMARY KEY (`urId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `base_role_user`
--

INSERT INTO `base_role_user` (`urId`, `userId`, `roleId`) VALUES
(2, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `base_user`
--

CREATE TABLE IF NOT EXISTS `base_user` (
  `id` bigint(18) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `userName` varchar(64) NOT NULL DEFAULT '',
  `secondPassword` varchar(64) NOT NULL DEFAULT '',
  `idCard` varchar(20) NOT NULL DEFAULT '',
  `workCard` varchar(20) NOT NULL DEFAULT '',
  `deptId` bigint(18) NOT NULL DEFAULT '0',
  `gender` tinyint(1) NOT NULL DEFAULT '0',
  `birthday` varchar(20) NOT NULL DEFAULT '',
  `uType` varchar(10) NOT NULL DEFAULT '',
  `adminArea` varchar(24) NOT NULL DEFAULT '',
  `adminObject` varchar(64) NOT NULL DEFAULT '',
  `createDate` varchar(64) NOT NULL DEFAULT '',
  `outDate` varchar(64) NOT NULL DEFAULT '',
  `uState` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `base_user`
--

INSERT INTO `base_user` (`id`, `account`, `password`, `userName`, `secondPassword`, `idCard`, `workCard`, `deptId`, `gender`, `birthday`, `uType`, `adminArea`, `adminObject`, `createDate`, `outDate`, `uState`) VALUES
(1, 'test', '202cb962ac59075b964b07152d234b70', 'TEST', '0', '0000', '0000', 1, 1, '2012-05-22', '1', '100000000000000000000000', '1', '2012-05-22', '', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
