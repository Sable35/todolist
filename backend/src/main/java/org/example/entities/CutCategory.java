package org.example.entities;

import lombok.Data;

@Data
public class CutCategory {
    private long id;
    private String name;
    private long userId;

    public CutCategory(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.userId = category.getUser().getId();
    }
}
