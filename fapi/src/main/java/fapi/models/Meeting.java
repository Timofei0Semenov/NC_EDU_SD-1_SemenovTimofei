package fapi.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@JsonIdentityInfo(scope = Meeting.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "idMeeting")
public class Meeting {

    private long idMeeting;

    @NotNull
    @Size(min = 4, max = 30, message = "Title must be more 4 and less 30 symbols")
    private String title;

    @NotNull
    @FutureOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date start;

    @NotNull
    @FutureOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date end;

    @NotNull
    private User owner;

    @NotNull
    private Room room;
}
