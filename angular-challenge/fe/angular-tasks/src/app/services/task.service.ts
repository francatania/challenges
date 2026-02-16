import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatistics } from '../models/task.model';
import { Status } from '../models/enums';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  updateStatus(id: string, status: Status): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}/status`, {status: status})
  }

  deleteTask(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }
}
