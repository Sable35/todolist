package org.example.repositories;

import org.example.entities.CutTask;
import org.example.entities.Task;
import org.example.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByTaskList_Id(long IdTaskList);

}
