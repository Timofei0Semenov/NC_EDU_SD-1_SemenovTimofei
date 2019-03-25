package backend.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Data
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

    @ManyToOne(optional = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "owner")
    private User owner;

    @ManyToOne(optional = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "room")
    private Room room;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "meetings")
    private Collection<User> members;
}
