import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationTask {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationTask>();
  public Notification$ = this.notificationSubject.asObservable();
  constructor() { }

  success(message: string, duration = 3000): void {
    this.notificationSubject.next({ type: 'success', message, duration });
  }

  error(message: string, duration = 3000): void {
    this.notificationSubject.next({ type: 'error', message, duration });
  }

  info(message: string, duration = 3000): void {
    this.notificationSubject.next({ type: 'info', message, duration });
  }

  warning(message: string, duration = 3000): void {
    this.notificationSubject.next({ type: 'warning', message, duration });
  }
}
