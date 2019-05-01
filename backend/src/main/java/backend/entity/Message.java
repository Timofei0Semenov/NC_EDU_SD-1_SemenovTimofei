package backend.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
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
    @JoinColumn(name = "meeting")
    private Meeting meeting;

    @Basic
    @JoinColumn(name = "target")
    @NotBlank
    private String target;
}
