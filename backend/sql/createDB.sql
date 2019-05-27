CREATE TABLE `friends` (
  `idfriends` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_friend` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idfriends`),
  KEY `userKey_idx` (`id_user`),
  KEY `friendKey_idx` (`id_friend`),
  CONSTRAINT `friendKey` FOREIGN KEY (`id_friend`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userKey` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `invited_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned DEFAULT NULL,
  `id_meeting` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invite_user_fk_idx` (`id_user`),
  KEY `invite_meeting_fk_idx` (`id_meeting`),
  CONSTRAINT `invite_meeting_fk` FOREIGN KEY (`id_meeting`) REFERENCES `meetings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invite_user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
)

CREATE TABLE `meetings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `owner` int(10) unsigned DEFAULT NULL,
  `start` timestamp NOT NULL,
  `end` timestamp NOT NULL,
  `room` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmeetings_UNIQUE` (`id`),
  KEY `room_meeting_idx` (`room`),
  KEY `owner_key_idx` (`owner`),
  CONSTRAINT `owner_key` FOREIGN KEY (`owner`) REFERENCES `users` (`id`),
  CONSTRAINT `room_meeting` FOREIGN KEY (`room`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `messages` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sender` int(10) unsigned NOT NULL,
  `receiver` int(10) unsigned NOT NULL,
  `meeting` int(10) unsigned DEFAULT NULL,
  `target` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `senderKey_idx` (`sender`),
  KEY `receiverKey_idx` (`receiver`),
  KEY `meetingKey_idx` (`meeting`),
  CONSTRAINT `meetingKey` FOREIGN KEY (`meeting`) REFERENCES `meetings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receiverKey` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `senderKey` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `no_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_meeting` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nomember_usfk_idx` (`id_user`),
  KEY `nomember_mtfk_idx` (`id_meeting`),
  CONSTRAINT `nomember_mtfk` FOREIGN KEY (`id_meeting`) REFERENCES `meetings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nomember_usfk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
)

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) COLLATE utf8_bin NOT NULL,
  `alarm_time` timestamp NOT NULL,
  `delay` int(11) DEFAULT NULL,
  `owner` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_fk_idx` (`owner`),
  CONSTRAINT `notif_fk` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `potential_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned DEFAULT NULL,
  `id_meeting` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_fk_idx` (`id_user`),
  KEY `meeting_fk_idx` (`id_meeting`),
  CONSTRAINT `meeting_fk` FOREIGN KEY (`id_meeting`) REFERENCES `meetings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
)

CREATE TABLE `rooms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idrooms_UNIQUE` (`id`)
)

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsers_UNIQUE` (`id`),
  UNIQUE KEY `userLogin_UNIQUE` (`login`),
  UNIQUE KEY `email_UNIQUE` (`email`)
)

CREATE TABLE `users_meetings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_meeting` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `_idx` (`id_user`),
  KEY `foreignMeetings_idx` (`id_meeting`),
  CONSTRAINT `foreignMeetings` FOREIGN KEY (`id_meeting`) REFERENCES `meetings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foreignUsers` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
)