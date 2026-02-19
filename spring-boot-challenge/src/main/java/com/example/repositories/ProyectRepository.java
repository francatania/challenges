package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.entity.Proyect;

@Repository
public interface ProyectRepository extends JpaRepository<Proyect, Long>{
    
    List<Proyect> findByStatusOrderByStartDateDesc(String status);

    Proyect findByNameContainingIgnoreCase(String name);
}
