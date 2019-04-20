package fapi.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@JsonIdentityInfo(scope = User.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "idUser")
public class User {

    private long idUser;

    @NotNull
    @Size(min = 3, max = 30, message = "FirstName must be more 3 and less 30 symbols")
    private String firstName;

    @NotNull
    @Size(min = 2, max = 40, message = "LastName must be more 2 and less 40 symbols")
    private String lastName;

    @NotNull
    @Size(min = 4, max = 20, message = "Login must be more 4 and less 20 symbols")
    private String login;

    @NotBlank(message = "Please input correct password")
    private String password;

    @NotBlank
    private String role;

    @NotNull
    @Email(message = "Please input valid email")
    private String email;
}
