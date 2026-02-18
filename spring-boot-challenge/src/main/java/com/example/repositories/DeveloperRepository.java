package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.models.entity.Developer;

public interface DeveloperRepository extends JpaRepository<Developer, Long> {

    List<Developer> findByActiveTrue();

    Developer findByEmailIgnoreCase(String email);

}
