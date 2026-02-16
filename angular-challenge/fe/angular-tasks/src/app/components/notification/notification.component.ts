import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationTask } from '../../services/notification.service';

interface NotificationsWithId extends NotificationTask {
  id: number;
}

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: NotificationsWithId[] = [];
  notificationId: number = 0;

  constructor(private notification: NotificationService){}

  ngOnInit(): void {
    this.notification.Notification$.subscribe((notification =>{
      const newNotification: NotificationsWithId = {
        ...notification,
        id: this.notificationId++
      }

      this.notifications.push(newNotification);

      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, notification.duration || 3000);
    }));
  }

   removeNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

}
