package com.example.dto.response;

import com.example.models.enums.TaskPriority;
import com.example.models.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TaskResponseDTO {

    Long id;
    String title;
    TaskPriority priority;
    TaskStatus status;

    @JsonProperty("sprint_name")
    String sprintName;

    @JsonProperty("assigned_dev")
    String assignedDevFullName;
}
