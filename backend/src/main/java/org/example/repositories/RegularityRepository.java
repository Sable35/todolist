package org.example.repositories;

import org.example.entities.ERegularity;
import org.example.entities.Regularity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RegularityRepository extends JpaRepository<Regularity, Long> {
    Optional<Regularity> findByName(ERegularity name);
}
