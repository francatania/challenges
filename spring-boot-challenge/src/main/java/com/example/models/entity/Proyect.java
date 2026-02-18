package com.example.models.entity;

import java.time.LocalDate;
import java.util.List;

import com.example.models.enums.ProyectStatus;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Proyect {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, length = 150, nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column() 
    @Enumerated(EnumType.STRING)
    private ProyectStatus status;

    @ManyToMany
    @JoinTable(
        name = "proyect_dev",
        joinColumns = @JoinColumn(name = "proyect_id"),
        inverseJoinColumns = @JoinColumn(name = "dev_id")
    )
    private List<Developer> devs;

    @OneToMany(mappedBy = "proyect" ,cascade = CascadeType.ALL)
    private List<Sprint> sprints;
}
