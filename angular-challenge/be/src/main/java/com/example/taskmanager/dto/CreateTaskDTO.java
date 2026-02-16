package com.example.taskmanager.dto;

import com.example.taskmanager.model.enums.Category;
import com.example.taskmanager.model.enums.Priority;
import com.example.taskmanager.model.enums.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskDTO {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Status status = Status.TODO;

    private Priority priority = Priority.MEDIUM;

    private Category category = Category.FEATURE;

    private Long assignedToId;

    private LocalDate dueDate;
}
