package org.example.repositories;

import org.example.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByIdAndUser_Id(long idCategory, long idUser);

    List<Category> findCategoryByUser_Id(long IdUser);
}
