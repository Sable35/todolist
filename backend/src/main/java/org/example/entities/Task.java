package org.example.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;

    @ManyToOne(optional = true, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "parent_id")
    private Task parentTask;

    @ManyToOne
    private TaskList taskList;



}
