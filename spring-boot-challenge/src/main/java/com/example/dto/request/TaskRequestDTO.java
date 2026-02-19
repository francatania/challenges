package com.example.dto.request;

import com.example.models.enums.TaskPriority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Setter;

@Setter
public class TaskRequestDTO {
    
    @NotBlank
    @Size(min = 5, max = 200)
    String title;

    String description;

    @NotNull
    TaskPriority priority;

    @NotNull
    @Positive
    Integer sprintId;

    Long assignedDevId;
}
