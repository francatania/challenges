import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from "../task-item/task-item.component";
import { Status } from '../../models/enums';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() statusChanged = new EventEmitter<{taskId: number, status: Status}>();
  @Output() taskDeleted = new EventEmitter<number>();


  reEmitStatusChange(event:{ taskId: number, status:Status}){
    this.statusChanged.emit(event);
  }

  reEmitTaskDeleted(taskId: number){
    this.taskDeleted.emit(taskId);
  }
}
