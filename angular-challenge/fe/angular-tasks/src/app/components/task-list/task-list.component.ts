import { Component, OnInit } from '@angular/core';
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
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private service: TaskService, private stateService: StateService){}

  ngOnInit(){
    this.loadTasks();
  }

  loadTasks(){
        this.service.getTasks().subscribe((data)=>{
      this.tasks = data;
    });
  }

  handleStatus(event:{ taskId: number, status:Status}){
    this.stateService.handleStatusChanged(event.taskId, event.status).subscribe({
      next: ()=>{this.loadTasks()}
    });
  }
}
