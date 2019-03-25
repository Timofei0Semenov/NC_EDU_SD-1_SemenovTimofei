package backend.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Data
@Table(name = "rooms", schema = "backend")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRoom")
    private int idRoom;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "city")
    private String city;

    @Basic
    @Column(name = "street")
    private String street;

    @Basic
    @Column(name = "house")
    private int house;

    @Basic
    @Column(name = "building")
    private int building;

    @Basic
    @Column(name = "flour")
    private int flour;

    @Basic
    @Column(name = "room")
    private int room;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private Collection<Meeting> meetings;
}
