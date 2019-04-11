package models;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class User {

    private long id;
    private String firstName;
    private String lastName;
    private String login;
    private String password;
    private String role;
    private String email;
    private List<Meeting> meetings = new ArrayList<>();
    private List<Meeting> meetingsCreatedMe = new ArrayList<>();

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
