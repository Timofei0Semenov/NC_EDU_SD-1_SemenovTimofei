package fapi.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class User {

    public User() {
    }

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
