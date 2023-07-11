package org.example.services;

import org.example.entities.Category;
import org.example.entities.CutCategory;

import java.util.List;

public interface CategoryService {

    long save(Category category);

    boolean deleteById(long idCategory);

    boolean update(Category category);

    List<CutCategory> findAll();

    boolean isCategoryExist(long idCategory);
}
