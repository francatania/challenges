package com.example.dto.request;

import java.time.LocalDate;
import java.util.List;

import com.example.models.enums.ProyectStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProyectRequestDTO {
    
    @NotBlank
    @Size(max = 150)
    String name;

    String description;

    @NotNull
    @FutureOrPresent
    @JsonProperty("start_date")
    LocalDate startDate;

    @JsonProperty("end_date")
    LocalDate endDate;

    @NotNull
    ProyectStatus status;

    @NotNull
    @Size(min = 1)
    @JsonProperty("devs_id")
    List<Long> devsId;

    @AssertTrue(message = "endDate must be after startDate")
    public boolean isEndDateValid(){
        if(endDate == null){return true;}
        return endDate.isAfter(startDate);
    }
}
