package org.example.services;

import org.example.entities.CutTaskList;
import org.example.entities.TaskList;

import java.util.List;

public interface TaskListService {
    long save(TaskList taskList);

    boolean delete(long idTaskList);

    List<CutTaskList> findAll();

    List<CutTaskList> findTaskByIdCategory(long idCategory);

    boolean update(TaskList taskList);
}
