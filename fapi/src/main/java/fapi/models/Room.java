package fapi.models;

import lombok.Data;

@Data
public class Room {

    private long id;
    private String name;
    private String city;
    private String street;
    private int house;
    private int building;
    private int flour;
    private int room;
}
