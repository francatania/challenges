package com.example;

import com.example.models.entity.Tecnology;
import com.example.repositories.TecnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TecnologyRepository tecnologyRepository;

    @Override
    public void run(String... args) {
        if (tecnologyRepository.count() > 0) return;

        List<Tecnology> tecnologies = List.of(
            tec("Angular", "19"),
            tec("Docker", "25"),
            tec("Java", "21"),
            tec("PostgreSQL", "16"),
            tec("Python", "3.12"),
            tec("React", "18"),
            tec("Spring Boot", "4.0"),
            tec("TypeScript", "5.4")
        );

        tecnologyRepository.saveAll(tecnologies);
    }

    private Tecnology tec(String name, String version) {
        Tecnology t = new Tecnology();
        t.setName(name);
        t.setVersion(version);
        return t;
    }
}
