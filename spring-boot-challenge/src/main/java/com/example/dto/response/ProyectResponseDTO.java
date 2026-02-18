package com.example.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProyectResponseDTO {
    
    Long id;
    String name;
    String description;

    @JsonProperty("start_date")
    LocalDate startDate;

    @JsonProperty("end_date")
    LocalDate endDate;

    boolean status;

    Integer devsCount;

    Integer sprintsCount;
}
