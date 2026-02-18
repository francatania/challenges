package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.entity.Proyect;

public interface ProyectRepository extends JpaRepository<Proyect, Long>{
    
    List<Proyect> findByStatusOrderByStartDateDesc(String status);

    Proyect findByNameContainingIgnoreCase(String name);
}
