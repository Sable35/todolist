package org.example.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "taskLists")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private String description;

    @Column(name = "date_notify")
    @JsonFormat(pattern = "YYYY-MM-DD HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateNotify;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Priority priority;

    @ManyToOne
    private Status status;

    @ManyToOne
    private Regularity regularity;




}
