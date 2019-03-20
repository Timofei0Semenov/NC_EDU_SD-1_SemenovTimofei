package backend.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "users", schema = "backend")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser")
    private int idUser;

    @Basic
    @Column(name = "firstName")
    private String firstName;

    @Basic
    @Column(name = "login")
    private String login;

    @Basic
    @Column(name = "lastName")
    private String lastName;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private Collection<Meeting> meetingsCreatedMe;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "users-meetings", schema = "backend",
            joinColumns = @JoinColumn(name = "idUser", referencedColumnName = "idUser"),
            inverseJoinColumns = @JoinColumn(name = "idMeeting", referencedColumnName = "idMeeting"))
    private Collection<Meeting> meetings;
}
