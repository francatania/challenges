import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { StateService } from '../../services/state.service';
import { Status } from '../../models/enums';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
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

  handleDelete(taskId: number){
    this.stateService.deleteTask(taskId).subscribe({
      next: ()=> {this.loadTasks()}}
    )
  }
}
