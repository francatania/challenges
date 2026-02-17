import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { NotificationService } from './notification.service';
import { Status } from '../models/enums';
import { catchError, tap, throwError, Observable, EMPTY } from 'rxjs';
import { CreateTaskDTO, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private taskService: TaskService, private notification: NotificationService) { }

  handleStatusChanged(id: number, status: Status): Observable<Task> {
    return this.taskService.updateStatus(id.toString(), status).pipe(
      tap(() => this.notification.success('Actualizado')),
      catchError(err => {
        this.notification.error('Error');
        return throwError(() => err);
      })
    );

  }

  deleteTask(id: number): Observable<void>{
    return this.taskService.deleteTask(id.toString()).pipe(
      tap(()=>{this.notification.success('Task eliminada')}),
      catchError(()=> {
        this.notification.error('Error')
        return EMPTY;
      })
    )
  }

  createTask(dto: CreateTaskDTO){
    return this.taskService.createTask(dto).pipe(
      tap(()=>this.notification.success("Creado", 3000)),
      catchError(()=>{
        this.notification.error("Error al crear task", 3000)
        return EMPTY;
      })
    )
  }
}
