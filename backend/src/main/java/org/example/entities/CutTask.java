package org.example.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
public class CutTask {

    private long id;
    private String name;
    private long parentTaskId;
    private long ListTaskId;

    public CutTask(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        if (task.getParentTask() != null){
            this.parentTaskId = task.getParentTask().getId();
        }

    }
}
