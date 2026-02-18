package com.example.models.entity;


import java.util.List;

import com.example.models.enums.DevLevel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Developer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @Column
    private String email;

    @Column(name = "dev_level")
    @Enumerated(EnumType.STRING)
    private DevLevel devLevel;

    @Column
    private Boolean active = true;

    @Column
    @ManyToMany
    @JoinTable(
        name = "dev_tec",
        joinColumns = @JoinColumn(name = "dev_id"),
        inverseJoinColumns = @JoinColumn(name ="tec_id")

    )
    private List<Tecnology> tecnologies;

}
