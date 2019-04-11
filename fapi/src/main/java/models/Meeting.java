package models;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class Meeting {

    private long id;
    private String title;
    private Date start;
    private Date end;
    private User owner;
    private Room room;
    private List<User> members = new ArrayList<>();
}
