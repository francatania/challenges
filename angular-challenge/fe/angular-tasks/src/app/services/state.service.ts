import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { NotificationService } from './notification.service';
import { Status } from '../models/enums';
import { catchError, tap, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private taskService: TaskService, private notification: NotificationService) { }

  handleStatusChanged(id: number, status: Status): Observable<any> {
    return this.taskService.updateStatus(id.toString(), status).pipe(
      tap(() => this.notification.success('Actualizado')),
      catchError(err => {
        this.notification.error('Error');
        return throwError(() => err);
      })
    );

  }
}
