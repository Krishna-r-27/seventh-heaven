-- Create Users table for authentication
CREATE TABLE IF NOT EXISTS `Users` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(255) NOT NULL,
  `PasswordHash` VARCHAR(255) NOT NULL,
  `Role` VARCHAR(50) NOT NULL,
  `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`UserId`),
  UNIQUE KEY `UX_Users_Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Example insert (hash password using BCrypt in your app):
-- INSERT INTO Users (Email, PasswordHash, Role) VALUES ('admin@seventh.com', '$2a$12$...hashed...', 'Admin');
