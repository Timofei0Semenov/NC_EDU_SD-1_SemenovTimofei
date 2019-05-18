package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @NotNull
    @Column(name = "name")
    private String name;

    @Basic
    @NotNull
    @Column(name = "address")
    private String address;

    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY )
    private List<Meeting> meetings = new ArrayList<>();
}
