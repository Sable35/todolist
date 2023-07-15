package org.example.repositories;

import org.example.entities.EStatus;
import org.example.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findByName(EStatus name);
}
