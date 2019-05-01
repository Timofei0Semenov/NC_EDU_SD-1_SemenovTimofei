package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users", schema = "backend")
public class User {

    public User() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long idUser;

    @Basic
    @NotNull
    @Size(min = 3, max = 30, message = "FirstName must be more 3 and less 30 symbols")
    @Column(name = "first_name")
    private String firstName;

    @Basic
    @NotNull
    @Size(min = 2, max = 40, message = "LastName must be more 2 and less 40 symbols")
    @Column(name = "last_name")
    private String lastName;

    @Basic
    @NotNull
    @Size(min = 4, max = 20, message = "Login must be more 4 and less 20 symbols")
    @Column(name = "login", unique = true)
    private String login;

    @Basic
    @NotBlank(message = "Please input correct password")
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "role")
    private String role;

    @Basic
    @NotNull
    @Email(message = "Please input valid email")
    @Column(name = "email", unique = true)
    private String email;

    @JsonIgnore
    @ManyToMany(mappedBy = "members")
    private List<Meeting> meetings = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Meeting> meetingsCreatedMe = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "friends", schema = "backend",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_friend"))
    private List<User> friends = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "receiver", fetch = FetchType.LAZY)
    private List<Message> messages = new ArrayList<>();
}
