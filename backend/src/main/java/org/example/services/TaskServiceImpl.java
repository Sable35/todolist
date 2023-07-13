package org.example.services;

import org.example.entities.CutTask;
import org.example.entities.Task;
import org.example.entities.TaskList;
import org.example.repositories.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

    public TaskServiceImpl(TaskRepository taskRepository, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
    }

    @Override
    public List<CutTask> findTasksByTaskList_Id(long IdTaskList) {
        List<Task> taskList = taskRepository.findByTaskList_Id(IdTaskList);
        List<CutTask> cutTaskList = new ArrayList<>();
        for (Task task: taskList
             ) {
             CutTask cutTask = new CutTask(task);
             cutTask.setListTaskId(IdTaskList);
            cutTaskList.add(cutTask);
        }
            return cutTaskList;
    }

    @Override
    public long save(Task task) {
        if(categoryService.isCategoryExist(task.getTaskList().getCategory().getId())) {
            return taskRepository.save(task).getId();
        } else throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public boolean update(Task task) {
        if (taskRepository.existsById(task.getId())
                && categoryService.isCategoryExist(task.getTaskList().getCategory().getId())) {
            taskRepository.save(task);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long idTask) {
        Optional<Task> task = taskRepository.findById(idTask);
        if (task.isPresent() && categoryService.isCategoryExist(task.get().getTaskList().getCategory().getId())) {
            taskRepository.deleteById(idTask);
            return true;
        }
        return false;
    }

}
