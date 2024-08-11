/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

CREATE TABLE IF NOT EXISTS `nss_quest_status`
(
    `id`           INT UNSIGNED                NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifier of quest status item',
    `char_id`      INT UNSIGNED                NOT NULL COMMENT 'Identifier of character',
    `quest_id`     VARCHAR(255)                NOT NULL COMMENT 'Identifier of quest',
    `solved_times` INT UNSIGNED                NOT NULL DEFAULT 0 COMMENT 'Number of times the quest has been solved',
    `status`       ENUM ('started','finished') NOT NULL DEFAULT 'started' COMMENT 'Status of quest',
    UNIQUE (`char_id`, `quest_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `nss_quest_step_log`
(
    `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifier of quest progress log item',
    `quest_status_id` INT UNSIGNED NOT NULL COMMENT 'Identifier of quest status item',
    `step_id`         VARCHAR(255) NOT NULL COMMENT 'Identifier of quest step',
    `started_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of when step was started (or if last step, completed)',
    FOREIGN KEY (`quest_status_id`)
        REFERENCES `nss_quest_status` (`id`)
        ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

/*!40101 SET SQL_MODE = IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS = IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES = IFNULL(@OLD_SQL_NOTES, 1) */;
