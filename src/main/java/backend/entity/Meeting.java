package backend.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "meetings", schema = "backend")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMeeting")
    private int idMeeting;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "beginMeeting")
    private Date beginMeeting;

    @Basic
    @Column(name = "endMeeting")
    private Date endMeeting;

    @Basic
    @Column(name = "owner")
    private int owner;

    @Basic
    @Column(name = "room")
    private int room;
}
