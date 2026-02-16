package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateCommentDTO;
import com.example.taskmanager.model.Comment;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TeamMember;
import com.example.taskmanager.repository.CommentRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final TeamMemberRepository teamMemberRepository;

    public List<Comment> getCommentsByTaskId(Long taskId) {
        return commentRepository.findByTaskId(taskId);
    }

    public Comment createComment(Long taskId, CreateCommentDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        TeamMember author = teamMemberRepository.findById(dto.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Team member not found with id: " + dto.getAuthorId()));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setTask(task);
        comment.setAuthor(author);

        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found with id: " + id);
        }
        commentRepository.deleteById(id);
    }
}
