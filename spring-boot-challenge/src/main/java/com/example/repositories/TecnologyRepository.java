package com.example.repositories;

import com.example.models.entity.Tecnology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TecnologyRepository extends JpaRepository<Tecnology, Long> {

    List<Tecnology> findAllById(Iterable<Long> ids);
}
