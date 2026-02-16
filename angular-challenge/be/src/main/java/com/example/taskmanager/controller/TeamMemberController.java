package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TeamMember;
import com.example.taskmanager.service.TeamMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team-members")
@RequiredArgsConstructor
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @GetMapping
    public ResponseEntity<List<TeamMember>> getAllTeamMembers() {
        return ResponseEntity.ok(teamMemberService.getAllTeamMembers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamMember> getTeamMemberById(@PathVariable Long id) {
        return ResponseEntity.ok(teamMemberService.getTeamMemberById(id));
    }

    @PostMapping
    public ResponseEntity<TeamMember> createTeamMember(@Valid @RequestBody TeamMember teamMember) {
        TeamMember created = teamMemberService.createTeamMember(teamMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamMember> updateTeamMember(@PathVariable Long id, @Valid @RequestBody TeamMember teamMember) {
        return ResponseEntity.ok(teamMemberService.updateTeamMember(id, teamMember));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long id) {
        teamMemberService.deleteTeamMember(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<Task>> getTasksAssignedToMember(@PathVariable Long id) {
        return ResponseEntity.ok(teamMemberService.getTasksAssignedToMember(id));
    }
}
