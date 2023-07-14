package org.example.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CutTaskList {
    private long id;
    private String name;
    private String description;
    @JsonFormat(pattern = "YYYY-MM-DD HH:mm:ss")
    private LocalDateTime dateNotify;
    private CutCategory category;
    private Priority priority;
    private Status status;
    private Regularity regularity;
    private List<CutTask> tasks;

    public CutTaskList(TaskList taskList) {
        this.id = taskList.getId();
        this.name = taskList.getName();
        this.description = taskList.getDescription();
        this.dateNotify = taskList.getDateNotify();
        this.category = new CutCategory(taskList.getCategory());
        this.priority = taskList.getPriority();
        this.status = taskList.getStatus();
        this.regularity = taskList.getRegularity();
    }
}
