package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.request.DevRequestDTO;
import com.example.dto.response.DevResponseDTO;
import com.example.exception.BussinessException;
import com.example.models.entity.Developer;
import com.example.models.entity.Tecnology;
import com.example.repositories.DeveloperRepository;
import com.example.repositories.TecnologyRepository;

@Service
public class DeveloperService{

    @Autowired
    private DeveloperRepository developerRepository;

    @Autowired
    private TecnologyRepository tecnologyRepository;

    public DevResponseDTO createDev(DevRequestDTO dto){

        Optional<Developer> optional = this.developerRepository.findByEmailIgnoreCase(dto.getEmail());
        if(optional.isPresent()){
            throw new BussinessException("El email ya esta registrado.");
        }

        Developer entity = dto.toEntity();

        List<Tecnology> tecnologies = this.tecnologyRepository.findAllById(dto.getTecnologies());
  
        entity.setTecnologies(tecnologies);
        

        Developer dev = this.developerRepository.save(entity);

        return DevResponseDTO.builder()
                .id(dev.getId())
                .fullName(dev.getName() + " " + dev.getLastName())
                .email(dev.getEmail())
                .status(dev.getActive())
                .tecnologies(dev.getTecnologies().stream().map(Tecnology::getName).toList())
                .build();
    }
}