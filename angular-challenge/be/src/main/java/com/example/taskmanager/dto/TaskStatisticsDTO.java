package com.example.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatisticsDTO {
    private long total;
    private long todo;
    private long inProgress;
    private long inReview;
    private long done;
    private long highPriority;
    private long urgentPriority;
}
