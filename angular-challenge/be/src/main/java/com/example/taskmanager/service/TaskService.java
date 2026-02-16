package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.TaskStatisticsDTO;
import com.example.taskmanager.dto.UpdateTaskDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TeamMember;
import com.example.taskmanager.model.enums.Priority;
import com.example.taskmanager.model.enums.Status;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final TeamMemberRepository teamMemberRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public List<Task> getTasksByStatus(Status status) {
        return taskRepository.findByStatus(status);
    }

    public Task createTask(CreateTaskDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus() != null ? dto.getStatus() : Status.TODO);
        task.setPriority(dto.getPriority() != null ? dto.getPriority() : Priority.MEDIUM);
        task.setCategory(dto.getCategory());
        task.setDueDate(dto.getDueDate());

        if (dto.getAssignedToId() != null) {
            TeamMember assignedTo = teamMemberRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("Team member not found"));
            task.setAssignedTo(assignedTo);
        }

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDTO dto) {
        Task task = getTaskById(id);

        if (dto.getTitle() != null) {
            task.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            task.setDescription(dto.getDescription());
        }
        if (dto.getStatus() != null) {
            task.setStatus(dto.getStatus());
        }
        if (dto.getPriority() != null) {
            task.setPriority(dto.getPriority());
        }
        if (dto.getCategory() != null) {
            task.setCategory(dto.getCategory());
        }
        if (dto.getDueDate() != null) {
            task.setDueDate(dto.getDueDate());
        }
        if (dto.getAssignedToId() != null) {
            TeamMember assignedTo = teamMemberRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("Team member not found"));
            task.setAssignedTo(assignedTo);
        }

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long id, Status status) {
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    public TaskStatisticsDTO getStatistics() {
        List<Task> allTasks = taskRepository.findAll();

        long total = allTasks.size();
        long todo = allTasks.stream().filter(t -> t.getStatus() == Status.TODO).count();
        long inProgress = allTasks.stream().filter(t -> t.getStatus() == Status.IN_PROGRESS).count();
        long inReview = allTasks.stream().filter(t -> t.getStatus() == Status.IN_REVIEW).count();
        long done = allTasks.stream().filter(t -> t.getStatus() == Status.DONE).count();
        long highPriority = allTasks.stream().filter(t -> t.getPriority() == Priority.HIGH).count();
        long urgentPriority = allTasks.stream().filter(t -> t.getPriority() == Priority.URGENT).count();

        return new TaskStatisticsDTO(total, todo, inProgress, inReview, done, highPriority, urgentPriority);
    }
}
