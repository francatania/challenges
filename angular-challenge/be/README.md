# Task Manager API - Backend Spring Boot

Backend RESTful API para el sistema de gestión de tareas, diseñado para practicar conceptos de Angular.

## Tecnologías

- **Spring Boot 3.2.2**
- **Java 17**
- **H2 Database** (en memoria)
- **Spring Data JPA**
- **Lombok**

## Configuración

### Base de Datos H2

La aplicación utiliza H2 en memoria. La configuración está en `application.properties`:

```properties
spring.datasource.url=jdbc:h2:mem:taskdb
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

**Acceder a H2 Console:**
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Usuario: `sa`
- Contraseña: *(vacío)*

## Ejecutar el Proyecto

### Con Maven instalado:
```bash
mvn spring-boot:run
```

### Con Maven Wrapper (Windows):
```bash
./mvnw.cmd spring-boot:run
```

### Con Maven Wrapper (Linux/Mac):
```bash
./mvnw spring-boot:run
```

El servidor estará disponible en: http://localhost:8080

## API Endpoints

### Tasks

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| GET | `/api/tasks?status=TODO` | Filtrar tareas por estado |
| GET | `/api/tasks/{id}` | Obtener tarea por ID |
| POST | `/api/tasks` | Crear nueva tarea |
| PUT | `/api/tasks/{id}` | Actualizar tarea completa |
| PATCH | `/api/tasks/{id}/status` | Actualizar solo el estado |
| DELETE | `/api/tasks/{id}` | Eliminar tarea |
| GET | `/api/tasks/statistics` | Obtener estadísticas |

### Team Members

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/team-members` | Obtener todos los miembros |
| GET | `/api/team-members/{id}` | Obtener miembro por ID |
| POST | `/api/team-members` | Crear nuevo miembro |
| PUT | `/api/team-members/{id}` | Actualizar miembro |
| DELETE | `/api/team-members/{id}` | Eliminar miembro |
| GET | `/api/team-members/{id}/tasks` | Tareas asignadas a miembro |

### Comments

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks/{taskId}/comments` | Obtener comentarios de tarea |
| POST | `/api/tasks/{taskId}/comments` | Agregar comentario |
| DELETE | `/api/comments/{id}` | Eliminar comentario |

## Ejemplos de Uso

### Crear una tarea

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "status": "TODO",
    "priority": "HIGH",
    "category": "FEATURE",
    "assignedToId": 1,
    "dueDate": "2026-02-20"
  }'
```

### Actualizar estado de tarea

```bash
curl -X PATCH http://localhost:8080/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```

## Datos de Ejemplo

Al iniciar la aplicación, se crean automáticamente:
- **5 miembros del equipo** (María, Carlos, Ana, Juan, Laura)
- **10 tareas** con diferentes estados, prioridades y categorías

## Modelos

### Task
- `id`: Long
- `title`: String (requerido)
- `description`: String
- `status`: Status (TODO, IN_PROGRESS, IN_REVIEW, DONE)
- `priority`: Priority (LOW, MEDIUM, HIGH, URGENT)
- `category`: Category (FEATURE, BUG, DOCUMENTATION, TESTING, REFACTORING)
- `assignedTo`: TeamMember
- `dueDate`: LocalDate
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime
- `comments`: List<Comment>

### TeamMember
- `id`: Long
- `name`: String (requerido)
- `email`: String (email válido)
- `role`: String
- `avatar`: String (URL)

### Comment
- `id`: Long
- `content`: String (requerido)
- `task`: Task
- `author`: TeamMember
- `createdAt`: LocalDateTime

## CORS

La aplicación está configurada para aceptar peticiones desde:
- `http://localhost:4200` (Angular)

## Notas

- La base de datos H2 es **en memoria**, los datos se pierden al reiniciar
- Los datos de ejemplo se crean automáticamente en cada inicio
- Los logs SQL están habilitados para ver las queries ejecutadas
