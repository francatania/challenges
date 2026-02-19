package com.example.dto.request;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.example.models.entity.Developer;
import com.example.models.entity.Tecnology;
import com.example.models.enums.DevLevel;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DevRequestDTO {
    @NotEmpty
    @Size(min = 2, max = 100)
    String name;

    @NotEmpty
    @Length(min = 2, max = 100)
    @JsonProperty("last_name")
    String lastName;

    @NotEmpty
    @Email
    String email;

    @NotNull
    @JsonProperty("dev_level")
    DevLevel devLevel;

    @NotNull
    List<Long> tecnologies;

    public Developer toEntity(){
        Developer dev = new Developer();
        dev.setName(name);
        dev.setLastName(lastName);
        dev.setEmail(email);
        dev.setDevLevel(devLevel);
        return dev;

    }
}
