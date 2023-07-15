package org.example.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.entities.*;
import org.example.services.PriorityService;
import org.example.services.RegularityService;
import org.example.services.StatusService;
import org.example.services.TaskListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("taskLists")
public class TaskListController {

    private final TaskListService taskListService;
    private final StatusService statusService;
    private final PriorityService priorityService;
    private final RegularityService regularityService;

    public TaskListController(TaskListService taskListService, StatusService statusService, PriorityService priorityService, RegularityService regularityService) {
        this.taskListService = taskListService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.regularityService = regularityService;
    }

    @PostMapping
    public ResponseEntity<?> addTaskList(@Valid @RequestBody TaskList taskList) {
        taskListService.save(taskList);
        log.info("Добавление задачи {}", taskList);
        return ResponseEntity.created(URI.create("taskLists/" + taskList.getId())).build();
    }

    @PutMapping
    public ResponseEntity<?> updateTaskList(@RequestBody TaskList taskList) {
        log.info("Обновление информации о задаче");
        boolean isUpdated = taskListService.update(taskList);

        if (isUpdated) {
            log.info("Обновление информации о задаче успешно");
            return ResponseEntity.ok().build();
        } else {
            log.warn("Обновление информации о задаче прошло неуспешно");
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{IdTaskList}")
    public ResponseEntity<?> deleteTaskList(@PathVariable long IdTaskList) {
        log.info("Удаление задачи по id: {}", IdTaskList);
        boolean isDeleted = taskListService.delete(IdTaskList);
        if (isDeleted) {
            log.info("Удаление задачи успешно");
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Удаление задачи прошло неуспешно");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<CutTaskList> getTaskLists(){
        log.info("Список задач пользователя");
        return taskListService.findAll();
    }

    @GetMapping("/categories")
    public List<CutTaskList> getTaskListsByCategory(@RequestParam long IdCategory) {
        log.info("Получение задач по категории");
        return taskListService.findTaskListByIdCategory(IdCategory);
    }

    @GetMapping("/statuses")
    public List<Status> getStatuses() {
        log.info("Получение статусов задач");
        return statusService.findAll();
    }
    @GetMapping("/regularities")
    public List<Regularity> getRegularity() {
        log.info("Получение списка периодичностей");
        return regularityService.findAll();
    }

    @GetMapping("/priorities")
    public List<Priority> getPriorities() {
        log.info("Получение списка приоритетов");
        return priorityService.findAll();
    }
}
