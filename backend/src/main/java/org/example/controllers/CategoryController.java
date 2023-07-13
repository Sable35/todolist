package org.example.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.entities.Category;
import org.example.entities.CutCategory;
import org.example.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping
    public ResponseEntity<List<CutCategory>> getCategories(){
        log.info("Список категорий пользователя");
        return ResponseEntity.ok().body(categoryService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category) {
        categoryService.save(category);
        log.info("Добавление катеогрии {}", category);
        return ResponseEntity.created(URI.create("categories/" + category.getId())).build();
    }

    @PutMapping
    public ResponseEntity<?> updateTaskList(@RequestBody Category category) {
        log.info("Обновление информации о категории");
        boolean isUpdated = categoryService.update(category);

        if (isUpdated) {
            log.info("Обновление информации о категории успешно");
            return ResponseEntity.ok().build();
        } else {
            log.warn("Обновление информации о категории прошло неуспешно");
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{IdCategory}")
    public ResponseEntity<?> deleteTaskList(@PathVariable long IdCategory) {
        log.info("Удаление категории по id: {}", IdCategory);
        boolean isDeleted = categoryService.deleteById(IdCategory);
        if (isDeleted) {
            log.info("Удаление категории успешно");
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Удаление категории прошло неуспешно");
            return ResponseEntity.notFound().build();
        }
    }

}
