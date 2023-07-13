package org.example.services;

import org.example.entities.CutTask;
import org.example.entities.Task;

import java.util.List;

public interface TaskService {


    List<CutTask> findTasksByTaskList_Id(long IdTaskList);

    long save(Task task);

    boolean update(Task task);

    boolean delete(long idTask);
}
