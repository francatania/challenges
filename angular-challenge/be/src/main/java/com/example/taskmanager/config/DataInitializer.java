package com.example.taskmanager.config;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TeamMember;
import com.example.taskmanager.model.enums.Category;
import com.example.taskmanager.model.enums.Priority;
import com.example.taskmanager.model.enums.Status;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TeamMemberRepository teamMemberRepository;
    private final TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crear miembros del equipo
        TeamMember maria = new TeamMember();
        maria.setName("María García");
        maria.setEmail("maria.garcia@example.com");
        maria.setRole("Frontend Developer");
        maria.setAvatar("https://i.pravatar.cc/150?img=1");
        teamMemberRepository.save(maria);

        TeamMember carlos = new TeamMember();
        carlos.setName("Carlos Rodríguez");
        carlos.setEmail("carlos.rodriguez@example.com");
        carlos.setRole("Backend Developer");
        carlos.setAvatar("https://i.pravatar.cc/150?img=2");
        teamMemberRepository.save(carlos);

        TeamMember ana = new TeamMember();
        ana.setName("Ana Martínez");
        ana.setEmail("ana.martinez@example.com");
        ana.setRole("Full Stack Developer");
        ana.setAvatar("https://i.pravatar.cc/150?img=3");
        teamMemberRepository.save(ana);

        TeamMember juan = new TeamMember();
        juan.setName("Juan López");
        juan.setEmail("juan.lopez@example.com");
        juan.setRole("QA Engineer");
        juan.setAvatar("https://i.pravatar.cc/150?img=4");
        teamMemberRepository.save(juan);

        TeamMember laura = new TeamMember();
        laura.setName("Laura Fernández");
        laura.setEmail("laura.fernandez@example.com");
        laura.setRole("UI/UX Designer");
        laura.setAvatar("https://i.pravatar.cc/150?img=5");
        teamMemberRepository.save(laura);

        // Crear tareas de ejemplo
        Task task1 = new Task();
        task1.setTitle("Implementar sistema de autenticación");
        task1.setDescription("Crear login y registro con JWT para la aplicación Angular");
        task1.setStatus(Status.IN_PROGRESS);
        task1.setPriority(Priority.HIGH);
        task1.setCategory(Category.FEATURE);
        task1.setAssignedTo(maria);
        task1.setDueDate(LocalDate.now().plusDays(5));
        taskRepository.save(task1);

        Task task2 = new Task();
        task2.setTitle("Corregir bug en formulario de tareas");
        task2.setDescription("El formulario no valida correctamente las fechas en el pasado");
        task2.setStatus(Status.TODO);
        task2.setPriority(Priority.URGENT);
        task2.setCategory(Category.BUG);
        task2.setAssignedTo(carlos);
        task2.setDueDate(LocalDate.now().plusDays(2));
        taskRepository.save(task2);

        Task task3 = new Task();
        task3.setTitle("Agregar filtros a la lista de tareas");
        task3.setDescription("Implementar filtros por estado, prioridad y categoría usando @Output");
        task3.setStatus(Status.TODO);
        task3.setPriority(Priority.MEDIUM);
        task3.setCategory(Category.FEATURE);
        task3.setAssignedTo(ana);
        task3.setDueDate(LocalDate.now().plusDays(7));
        taskRepository.save(task3);

        Task task4 = new Task();
        task4.setTitle("Documentar API REST");
        task4.setDescription("Crear documentación completa de los endpoints con ejemplos");
        task4.setStatus(Status.IN_REVIEW);
        task4.setPriority(Priority.LOW);
        task4.setCategory(Category.DOCUMENTATION);
        task4.setAssignedTo(juan);
        task4.setDueDate(LocalDate.now().plusDays(10));
        taskRepository.save(task4);

        Task task5 = new Task();
        task5.setTitle("Refactorizar servicio de estado");
        task5.setDescription("Optimizar el StateService para mejor performance con BehaviorSubject");
        task5.setStatus(Status.DONE);
        task5.setPriority(Priority.MEDIUM);
        task5.setCategory(Category.REFACTORING);
        task5.setAssignedTo(ana);
        task5.setDueDate(LocalDate.now().minusDays(2));
        taskRepository.save(task5);

        Task task6 = new Task();
        task6.setTitle("Diseñar mockups del dashboard");
        task6.setDescription("Crear wireframes y diseños para el dashboard principal");
        task6.setStatus(Status.DONE);
        task6.setPriority(Priority.HIGH);
        task6.setCategory(Category.FEATURE);
        task6.setAssignedTo(laura);
        task6.setDueDate(LocalDate.now().minusDays(5));
        taskRepository.save(task6);

        Task task7 = new Task();
        task7.setTitle("Escribir tests para TaskService");
        task7.setDescription("Crear suite de tests unitarios para el servicio de tareas en Angular");
        task7.setStatus(Status.TODO);
        task7.setPriority(Priority.MEDIUM);
        task7.setCategory(Category.TESTING);
        task7.setAssignedTo(juan);
        task7.setDueDate(LocalDate.now().plusDays(8));
        taskRepository.save(task7);

        Task task8 = new Task();
        task8.setTitle("Implementar drag and drop para tareas");
        task8.setDescription("Permitir arrastrar tareas entre columnas de estado usando Angular CDK");
        task8.setStatus(Status.IN_PROGRESS);
        task8.setPriority(Priority.MEDIUM);
        task8.setCategory(Category.FEATURE);
        task8.setAssignedTo(maria);
        task8.setDueDate(LocalDate.now().plusDays(12));
        taskRepository.save(task8);

        Task task9 = new Task();
        task9.setTitle("Optimizar queries de base de datos");
        task9.setDescription("Revisar y optimizar las consultas JPA para mejor rendimiento");
        task9.setStatus(Status.IN_REVIEW);
        task9.setPriority(Priority.HIGH);
        task9.setCategory(Category.REFACTORING);
        task9.setAssignedTo(carlos);
        task9.setDueDate(LocalDate.now().plusDays(6));
        taskRepository.save(task9);

        Task task10 = new Task();
        task10.setTitle("Crear sistema de notificaciones");
        task10.setDescription("Implementar NotificationService con Subject para mostrar mensajes al usuario");
        task10.setStatus(Status.TODO);
        task10.setPriority(Priority.LOW);
        task10.setCategory(Category.FEATURE);
        task10.setAssignedTo(ana);
        task10.setDueDate(LocalDate.now().plusDays(15));
        taskRepository.save(task10);

        System.out.println("✅ Datos de ejemplo creados exitosamente!");
        System.out.println("📊 Miembros del equipo: " + teamMemberRepository.count());
        System.out.println("📝 Tareas creadas: " + taskRepository.count());
    }
}
