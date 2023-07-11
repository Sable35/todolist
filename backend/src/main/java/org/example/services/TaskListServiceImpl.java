package org.example.services;

import org.example.entities.CutTaskList;
import org.example.entities.TaskList;
import org.example.repositories.TaskListRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TaskListServiceImpl implements TaskListService{

    private final CategoryService categoryService;
    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(CategoryService categoryService, TaskListRepository taskListRepository) {
        this.categoryService = categoryService;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public long save(TaskList taskList){
        if(categoryService.isCategoryExist(taskList.getCategory().getId())) {
            return taskListRepository.save(taskList).getId();
        } else throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public boolean delete(long idTaskList) {
        Optional<TaskList> taskList = taskListRepository.findById(idTaskList);
        if (taskList.isPresent() && categoryService.isCategoryExist(taskList.get().getCategory().getId())) {
            taskListRepository.deleteById(idTaskList);
            return true;
        }
        return false;
    }

    @Override
    public List<CutTaskList> findAll() {
        return categoryService.findAll()
                .stream()
                .flatMap(category ->
                        taskListRepository.findByCategory_Id(category.getId())
                                .stream()
                                .map(CutTaskList::new))
                .toList();
    }

    @Override
    public List<CutTaskList> findTaskByIdCategory(long idCategory) {
        if(categoryService.isCategoryExist(idCategory)){
            return taskListRepository.findByCategory_Id(idCategory)
                    .stream()
                    .map(CutTaskList::new).toList();
        }
        return List.of();
    }


    @Override
    public boolean update(TaskList taskList) {
        if (taskListRepository.existsById(taskList.getId())
                && categoryService.isCategoryExist(taskList.getCategory().getId())) {
            taskListRepository.save(taskList);
            return true;
        }
        return false;
    }

}
