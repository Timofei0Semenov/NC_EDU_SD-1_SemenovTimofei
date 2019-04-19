package backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@JsonIdentityInfo(scope = Message.class, generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "idMessage")
@Table(name = "messages", schema = "backend")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long idMessage;

    @Basic
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "sender")
    private User sender;

    @Basic
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "receiver")
    private User receiver;

    @Basic
    @ManyToOne
    @NotNull
    @JoinColumn(name = "meeting")
    private Meeting meeting;

    @Basic
    @JoinColumn(name = "target")
    @NotBlank
    private String target;
}
