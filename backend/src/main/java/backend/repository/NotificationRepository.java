package backend.repository;

import backend.entity.Notification;
import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("select notif from Notification notif inner join User u on notif.alarmOwner = u.idUser where notif.alarmOwner = :userSearch")
    List<Notification> findAllByAlarmOwner(@Param("userSearch") User userSearch);
    void deleteByAlarmTimeBefore(Date date);
}
