import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';

export const routes: Routes = [

    {path:'', component: TasksComponent },
    {path: 'tasks/create', component: CreateTaskComponent}
];
