package backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
@Table(name = "notifications", schema = "backend")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long idNotification;

    @Basic
    @Column(name = "text")
    @NotNull
    @Size(min = 4, max = 30, message = "Text must be more 4 and less 30 symbols")
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Basic
    @NotNull
    @FutureOrPresent
    @Column(name = "alarm_time")
    private Date alarmTime;

    @Basic
    @NotNull
    @Column(name = "delay")
    private Long delay;

    @Basic
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "owner")
    private User alarmOwner;
}
