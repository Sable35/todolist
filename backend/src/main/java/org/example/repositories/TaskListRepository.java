package org.example.repositories;


import org.example.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {

    List<TaskList> findByCategory_Id(long id);
}
