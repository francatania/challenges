package com.example.dto.response;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResumenProyectDTO {

    Long id;
    String name;

    @JsonProperty("tasks_by_status")
    Map<String, Long> tasksByStatus;
}
