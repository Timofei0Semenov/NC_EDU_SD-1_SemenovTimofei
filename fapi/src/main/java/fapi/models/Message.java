package fapi.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@JsonIdentityInfo(scope = Message.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "idMessage")
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
