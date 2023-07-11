package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
    private List<TaskList> taskLists;
}
