package org.example.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.entities.Task;
import org.example.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task) {
        long taskId = taskService.save(task);
        log.info("Добавление задачи {}", task);
        return ResponseEntity.created(URI.create("tasks/" + taskId)).build();
    }


    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        log.info("Обновление информации о подзадаче");
        boolean isUpdated = taskService.update(task); //Нужна какая-то проверка на false

        if (isUpdated) {
            log.info("Обновление информации о подзадаче успешно");
            return ResponseEntity.ok().build();
        } else {
            log.warn("Обновление информации о подзадаче было неуспешным");
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{IdTask}")
    public ResponseEntity<?> deleteTask(@PathVariable long IdTask) {
        log.info("Удаление задачи по id: {}", IdTask);
        boolean isDeleted = taskService.delete(IdTask);
        if (isDeleted) {
            log.info("Удаление подзадачи успешно");
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Удаление подзадачи было неуспешным");
            return ResponseEntity.notFound().build();
        }
    }
}
