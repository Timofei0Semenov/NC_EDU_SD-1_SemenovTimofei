package fapi.models;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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
    private List<Meeting> meetings = new ArrayList<>();
}
