package org.example.services;

import org.example.entities.Category;
import org.example.entities.CutCategory;
import org.example.entities.User;
import org.example.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public CategoryServiceImpl(CategoryRepository categoryRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    @Override
    public long save(Category category){
        User user = new User(userService.getUserIdFromContext());
        category.setUser(user);
        categoryRepository.save(category);
        return category.getId();
    }
    @Override
    public boolean deleteById(long idCategory){
        if (isCategoryExist(idCategory)) {
            categoryRepository.deleteById(idCategory);
            return true;
        } else return false;
    }

    @Override
    public boolean update(Category category) {
        if (isCategoryExist(category.getId())){
            User user = new User(userService.getUserIdFromContext());
            category.setUser(user);
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public List<CutCategory> findAll() {
        return categoryRepository.findCategoryByUser_Id(userService.getUserIdFromContext())
                .stream()
                .map(CutCategory::new)
                .toList();
    }
    @Override
    public boolean isCategoryExist(long idCategory){
        if(categoryRepository.existsByIdAndUser_Id(idCategory, userService.getUserIdFromContext())){
            return true;
        } else return false;
    }
}
