package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TeamMember;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;
    private final TaskRepository taskRepository;

    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAll();
    }

    public TeamMember getTeamMemberById(Long id) {
        return teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team member not found with id: " + id));
    }

    public TeamMember createTeamMember(TeamMember teamMember) {
        return teamMemberRepository.save(teamMember);
    }

    public TeamMember updateTeamMember(Long id, TeamMember updatedMember) {
        TeamMember member = getTeamMemberById(id);

        if (updatedMember.getName() != null) {
            member.setName(updatedMember.getName());
        }
        if (updatedMember.getEmail() != null) {
            member.setEmail(updatedMember.getEmail());
        }
        if (updatedMember.getRole() != null) {
            member.setRole(updatedMember.getRole());
        }
        if (updatedMember.getAvatar() != null) {
            member.setAvatar(updatedMember.getAvatar());
        }

        return teamMemberRepository.save(member);
    }

    public void deleteTeamMember(Long id) {
        if (!teamMemberRepository.existsById(id)) {
            throw new RuntimeException("Team member not found with id: " + id);
        }
        teamMemberRepository.deleteById(id);
    }

    public List<Task> getTasksAssignedToMember(Long memberId) {
        return taskRepository.findByAssignedToId(memberId);
    }
}
