package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CreateCommentDTO;
import com.example.taskmanager.model.Comment;
import com.example.taskmanager.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/tasks/{taskId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByTaskId(@PathVariable Long taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTaskId(taskId));
    }

    @PostMapping("/tasks/{taskId}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long taskId, @Valid @RequestBody CreateCommentDTO dto) {
        Comment comment = commentService.createComment(taskId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
