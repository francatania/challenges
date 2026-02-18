package com.example.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.entity.Task;
import com.example.models.enums.TaskPriority;
import com.example.models.enums.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long>{

    @Query(value = "SELECT t.status, COUNT(*) FROM Task t WHERE t.sprint_id = :sprintId GROUP BY t.status", nativeQuery = true)
    List<Object[]> countTaskPerStatusBySprint(@Param("sprintId") Long sprintId);

    @Query("SELECT t FROM Task t WHERE t.priority IN :priorities AND t.status = :status ORDER BY t.priority DESC")
    List<Task> findByPriorityInAndStatus(@Param("priorities") List<TaskPriority> priorities, @Param("status") TaskStatus status);

    List<Task> findByAssignedDev_IdAndStatus(Long id, TaskStatus status);

}
