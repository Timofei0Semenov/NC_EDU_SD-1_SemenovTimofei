package fapi.models;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Room {

    private long idRoom;

    @NotNull
    private String name;

    @NotNull
    private String address;
}
