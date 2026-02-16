import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private service: TaskService){}

  ngOnInit(){
    this.service.getTasks().subscribe((data)=>{
      this.tasks = data;
    });
  }
}
