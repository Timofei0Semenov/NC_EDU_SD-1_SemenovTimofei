package fapi.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class Notification {

    private long idNotification;

    @NotNull
    @Size(min = 4, max = 30, message = "Text must be more 4 and less 30 symbols")
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @NotNull
    @FutureOrPresent
    private Date alarmTime;

    @NotBlank
    private Long delay;

    @NotNull
    private User alarmOwner;
}

