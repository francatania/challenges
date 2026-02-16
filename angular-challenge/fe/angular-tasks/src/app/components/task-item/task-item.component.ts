import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { Status } from '../../models/enums';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  @Input() task?: Task;
  @Output() statusChanged = new EventEmitter<{taskId: number, status: Status}>();

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as Status;

    if (this.task) {
      this.statusChanged.emit({
        taskId: this.task.id,
        status: newStatus
      });
    }
  }

}
