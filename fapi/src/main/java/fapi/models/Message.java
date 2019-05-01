package fapi.models;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Message {

    private Long idMessage;

    @NotNull
    private User sender;

    @NotNull
    private User receiver;

    private Meeting meeting;

    @NotNull
    private String target;
}
