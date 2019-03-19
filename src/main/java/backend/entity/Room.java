package backend.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Entity
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
}
