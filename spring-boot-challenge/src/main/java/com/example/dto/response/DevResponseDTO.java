package com.example.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DevResponseDTO {
    Long id;

    @JsonProperty("full_name")
    String fullName;

    String email;

    boolean status;
    List<String> tecnologies;
}
