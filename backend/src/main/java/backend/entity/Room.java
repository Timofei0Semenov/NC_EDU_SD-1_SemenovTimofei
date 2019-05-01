package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms", schema = "backend")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long idRoom;

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

    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY )
    private List<Meeting> meetings = new ArrayList<>();
}
