package com.example.taskmanager.dto;

import com.example.taskmanager.model.enums.Category;
import com.example.taskmanager.model.enums.Priority;
import com.example.taskmanager.model.enums.Status;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskDTO {
    private String title;
    private String description;
    private Status status;
    private Priority priority;
    private Category category;
    private Long assignedToId;
    private LocalDate dueDate;
}
