package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "regularities")
public class Regularity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERegularity name;

    @OneToMany(mappedBy = "regularity", cascade = CascadeType.REMOVE)
    private List<TaskList> tasks;
}
