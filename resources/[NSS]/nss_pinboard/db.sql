/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

CREATE TABLE IF NOT EXISTS `nss_pinboard_posters`
(
    `id`                   INT UNSIGNED          NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifier of pinboard poster',
    `type`                 ENUM ('text','image') NOT NULL DEFAULT 'text' COMMENT 'Type of pinboard poster',
    `content_json`         TEXT                           DEFAULT NULL COMMENT 'JSON of text (including config for each section) or image to display on poster.',
    `location`             VARCHAR(255)                   DEFAULT '' COMMENT 'Named location of pinboard poster',
    `creator_vorp_char_id` INT UNSIGNED                   DEFAULT 0 COMMENT 'VORP Character ID of creator of pinboard poster',
    `created_at`           TIMESTAMP             NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of when pinboard poster was created'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

/*!40101 SET SQL_MODE = IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS = IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES = IFNULL(@OLD_SQL_NOTES, 1) */;
