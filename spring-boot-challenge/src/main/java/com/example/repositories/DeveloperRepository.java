package com.example.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.entity.Developer;

@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Long> {

    List<Developer> findByActiveTrue();

    Optional<Developer> findByEmailIgnoreCase(String email);

}
