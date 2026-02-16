# 📝 Consignas - Práctica Angular para Examen

Sistema de gestión de tareas para practicar conceptos clave de Angular.

## 🎯 Objetivos de Aprendizaje

- ✅ **@Input y @Output**: Comunicación entre componentes padre-hijo
- ✅ **Template-driven forms**: Formularios con validaciones
- ✅ **HttpClient y Observables**: Peticiones HTTP asíncronas
- ✅ **Subject y BehaviorSubject**: Gestión de estado compartido

## 🚀 Configuración Inicial

### 1. Iniciar el Backend

```bash
cd be
./mvnw spring-boot:run
```

Verifica que esté corriendo:
- API: http://localhost:8080/api/tasks
- H2 Console: http://localhost:8080/h2-console

### 2. Iniciar Angular

```bash
cd fe/angular-tasks
npm install
ng serve
```

Tu aplicación estará en: http://localhost:4200

## 📚 Nivel 1: @Input y @Output (Comunicación entre Componentes)

### Ejercicio 1.1: TaskItemComponent - Recibir datos con @Input

**Objetivo**: Crear un componente hijo que reciba datos del padre.

**Ubicación**: `src/app/components/task-item/`

**Tareas**:
1. En `task-item.component.ts`, importa `@Input` y el modelo `Task`
2. Declara una propiedad con `@Input() task!: Task;`
3. En el HTML, muestra:
   - Título de la tarea
   - Descripción
   - Estado (con color según el estado)
   - Prioridad (con color según prioridad)
   - Fecha de vencimiento

**Código de ejemplo**:
```typescript
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
}
```

**HTML con Tailwind**:
```html
<div class="border rounded-lg p-4 mb-3 hover:shadow-md transition">
  <h3 class="font-bold text-lg">{{ task.title }}</h3>
  <p class="text-gray-600">{{ task.description }}</p>

  <div class="flex gap-2 mt-2">
    <span class="px-2 py-1 rounded text-sm"
          [ngClass]="{
            'bg-gray-200': task.status === 'TODO',
            'bg-blue-200': task.status === 'IN_PROGRESS',
            'bg-yellow-200': task.status === 'IN_REVIEW',
            'bg-green-200': task.status === 'DONE'
          }">
      {{ task.status }}
    </span>

    <span class="px-2 py-1 rounded text-sm"
          [ngClass]="{
            'bg-green-100': task.priority === 'LOW',
            'bg-yellow-100': task.priority === 'MEDIUM',
            'bg-orange-100': task.priority === 'HIGH',
            'bg-red-100': task.priority === 'URGENT'
          }">
      {{ task.priority }}
    </span>
  </div>
</div>
```

**Verificación**:
- ✅ El componente recibe datos correctamente
- ✅ Los colores cambian según estado y prioridad
- ✅ Todos los datos se muestran

---

### Ejercicio 1.2: TaskItemComponent - Emitir eventos con @Output

**Objetivo**: Permitir que el componente hijo notifique al padre sobre acciones.

**Tareas**:
1. Importa `@Output` y `EventEmitter`
2. Crea tres eventos:
   - `@Output() statusChanged = new EventEmitter<{taskId: number, status: Status}>();`
   - `@Output() taskDeleted = new EventEmitter<number>();`
   - `@Output() taskSelected = new EventEmitter<number>();`
3. Agrega botones en el HTML para:
   - Ver detalles (emite `taskSelected`)
   - Cambiar estado (emite `statusChanged`)
   - Eliminar (emite `taskDeleted`)
4. Emite los eventos cuando se hagan clic

**Código de ejemplo**:
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Status } from '../../models/enums';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusChanged = new EventEmitter<{taskId: number, status: Status}>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskSelected = new EventEmitter<number>();

  onStatusChange(newStatus: Status) {
    this.statusChanged.emit({ taskId: this.task.id, status: newStatus });
  }

  onDelete() {
    if (confirm('¿Seguro que quieres eliminar esta tarea?')) {
      this.taskDeleted.emit(this.task.id);
    }
  }

  onViewDetails() {
    this.taskSelected.emit(this.task.id);
  }
}
```

**Botones en HTML**:
```html
<div class="mt-3 flex gap-2">
  <button (click)="onViewDetails()"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
    Ver Detalles
  </button>

  <select (change)="onStatusChange($any($event.target).value)"
          class="px-2 py-1 border rounded">
    <option value="TODO">TODO</option>
    <option value="IN_PROGRESS">IN_PROGRESS</option>
    <option value="IN_REVIEW">IN_REVIEW</option>
    <option value="DONE">DONE</option>
  </select>

  <button (click)="onDelete()"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
    Eliminar
  </button>
</div>
```

**Verificación**:
- ✅ Los eventos se emiten correctamente
- ✅ El padre puede capturar los eventos

---

### Ejercicio 1.3: TaskListComponent - Capturar eventos del hijo

**Objetivo**: Crear componente padre que reciba y procese eventos de hijos.

**Ubicación**: `src/app/components/task-list/`

**Tareas**:
1. Declara `@Input() tasks: Task[] = [];`
2. Crea métodos para manejar los eventos del hijo
3. En el HTML, usa `*ngFor` para renderizar múltiples `TaskItemComponent`
4. Escucha los eventos con `(statusChanged)`, `(taskDeleted)`, `(taskSelected)`

**Código**:
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { Status } from '../../models/enums';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  handleStatusChange(event: {taskId: number, status: Status}) {
    console.log('Estado cambiado:', event);
    // Aquí llamarías al servicio para actualizar
  }

  handleTaskDeleted(taskId: number) {
    console.log('Tarea eliminada:', taskId);
    // Aquí llamarías al servicio para eliminar
  }

  handleTaskSelected(taskId: number) {
    console.log('Tarea seleccionada:', taskId);
    // Aquí navegarías a la vista de detalle
  }
}
```

**HTML**:
```html
<div class="space-y-3">
  <app-task-item
    *ngFor="let task of tasks"
    [task]="task"
    (statusChanged)="handleStatusChange($event)"
    (taskDeleted)="handleTaskDeleted($event)"
    (taskSelected)="handleTaskSelected($event)">
  </app-task-item>
</div>
```

**Verificación**:
- ✅ La lista muestra todas las tareas
- ✅ Los eventos de los hijos se capturan correctamente
- ✅ Los console.log muestran los eventos

---

### Ejercicio 1.4: StatisticsCardComponent - Solo @Input

**Objetivo**: Componente de presentación que solo recibe datos.

**Ubicación**: `src/app/components/statistics-card/`

**Tareas**:
1. Crea un componente que reciba:
   - `@Input() title!: string;`
   - `@Input() value!: number;`
   - `@Input() color: string = 'blue';`
2. Muestra los datos con estilos de Tailwind

**Código**:
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  templateUrl: './statistics-card.component.html'
})
export class StatisticsCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() color: string = 'blue';
}
```

**HTML**:
```html
<div class="bg-white rounded-lg shadow p-6"
     [ngClass]="'border-l-4 border-' + color + '-500'">
  <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
  <p class="text-3xl font-bold mt-2" [ngClass]="'text-' + color + '-600'">
    {{ value }}
  </p>
</div>
```

**Uso**:
```html
<app-statistics-card
  title="Tareas Totales"
  [value]="10"
  color="blue">
</app-statistics-card>
```

---

## 📚 Nivel 2: Template-Driven Forms

### Ejercicio 2.1: Crear formulario de tarea

**Objetivo**: Implementar formulario con validaciones usando template-driven forms.

**Ubicación**: `src/app/components/task-form/`

**IMPORTANTE**: Debes importar `FormsModule` en tu componente standalone:

**Tareas**:
1. Importa `FormsModule` en el componente
2. Crea un objeto `taskForm` con los campos necesarios
3. Usa `ngModel` para two-way binding
4. Agrega validaciones HTML (required, minlength)
5. Usa template reference variables (`#taskFormRef="ngForm"`)

**Código**:
```typescript
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTaskDTO } from '../../models/task.model';
import { Priority, Category, Status } from '../../models/enums';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  @Input() teamMembers: any[] = [];
  @Output() taskSubmitted = new EventEmitter<CreateTaskDTO>();

  // Objeto del formulario
  taskForm = {
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    category: Category.FEATURE,
    status: Status.TODO,
    assignedToId: null,
    dueDate: ''
  };

  submitted = false;

  // Enums para el template
  priorities = Object.values(Priority);
  categories = Object.values(Category);
  statuses = Object.values(Status);

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.taskSubmitted.emit(this.taskForm);
      form.resetForm();
      this.submitted = false;
    }
  }
}
```

**HTML**:
```html
<form #taskFormRef="ngForm" (ngSubmit)="onSubmit(taskFormRef)" class="space-y-4">

  <!-- Título -->
  <div>
    <label class="block text-sm font-medium mb-1">Título *</label>
    <input
      type="text"
      name="title"
      [(ngModel)]="taskForm.title"
      #titleInput="ngModel"
      required
      minlength="3"
      class="w-full border rounded px-3 py-2"
      [class.border-red-500]="submitted && titleInput.invalid">

    <div *ngIf="submitted && titleInput.invalid" class="text-red-500 text-sm mt-1">
      <span *ngIf="titleInput.errors?.['required']">El título es requerido</span>
      <span *ngIf="titleInput.errors?.['minlength']">Mínimo 3 caracteres</span>
    </div>
  </div>

  <!-- Descripción -->
  <div>
    <label class="block text-sm font-medium mb-1">Descripción</label>
    <textarea
      name="description"
      [(ngModel)]="taskForm.description"
      rows="3"
      class="w-full border rounded px-3 py-2">
    </textarea>
  </div>

  <!-- Prioridad -->
  <div>
    <label class="block text-sm font-medium mb-1">Prioridad</label>
    <select
      name="priority"
      [(ngModel)]="taskForm.priority"
      class="w-full border rounded px-3 py-2">
      <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
    </select>
  </div>

  <!-- Categoría -->
  <div>
    <label class="block text-sm font-medium mb-1">Categoría</label>
    <select
      name="category"
      [(ngModel)]="taskForm.category"
      class="w-full border rounded px-3 py-2">
      <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
    </select>
  </div>

  <!-- Estado -->
  <div>
    <label class="block text-sm font-medium mb-1">Estado</label>
    <select
      name="status"
      [(ngModel)]="taskForm.status"
      class="w-full border rounded px-3 py-2">
      <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
    </select>
  </div>

  <!-- Asignado a -->
  <div>
    <label class="block text-sm font-medium mb-1">Asignado a</label>
    <select
      name="assignedToId"
      [(ngModel)]="taskForm.assignedToId"
      class="w-full border rounded px-3 py-2">
      <option [value]="null">Sin asignar</option>
      <option *ngFor="let member of teamMembers" [value]="member.id">
        {{ member.name }}
      </option>
    </select>
  </div>

  <!-- Fecha de vencimiento -->
  <div>
    <label class="block text-sm font-medium mb-1">Fecha de vencimiento</label>
    <input
      type="date"
      name="dueDate"
      [(ngModel)]="taskForm.dueDate"
      class="w-full border rounded px-3 py-2">
  </div>

  <!-- Botones -->
  <div class="flex gap-2">
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      [disabled]="submitted && taskFormRef.invalid">
      Guardar Tarea
    </button>

    <button
      type="button"
      (click)="taskFormRef.resetForm()"
      class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
      Limpiar
    </button>
  </div>

  <!-- Debug info -->
  <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
    <p>Form válido: {{ taskFormRef.valid }}</p>
    <p>Form enviado: {{ submitted }}</p>
  </div>
</form>
```

**Verificación**:
- ✅ El formulario captura datos correctamente
- ✅ Las validaciones funcionan
- ✅ El botón se deshabilita si hay errores
- ✅ El formulario se resetea después de enviar
- ✅ Se emite el evento con los datos

---

### Ejercicio 2.2: Validación personalizada de fechas

**Objetivo**: Validar que la fecha no sea en el pasado.

**Tareas**:
1. Agrega una validación personalizada para la fecha
2. Muestra error si la fecha es anterior a hoy
3. Muestra el mensaje de error solo si el campo fue tocado

**Código adicional**:
```typescript
isDateInPast(): boolean {
  if (!this.taskForm.dueDate) return false;
  const selected = new Date(this.taskForm.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}
```

**HTML adicional**:
```html
<input
  type="date"
  name="dueDate"
  [(ngModel)]="taskForm.dueDate"
  #dueDateInput="ngModel"
  class="w-full border rounded px-3 py-2"
  [class.border-red-500]="submitted && isDateInPast()">

<div *ngIf="submitted && isDateInPast()" class="text-red-500 text-sm mt-1">
  La fecha no puede ser en el pasado
</div>
```

---

## 📚 Nivel 3: HttpClient y Observables

### Ejercicio 3.1: TaskService - Implementar métodos HTTP

**Objetivo**: Crear servicio que haga peticiones HTTP al backend.

**Ubicación**: `src/app/services/task.service.ts`

Los modelos ya están creados en `src/app/models/`. Ahora implementa el servicio:

**Código completo**:
```typescript
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
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: CreateTaskDTO): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: UpdateTaskDTO): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  updateTaskStatus(id: number, status: Status): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStatistics(): Observable<TaskStatistics> {
    return this.http.get<TaskStatistics>(`${this.apiUrl}/statistics`);
  }
}
```

**Verificación**:
- ✅ El servicio se puede inyectar
- ✅ Los métodos retornan Observables
- ✅ TypeScript no muestra errores

---

### Ejercicio 3.2: Consumir Observables en componente

**Objetivo**: Cargar y mostrar datos desde el backend.

**Ubicación**: `src/app/pages/tasks/`

**Tareas**:
1. Inyecta `TaskService`
2. Crea propiedad `tasks: Task[] = []`
3. Crea propiedad `loading = false`
4. En `ngOnInit`, suscríbete a `getTasks()`
5. Maneja estados de loading y error
6. Usa `TaskListComponent` para mostrar las tareas

**Código**:
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = null;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las tareas';
        this.loading = false;
        console.error(err);
      },
      complete: () => {
        console.log('Carga de tareas completada');
      }
    });
  }
}
```

**HTML**:
```html
<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Lista de Tareas</h1>

  <!-- Loading -->
  <div *ngIf="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <p class="mt-2 text-gray-600">Cargando tareas...</p>
  </div>

  <!-- Error -->
  <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    {{ error }}
  </div>

  <!-- Lista de tareas -->
  <app-task-list
    *ngIf="!loading && !error"
    [tasks]="tasks">
  </app-task-list>

  <!-- Sin tareas -->
  <div *ngIf="!loading && !error && tasks.length === 0" class="text-center py-8">
    <p class="text-gray-500">No hay tareas disponibles</p>
  </div>
</div>
```

**Verificación**:
- ✅ Las tareas se cargan al iniciar
- ✅ Se muestra spinner mientras carga
- ✅ Los errores se manejan correctamente
- ✅ Las tareas se muestran en la lista

---

### Ejercicio 3.3: Operadores RxJS

**Objetivo**: Usar operadores para transformar y manejar Observables.

**Tareas**:
1. Importa operadores: `map`, `filter`, `tap`, `catchError`
2. Filtra tareas por estado
3. Transforma datos con `map`
4. Usa `tap` para logging
5. Maneja errores con `catchError`

**Código**:
```typescript
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// En tu componente
loadTasksByStatus(status: Status) {
  this.loading = true;

  this.taskService.getTasks().pipe(
    tap(tasks => console.log('Tareas recibidas:', tasks.length)),
    map(tasks => tasks.filter(t => t.status === status)),
    tap(filtered => console.log('Tareas filtradas:', filtered.length)),
    catchError(error => {
      console.error('Error:', error);
      return of([]); // Retorna array vacío en caso de error
    })
  ).subscribe({
    next: (tasks) => {
      this.tasks = tasks;
      this.loading = false;
    }
  });
}
```

**Otro ejemplo - Contar tareas por prioridad**:
```typescript
getTaskCountByPriority(priority: Priority) {
  return this.taskService.getTasks().pipe(
    map(tasks => tasks.filter(t => t.priority === priority)),
    map(tasks => tasks.length)
  ).subscribe(count => {
    console.log(`Tareas con prioridad ${priority}: ${count}`);
  });
}
```

**Verificación**:
- ✅ Los operadores transforman datos correctamente
- ✅ Los logs muestran el flujo de datos
- ✅ Los errores se manejan apropiadamente

---

### Ejercicio 3.4: Crear y eliminar tareas

**Objetivo**: Implementar operaciones de creación y eliminación.

**En TaskListComponent, actualiza los métodos**:
```typescript
import { inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

export class TaskListComponent {
  @Input() tasks: Task[] = [];
  private taskService = inject(TaskService);
  private router = inject(Router);

  handleStatusChange(event: {taskId: number, status: Status}) {
    this.taskService.updateTaskStatus(event.taskId, event.status)
      .subscribe({
        next: (updatedTask) => {
          // Actualizar la tarea en el array local
          const index = this.tasks.findIndex(t => t.id === event.taskId);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          console.log('Tarea actualizada:', updatedTask);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar la tarea');
        }
      });
  }

  handleTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        // Remover del array local
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        console.log('Tarea eliminada');
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar la tarea');
      }
    });
  }

  handleTaskSelected(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }
}
```

**En CreateTaskComponent**:
```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TeamService } from '../../services/team.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [TaskFormComponent],
  template: `
    <div class="container mx-auto p-4 max-w-2xl">
      <h1 class="text-3xl font-bold mb-6">Crear Nueva Tarea</h1>
      <app-task-form
        [teamMembers]="teamMembers"
        (taskSubmitted)="onTaskSubmitted($event)">
      </app-task-form>
    </div>
  `
})
export class CreateTaskComponent {
  private taskService = inject(TaskService);
  private teamService = inject(TeamService);
  private router = inject(Router);

  teamMembers: any[] = [];

  ngOnInit() {
    // Cargar miembros del equipo para el select
    this.teamService.getTeamMembers().subscribe({
      next: (members) => this.teamMembers = members
    });
  }

  onTaskSubmitted(taskData: any) {
    this.taskService.createTask(taskData).subscribe({
      next: (createdTask) => {
        console.log('Tarea creada:', createdTask);
        alert('¡Tarea creada exitosamente!');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
        alert('Error al crear la tarea');
      }
    });
  }
}
```

---

## 📚 Nivel 4: Subject y BehaviorSubject

### Ejercicio 4.1: StateService con BehaviorSubject

**Objetivo**: Compartir estado entre componentes sin relación padre-hijo.

**Ubicación**: `src/app/services/state.service.ts`

**Diferencia clave**:
- **BehaviorSubject**: Mantiene el último valor y lo emite a nuevos suscriptores inmediatamente
- **Subject**: Solo emite a suscriptores actuales, nuevos suscriptores no reciben valores anteriores

**Código completo**:
```typescript
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private taskService = inject(TaskService);

  // BehaviorSubject - mantiene el último valor
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  public selectedTask$ = this.selectedTaskSubject.asObservable();

  // Subject - solo emite a suscriptores actuales
  private taskCreatedSubject = new Subject<Task>();
  public taskCreated$ = this.taskCreatedSubject.asObservable();

  private taskUpdatedSubject = new Subject<Task>();
  public taskUpdated$ = this.taskUpdatedSubject.asObservable();

  private taskDeletedSubject = new Subject<number>();
  public taskDeleted$ = this.taskDeletedSubject.asObservable();

  constructor() {
    // Cargar tareas al iniciar el servicio
    this.loadTasks();
  }

  // Cargar tareas desde el backend
  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  // Obtener el valor actual sin suscribirse
  getCurrentTasks(): Task[] {
    return this.tasksSubject.value;
  }

  // Seleccionar una tarea
  selectTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  // Crear tarea y actualizar estado
  createTask(taskData: CreateTaskDTO): Observable<Task> {
    return this.taskService.createTask(taskData).pipe(
      tap(task => {
        // Agregar al array actual
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, task]);

        // Emitir evento
        this.taskCreatedSubject.next(task);
      })
    );
  }

  // Actualizar tarea
  updateTask(id: number, taskData: UpdateTaskDTO): Observable<Task> {
    return this.taskService.updateTask(id, taskData).pipe(
      tap(updatedTask => {
        // Actualizar en el array
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map(t =>
          t.id === id ? updatedTask : t
        );
        this.tasksSubject.next(updatedTasks);

        // Emitir evento
        this.taskUpdatedSubject.next(updatedTask);
      })
    );
  }

  // Eliminar tarea
  deleteTask(id: number): Observable<void> {
    return this.taskService.deleteTask(id).pipe(
      tap(() => {
        // Remover del array
        const currentTasks = this.tasksSubject.value;
        const filteredTasks = currentTasks.filter(t => t.id !== id);
        this.tasksSubject.next(filteredTasks);

        // Emitir evento
        this.taskDeletedSubject.next(id);
      })
    );
  }
}
```

**Uso en componentes**:
```typescript
import { StateService } from '../../services/state.service';

export class TasksComponent implements OnInit {
  private stateService = inject(StateService);
  tasks: Task[] = [];

  ngOnInit() {
    // Suscribirse al estado compartido
    this.stateService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
```

**Verificación**:
- ✅ Múltiples componentes pueden suscribirse
- ✅ Nuevos suscriptores reciben el último valor inmediatamente
- ✅ El estado se actualiza en todos los componentes

---

### Ejercicio 4.2: NotificationService con Subject

**Objetivo**: Sistema de notificaciones usando Subject.

**Ubicación**: `src/app/services/notification.service.ts`

**Código**:
```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Subject - solo emite a suscriptores actuales
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  success(message: string): void {
    this.notificationSubject.next({
      type: 'success',
      message,
      timestamp: new Date()
    });
  }

  error(message: string): void {
    this.notificationSubject.next({
      type: 'error',
      message,
      timestamp: new Date()
    });
  }

  info(message: string): void {
    this.notificationSubject.next({
      type: 'info',
      message,
      timestamp: new Date()
    });
  }

  warning(message: string): void {
    this.notificationSubject.next({
      type: 'warning',
      message,
      timestamp: new Date()
    });
  }
}
```

**Crear componente de notificaciones**:

```typescript
// src/app/components/notification/notification.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div *ngFor="let notification of notifications"
           class="px-4 py-3 rounded shadow-lg transition-all"
           [ngClass]="{
             'bg-green-500 text-white': notification.type === 'success',
             'bg-red-500 text-white': notification.type === 'error',
             'bg-blue-500 text-white': notification.type === 'info',
             'bg-yellow-500 text-white': notification.type === 'warning'
           }">
        {{ notification.message }}
      </div>
    </div>
  `
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  notifications: Notification[] = [];

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);

      // Auto-remover después de 3 segundos
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n !== notification);
      }, 3000);
    });
  }
}
```

**Uso**:
```typescript
// En cualquier componente
import { NotificationService } from '../../services/notification.service';

export class SomeComponent {
  private notificationService = inject(NotificationService);

  onTaskCreated() {
    this.stateService.createTask(data).subscribe({
      next: () => {
        this.notificationService.success('¡Tarea creada exitosamente!');
      },
      error: () => {
        this.notificationService.error('Error al crear la tarea');
      }
    });
  }
}
```

**Agregar en app.component.html**:
```html
<app-notification></app-notification>
<router-outlet></router-outlet>
```

---

### Ejercicio 4.3: Comunicación entre componentes desacoplados

**Objetivo**: Usar eventos (Subject) para comunicar componentes sin relación.

**Escenario**: Cuando se crea una tarea, actualizar las estadísticas del dashboard automáticamente.

**En HomeComponent**:
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TaskService } from '../../services/task.service';
import { TaskStatistics } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private stateService = inject(StateService);
  private taskService = inject(TaskService);

  statistics: TaskStatistics | null = null;

  ngOnInit() {
    this.loadStatistics();

    // Escuchar eventos de tareas creadas/eliminadas
    this.stateService.taskCreated$.subscribe(() => {
      console.log('Nueva tarea creada, actualizando estadísticas...');
      this.loadStatistics();
    });

    this.stateService.taskDeleted$.subscribe(() => {
      console.log('Tarea eliminada, actualizando estadísticas...');
      this.loadStatistics();
    });
  }

  loadStatistics() {
    this.taskService.getStatistics().subscribe(stats => {
      this.statistics = stats;
    });
  }
}
```

**HTML**:
```html
<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4" *ngIf="statistics">
    <app-statistics-card
      title="Total"
      [value]="statistics.total"
      color="blue">
    </app-statistics-card>

    <app-statistics-card
      title="Por Hacer"
      [value]="statistics.todo"
      color="gray">
    </app-statistics-card>

    <app-statistics-card
      title="En Progreso"
      [value]="statistics.inProgress"
      color="yellow">
    </app-statistics-card>

    <app-statistics-card
      title="Completadas"
      [value]="statistics.done"
      color="green">
    </app-statistics-card>
  </div>
</div>
```

**Verificación**:
- ✅ Las estadísticas se actualizan al crear una tarea
- ✅ Las estadísticas se actualizan al eliminar una tarea
- ✅ Los componentes no tienen referencia directa entre ellos

---

## 📚 Nivel 5: Routing y Navegación

### Ejercicio 5.1: Configurar rutas

**Ubicación**: `src/app/app.routes.ts`

**Código**:
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TeamComponent } from './pages/team/team.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/create', component: CreateTaskComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'team', component: TeamComponent },
  { path: '**', redirectTo: '' }
];
```

---

### Ejercicio 5.2: Navbar con navegación

**Ubicación**: `src/app/components/navbar/`

**Código**:
```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-bold">Task Manager</h1>

            <div class="flex space-x-4">
              <a routerLink="/"
                 routerLinkActive="bg-blue-700"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-3 py-2 rounded hover:bg-blue-700 transition">
                Dashboard
              </a>

              <a routerLink="/tasks"
                 routerLinkActive="bg-blue-700"
                 class="px-3 py-2 rounded hover:bg-blue-700 transition">
                Tareas
              </a>

              <a routerLink="/tasks/create"
                 routerLinkActive="bg-blue-700"
                 class="px-3 py-2 rounded hover:bg-blue-700 transition">
                Nueva Tarea
              </a>

              <a routerLink="/team"
                 routerLinkActive="bg-blue-700"
                 class="px-3 py-2 rounded hover:bg-blue-700 transition">
                Equipo
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
```

**En app.component.ts**:
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NotificationComponent],
  template: `
    <app-navbar></app-navbar>
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```

---

### Ejercicio 5.3: Vista de detalle con parámetros de ruta

**Ubicación**: `src/app/pages/task-detail/`

**Código**:
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  task: Task | null = null;
  loading = false;
  editMode = false;

  ngOnInit() {
    // Obtener ID de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  loadTask(id: number) {
    this.loading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Tarea no encontrada');
        this.router.navigate(['/tasks']);
      }
    });
  }

  onUpdateTask(taskData: any) {
    if (!this.task) return;

    this.taskService.updateTask(this.task.id, taskData).subscribe({
      next: (updated) => {
        this.task = updated;
        this.editMode = false;
        alert('Tarea actualizada exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar');
      }
    });
  }

  onDelete() {
    if (!this.task || !confirm('¿Eliminar esta tarea?')) return;

    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        alert('Tarea eliminada');
        this.router.navigate(['/tasks']);
      }
    });
  }
}
```

**HTML**:
```html
<div class="container mx-auto p-4 max-w-3xl">
  <div *ngIf="loading" class="text-center py-8">
    <p>Cargando...</p>
  </div>

  <div *ngIf="task && !editMode">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ task.title }}</h1>
      <div class="space-x-2">
        <button (click)="editMode = true"
                class="px-4 py-2 bg-blue-500 text-white rounded">
          Editar
        </button>
        <button (click)="onDelete()"
                class="px-4 py-2 bg-red-500 text-white rounded">
          Eliminar
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <h3 class="font-semibold text-gray-700">Descripción</h3>
        <p>{{ task.description || 'Sin descripción' }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold text-gray-700">Estado</h3>
          <span class="px-3 py-1 bg-blue-100 rounded">{{ task.status }}</span>
        </div>

        <div>
          <h3 class="font-semibold text-gray-700">Prioridad</h3>
          <span class="px-3 py-1 bg-yellow-100 rounded">{{ task.priority }}</span>
        </div>

        <div>
          <h3 class="font-semibold text-gray-700">Categoría</h3>
          <p>{{ task.category }}</p>
        </div>

        <div>
          <h3 class="font-semibold text-gray-700">Fecha límite</h3>
          <p>{{ task.dueDate || 'Sin fecha' }}</p>
        </div>
      </div>

      <div *ngIf="task.assignedTo">
        <h3 class="font-semibold text-gray-700">Asignado a</h3>
        <p>{{ task.assignedTo.name }}</p>
      </div>
    </div>
  </div>

  <!-- Modo edición -->
  <div *ngIf="editMode && task">
    <h1 class="text-3xl font-bold mb-6">Editar Tarea</h1>
    <app-task-form
      [task]="task"
      (taskSubmitted)="onUpdateTask($event)">
    </app-task-form>
    <button (click)="editMode = false"
            class="mt-4 px-4 py-2 bg-gray-300 rounded">
      Cancelar
    </button>
  </div>
</div>
```

---

## 📚 Nivel 6: Ejercicios Avanzados (Bonus)

### Ejercicio 6.1: Filtros reactivos

**Objetivo**: Crear filtros que actualicen la lista en tiempo real.

**TaskFiltersComponent**:
```typescript
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Status, Priority, Category } from '../../models/enums';

export interface TaskFilter {
  status: Status | null;
  priority: Priority | null;
  category: Category | null;
  searchText: string;
}

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow p-4 mb-4">
      <h3 class="font-semibold mb-3">Filtros</h3>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          [(ngModel)]="filters.searchText"
          (ngModelChange)="onFilterChange()"
          placeholder="Buscar..."
          class="border rounded px-3 py-2">

        <select [(ngModel)]="filters.status"
                (ngModelChange)="onFilterChange()"
                class="border rounded px-3 py-2">
          <option [value]="null">Todos los estados</option>
          <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
        </select>

        <select [(ngModel)]="filters.priority"
                (ngModelChange)="onFilterChange()"
                class="border rounded px-3 py-2">
          <option [value]="null">Todas las prioridades</option>
          <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
        </select>

        <select [(ngModel)]="filters.category"
                (ngModelChange)="onFilterChange()"
                class="border rounded px-3 py-2">
          <option [value]="null">Todas las categorías</option>
          <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
        </select>
      </div>
    </div>
  `
})
export class TaskFiltersComponent {
  @Output() filterChanged = new EventEmitter<TaskFilter>();

  filters: TaskFilter = {
    status: null,
    priority: null,
    category: null,
    searchText: ''
  };

  statuses = Object.values(Status);
  priorities = Object.values(Priority);
  categories = Object.values(Category);

  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }
}
```

**En TasksComponent**:
```typescript
filteredTasks: Task[] = [];

ngOnInit() {
  this.stateService.tasks$.subscribe(tasks => {
    this.tasks = tasks;
    this.filteredTasks = tasks;
  });
}

onFilterChange(filters: TaskFilter) {
  this.filteredTasks = this.tasks.filter(task => {
    // Filtro de búsqueda
    if (filters.searchText) {
      const search = filters.searchText.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Filtro de estado
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Filtro de prioridad
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Filtro de categoría
    if (filters.category && task.category !== filters.category) {
      return false;
    }

    return true;
  });
}
```

---

## ✅ Checklist de Verificación Final

Antes de tu examen, verifica que puedes hacer lo siguiente:

### @Input y @Output
- [ ] Pasar datos de padre a hijo con `@Input`
- [ ] Emitir eventos de hijo a padre con `@Output`
- [ ] Usar `EventEmitter` correctamente
- [ ] Capturar eventos en el padre

### Template-Driven Forms
- [ ] Importar `FormsModule`
- [ ] Usar `[(ngModel)]` para two-way binding
- [ ] Agregar validaciones (required, minlength, etc.)
- [ ] Mostrar mensajes de error condicionales
- [ ] Usar template reference variables (`#formRef="ngForm"`)
- [ ] Verificar estado del formulario (valid/invalid)
- [ ] Resetear formulario con `resetForm()`

### HttpClient y Observables
- [ ] Importar `HttpClient`
- [ ] Hacer peticiones GET, POST, PUT, DELETE
- [ ] Suscribirse a Observables con `subscribe()`
- [ ] Manejar next, error y complete
- [ ] Usar operadores: `map`, `filter`, `tap`, `catchError`
- [ ] Manejar errores con `catchError` y `of()`

### Subject y BehaviorSubject
- [ ] Crear `BehaviorSubject` con valor inicial
- [ ] Exponer como Observable con `asObservable()`
- [ ] Emitir valores con `next()`
- [ ] Obtener valor actual con `.value`
- [ ] Crear `Subject` para eventos
- [ ] Suscribirse a múltiples Subjects
- [ ] Entender la diferencia entre Subject y BehaviorSubject

### Routing
- [ ] Configurar rutas en `app.routes.ts`
- [ ] Usar `RouterLink` para navegación
- [ ] Obtener parámetros de ruta con `ActivatedRoute`
- [ ] Navegar programáticamente con `Router`
- [ ] Usar `routerLinkActive` para estilos

---

## 🎓 Consejos para el Examen

1. **@Input/@Output**: Recuerda que los decoradores van ANTES de la propiedad
2. **FormsModule**: Si el formulario no funciona, verifica que importaste FormsModule
3. **Observables**: SIEMPRE debes suscribirte para que se ejecute la petición
4. **BehaviorSubject vs Subject**:
   - BehaviorSubject = estado (mantiene valor)
   - Subject = eventos (no mantiene valor)
5. **Standalone components**: En Angular 19, los componentes son standalone por defecto, importa lo que necesites
6. **CORS**: Si hay error de CORS, verifica que el backend esté corriendo

---

## 🚀 Comandos Útiles

```bash
# Iniciar backend
cd be && ./mvnw spring-boot:run

# Iniciar frontend
cd fe/angular-tasks && ng serve

# Generar componente
ng g c components/nombre

# Generar servicio
ng g s services/nombre

# Build para producción
ng build --configuration production
```

---

## 📖 Endpoints del API para Practicar

```
GET    http://localhost:8080/api/tasks
GET    http://localhost:8080/api/tasks/1
POST   http://localhost:8080/api/tasks
PUT    http://localhost:8080/api/tasks/1
PATCH  http://localhost:8080/api/tasks/1/status
DELETE http://localhost:8080/api/tasks/1
GET    http://localhost:8080/api/tasks/statistics

GET    http://localhost:8080/api/team-members
```

---

¡Éxito en tu examen! 🎉
