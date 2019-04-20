package fapi.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

@Data
@JsonIdentityInfo(scope = Room.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "idRoom")
public class Room {

    private long idRoom;
    private String name;
    private String city;
    private String street;
    private int house;
    private int building;
    private int flour;
    private int room;
}
