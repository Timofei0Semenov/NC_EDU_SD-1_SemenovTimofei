CREATE TABLE `meetings` (
  `idMeeting` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `owner` int(11) NOT NULL,
  `beginMeeting` timestamp NOT NULL,
  `endMeeting` timestamp NOT NULL,
  `room` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idMeeting`),
  UNIQUE KEY `idmeetings_UNIQUE` (`idMeeting`),
  KEY `room_meeting_idx` (`room`),
  CONSTRAINT `room_meeting` FOREIGN KEY (`room`) REFERENCES `rooms` (`idRoom`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `rooms` (
  `idRoom` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `house` int(10) unsigned DEFAULT NULL,
  `building` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `room` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRoom`),
  UNIQUE KEY `idrooms_UNIQUE` (`idRoom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `users` (
  `idUser` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUsers_UNIQUE` (`idUser`),
  UNIQUE KEY `userLogin_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8

CREATE TABLE `users-meetings` (
  `idUser` int(10) unsigned NOT NULL,
  `idMeeting` int(10) unsigned NOT NULL,
  KEY `_idx` (`idUser`),
  KEY `foreignMeetings_idx` (`idMeeting`),
  CONSTRAINT `foreignMeetings` FOREIGN KEY (`idMeeting`) REFERENCES `meetings` (`idMeeting`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foreignUsers` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8