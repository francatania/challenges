package com.example.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Content is required")
    @Column(length = 1000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "task_id")
    @JsonIgnoreProperties("comments")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "author_id")
    @JsonIgnoreProperties("assignedTasks")
    private TeamMember author;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
