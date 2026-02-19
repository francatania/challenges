package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.request.DevRequestDTO;
import com.example.dto.response.DevResponseDTO;
import com.example.services.DeveloperService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/developers")
public class DeveloperController {

    @Autowired
    private DeveloperService developerService;

    @PostMapping
    public ResponseEntity<DevResponseDTO> create(@Valid @RequestBody DevRequestDTO dto) {
        DevResponseDTO response = developerService.createDev(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
