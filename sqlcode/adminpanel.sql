-- SQL tables

-- Create table for admin panel
CREATE TABLE `store`.`adminpanel_users` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `fname` VARCHAR(50) NOT NULL , 
    `sname` VARCHAR(50) NOT NULL , 
    `email` VARCHAR(100) NOT NULL , 
    `phone` VARCHAR(100) NOT NULL , 
    `login` VARCHAR(40) NOT NULL , 
    `password` VARCHAR(255) NOT NULL , 
    `permission` TINYINT NOT NULL DEFAULT '0' , 
    `photo` TEXT NOT NULL , PRIMARY KEY (`id`)) 
    ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci COMMENT = 'Table for admin pannel';

