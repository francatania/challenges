# Parcial Práctico — Spring Boot REST API
## Sistema de Gestión de Proyectos de Software

---

### Contexto

Una empresa de desarrollo de software necesita una API REST para gestionar internamente sus proyectos, equipos y tareas. El sistema debe permitir administrar desarrolladores con sus tecnologías dominadas, asignarlos a proyectos, organizar el trabajo en sprints y tareas, y consultar el estado del trabajo de distintas formas.

Tu trabajo es implementar esta API siguiendo una arquitectura en capas estricta: **Controller → Service → Repository**.

---

### Instrucciones Generales

- El proyecto ya tiene configurado Spring Boot con las dependencias necesarias (JPA, Validation, H2, Lombok).
- Todas las respuestas de la API deben ser en formato JSON.
- No se permite lógica de negocio en los controladores ni en los repositorios.
- El uso de colecciones (`HashMap`, `ArrayList`, `TreeSet`) es **obligatorio** donde se indica. No se aceptan alternativas sin justificación.
- Los DTOs deben ser clases separadas de las entidades. Nunca expongas una entidad directamente en una respuesta de API.
- Seguí la estructura de paquetes sugerida.

---

## Estructura de Paquetes Sugerida

```
com.example.demo
├── controller
│   ├── DesarrolladorController
│   ├── ProyectoController
│   ├── TareaController
│   └── advice
│       └── GlobalExceptionHandler
├── service
│   ├── DesarrolladorService
│   ├── ProyectoService
│   └── TareaService
├── repository
│   ├── DesarrolladorRepository
│   ├── ProyectoRepository
│   ├── TareaRepository
│   ├── TecnologiaRepository
│   └── SprintRepository
├── model
│   ├── entity
│   │   ├── Desarrollador
│   │   ├── Proyecto
│   │   ├── Tarea
│   │   ├── Tecnologia
│   │   └── Sprint
│   └── enums
│       ├── NivelDesarrollador
│       ├── EstadoProyecto
│       ├── PrioridadTarea
│       └── EstadoTarea
├── dto
│   ├── request
│   │   ├── DesarrolladorRequestDTO
│   │   ├── ProyectoRequestDTO
│   │   └── TareaRequestDTO
│   └── response
│       ├── DesarrolladorResponseDTO
│       ├── ProyectoResponseDTO
│       ├── TareaResponseDTO
│       └── ResumenProyectoDTO
└── exception
    ├── RecursoNoEncontradoException
    └── NegocioException
```

---

## Sección A — Configuración `(1 punto)`

Configurá el archivo `application.properties` para que:

1. La base de datos H2 en memoria tenga el nombre `gestion_proyectos`.
2. La consola web de H2 esté habilitada y accesible desde el path `/h2-console`.
3. JPA cree y actualice el esquema automáticamente en cada arranque.
4. Se impriman las queries SQL en la consola con formato legible.
5. El puerto de la aplicación sea `8080`.

---

## Sección B — Modelado de Entidades JPA `(3 puntos)`

### B.1 — Enums

Definí los siguientes enums como tipos Java independientes (no como clases anidadas):

- `NivelDesarrollador`: valores `JUNIOR`, `SEMI_SENIOR`, `SENIOR`
- `EstadoProyecto`: valores `ACTIVO`, `FINALIZADO`, `PAUSADO`
- `PrioridadTarea`: valores `BAJA`, `MEDIA`, `ALTA`, `CRITICA`
- `EstadoTarea`: valores `PENDIENTE`, `EN_PROGRESO`, `COMPLETADA`

Todos los enums deben persistirse como `String` en la base de datos, no como número ordinal.

---

### B.2 — Entidades

Creá las siguientes entidades JPA con Lombok. Asegurate de definir correctamente las restricciones de columna (`nullable`, `length`, `unique`) donde corresponda.

#### `Desarrollador`
- `id`: clave primaria autogenerada
- `nombre`: obligatorio, máximo 100 caracteres
- `apellido`: obligatorio, máximo 100 caracteres
- `email`: obligatorio, único, máximo 150 caracteres
- `nivel`: enum `NivelDesarrollador`, obligatorio
- `activo`: booleano, valor por defecto `true`
- `tecnologias`: colección de tecnologías que domina — relación a definir

#### `Proyecto`
- `id`: clave primaria autogenerada
- `nombre`: obligatorio, único, máximo 150 caracteres
- `descripcion`: texto libre, nullable
- `fechaInicio`: fecha, obligatoria
- `fechaFin`: fecha, nullable
- `estado`: enum `EstadoProyecto`, valor por defecto `ACTIVO`
- `desarrolladores`: equipo del proyecto — relación a definir
- `sprints`: sprints del proyecto — relación a definir

#### `Sprint`
- `id`: clave primaria autogenerada
- `numero`: entero positivo, obligatorio
- `fechaInicio`: fecha, obligatoria
- `fechaFin`: fecha, obligatoria
- `objetivo`: texto, máximo 255 caracteres
- `proyecto`: proyecto al que pertenece — relación a definir
- `tareas`: tareas del sprint — relación a definir

#### `Tarea`
- `id`: clave primaria autogenerada
- `titulo`: obligatorio, máximo 200 caracteres
- `descripcion`: texto libre, nullable
- `prioridad`: enum `PrioridadTarea`, obligatorio
- `estado`: enum `EstadoTarea`, valor por defecto `PENDIENTE`
- `sprint`: sprint al que pertenece — relación a definir
- `desarrolladorAsignado`: el desarrollador responsable de la tarea — relación a definir (puede ser null)

#### `Tecnologia`
- `id`: clave primaria autogenerada
- `nombre`: obligatorio, único, máximo 100 caracteres
- `version`: máximo 20 caracteres, nullable

La entidad `Tecnologia` debe implementar `Comparable<Tecnologia>` para poder ser usada en un `TreeSet`. El orden natural debe ser alfabético por nombre (ignorando mayúsculas/minúsculas).

---

### B.3 — Relaciones entre Entidades

Definí explícitamente cada relación con sus anotaciones JPA y justificá el tipo elegido:

| Relación | Tipo | Detalles |
|---|---|---|
| `Desarrollador` ↔ `Tecnologia` | ManyToMany | Tabla intermedia `desarrollador_tecnologia`. Fetch LAZY. |
| `Proyecto` ↔ `Desarrollador` | ManyToMany | Tabla intermedia `proyecto_desarrollador`. Fetch LAZY. |
| `Proyecto` → `Sprint` | OneToMany | Cascade ALL. Si se elimina el proyecto, se eliminan sus sprints. Fetch LAZY. |
| `Sprint` → `Tarea` | OneToMany | Cascade ALL. Fetch LAZY. |
| `Tarea` → `Desarrollador` | ManyToOne | El campo `desarrolladorAsignado` puede ser null. Fetch EAGER. |

> **Importante:** en las relaciones bidireccionales, identificá correctamente cuál es el lado dueño (`mappedBy`) y cuál tiene la clave foránea.

---

## Sección C — Repositorios y Consultas `(3 puntos)`

Creá una interfaz `JpaRepository` para cada entidad. Las consultas deben implementarse usando **métodos derivados de JPA** cuando sea posible, y `@Query` solo cuando la complejidad lo requiera. Para las consultas con `@Query`, indicá si usás JPQL o SQL nativo.

### C.1 — `DesarrolladorRepository`

1. Encontrar todos los desarrolladores activos de un nivel específico. *(método derivado)*
2. Buscar un desarrollador por email (ignorando mayúsculas/minúsculas). *(método derivado)*
3. Encontrar todos los desarrolladores que están asignados a un proyecto dado (por id de proyecto). *(`@Query` JPQL — usar JOIN explícito)*

### C.2 — `ProyectoRepository`

4. Listar todos los proyectos en un estado determinado, ordenados por `fechaInicio` descendente. *(método derivado)*
5. Buscar proyectos cuyo nombre contenga un texto dado (búsqueda parcial, case-insensitive). *(método derivado)*

### C.3 — `TareaRepository`

6. Contar cuántas tareas existen por cada estado dentro de un sprint dado. El resultado debe ser una lista de arrays u objetos con `estado` y `cantidad`. *(`@Query` SQL nativo — requiere `GROUP BY`)*
7. Encontrar todas las tareas con prioridad `CRITICA` o `ALTA` que aún están `PENDIENTE`, ordenadas por prioridad descendente. *(`@Query` JPQL — el orden por enum no es predecible con métodos derivados)*
8. Buscar todas las tareas asignadas a un desarrollador específico (por id), filtradas por estado. *(método derivado — navegación con `_`)*

> **Referencia rápida de métodos derivados usados:**
> - `findByActivoTrueAndNivel(...)` — combina campo booleano fijo y parámetro
> - `findByEmailIgnoreCase(...)` — búsqueda case-insensitive exacta
> - `findByEstadoOrderByFechaInicioDesc(...)` — filtro + orden
> - `findByNombreContainingIgnoreCase(...)` — búsqueda parcial case-insensitive
> - `findByDesarrolladorAsignado_IdAndEstado(...)` — navegación de relación con `_`

---

## Sección D — DTOs y Validaciones `(2 puntos)`

### D.1 — DTOs de Request

Creá los siguientes DTOs para recibir datos del cliente. Aplicá las anotaciones de validación de Bean Validation correspondientes a cada campo.

#### `DesarrolladorRequestDTO`
- `nombre`: no vacío, entre 2 y 100 caracteres
- `apellido`: no vacío, entre 2 y 100 caracteres
- `email`: no vacío, formato de email válido
- `nivel`: no nulo, debe ser uno de los valores del enum `NivelDesarrollador`
- `tecnologiaIds`: lista de ids de tecnologías, puede estar vacía pero no ser null

#### `ProyectoRequestDTO`
- `nombre`: no vacío, máximo 150 caracteres
- `descripcion`: opcional, máximo 500 caracteres
- `fechaInicio`: no nula, debe ser una fecha presente o futura
- `fechaFin`: opcional, si se indica debe ser posterior a `fechaInicio` *(validación a nivel de clase, usá `@AssertTrue` o una anotación personalizada)*
- `estado`: no nulo
- `desarrolladorIds`: lista de ids, no nula, debe tener al menos 1 elemento

#### `TareaRequestDTO`
- `titulo`: no vacío, entre 5 y 200 caracteres
- `descripcion`: opcional
- `prioridad`: no nula
- `sprintId`: no nulo, debe ser un entero positivo
- `desarrolladorAsignadoId`: opcional (Long)

---

### D.2 — DTOs de Response

Los DTOs de respuesta deben ser clases simples con los campos necesarios para representar el recurso sin exponer la entidad. Diseñá los siguientes:

- `DesarrolladorResponseDTO`: incluye id, nombre completo (nombre + apellido como un solo campo), email, nivel, activo, y el conjunto de nombres de tecnologías ordenado alfabéticamente.
- `ProyectoResponseDTO`: incluye id, nombre, descripcion, fechaInicio, fechaFin, estado, cantidad de desarrolladores y cantidad de sprints.
- `TareaResponseDTO`: incluye id, titulo, prioridad, estado, nombre del sprint (número + objetivo), y nombre completo del desarrollador asignado (o null si no tiene).
- `ResumenProyectoDTO`: incluye id del proyecto, nombre, y un `Map<String, Long>` con la cantidad de tareas por estado.

---

## Sección E — Capa de Servicio `(4 puntos)`

### E.1 — `DesarrolladorService`

Implementá los siguientes métodos:

- Crear un nuevo desarrollador a partir de un `DesarrolladorRequestDTO`. Si el email ya existe, lanzar una excepción de negocio.
- Obtener un desarrollador por id. Si no existe, lanzar `RecursoNoEncontradoException`.
- Actualizar los datos de un desarrollador existente.
- Listar todos los desarrolladores activos de un nivel dado.
- **[TreeSet]** Obtener las tecnologías de un desarrollador ordenadas alfabéticamente. Internamente, el servicio debe cargar las tecnologías y almacenarlas en un `TreeSet<Tecnologia>` antes de mapearlas al DTO de respuesta.

---

### E.2 — `ProyectoService`

Implementá los siguientes métodos:

- Crear un proyecto nuevo asignando los desarrolladores indicados en el DTO.
- Agregar un desarrollador existente a un proyecto existente.
- Cambiar el estado de un proyecto (validar transiciones permitidas: no se puede pasar de `FINALIZADO` a `ACTIVO`).
- **[HashMap + ArrayList]** Obtener el resumen de tareas de un proyecto: el método debe recorrer todos los sprints del proyecto, recopilar las tareas en un `ArrayList<Tarea>`, y luego agruparlas en un `HashMap<String, Long>` donde la clave es el nombre del estado y el valor es la cantidad de tareas en ese estado. Retornar un `ResumenProyectoDTO`.
- **[HashMap]** Listar todos los proyectos agrupados por estado: retornar un `Map<String, List<ProyectoResponseDTO>>` donde la clave es el nombre del estado.

---

### E.3 — `TareaService`

Implementá los siguientes métodos:

- Crear una tarea dentro de un sprint. Validar que el sprint existe y que el desarrollador asignado (si se especifica) pertenece al proyecto del sprint.
- Cambiar el estado de una tarea. Validar que la transición sea válida (`PENDIENTE → EN_PROGRESO → COMPLETADA`; no se puede retroceder).
- Reasignar una tarea a otro desarrollador. El nuevo desarrollador debe pertenecer al proyecto.
- **[HashMap]** Obtener todas las tareas de un sprint agrupadas por prioridad: retornar un `Map<String, List<TareaResponseDTO>>`.
- Obtener todas las tareas de prioridad crítica o alta pendientes, ordenadas por prioridad.

---

## Sección F — Controladores REST `(3 puntos)`

### F.1 — Endpoints

Implementá los siguientes endpoints. Usá `@Valid` para validar los DTOs de entrada. Los controladores solo deben delegar en el service y mapear la respuesta al status HTTP correcto.

#### `DesarrolladorController` — base: `/api/desarrolladores`

| Método | Ruta | Descripción | Status esperado |
|---|---|---|---|
| POST | `/api/desarrolladores` | Crear un desarrollador | 201 Created |
| GET | `/api/desarrolladores/{id}` | Obtener un desarrollador por id | 200 OK |
| PUT | `/api/desarrolladores/{id}` | Actualizar un desarrollador | 200 OK |
| GET | `/api/desarrolladores` | Listar por nivel (query param `nivel`) | 200 OK |
| GET | `/api/desarrolladores/{id}/tecnologias` | Tecnologías ordenadas del desarrollador | 200 OK |

#### `ProyectoController` — base: `/api/proyectos`

| Método | Ruta | Descripción | Status esperado |
|---|---|---|---|
| POST | `/api/proyectos` | Crear un proyecto | 201 Created |
| GET | `/api/proyectos/{id}` | Obtener un proyecto por id | 200 OK |
| POST | `/api/proyectos/{id}/desarrolladores/{devId}` | Agregar un desarrollador al proyecto | 200 OK |
| PATCH | `/api/proyectos/{id}/estado` | Cambiar el estado del proyecto (body: nuevo estado) | 200 OK |
| GET | `/api/proyectos/{id}/resumen` | Obtener resumen de tareas del proyecto | 200 OK |
| GET | `/api/proyectos/agrupados` | Listar proyectos agrupados por estado | 200 OK |

#### `TareaController` — base: `/api/tareas`

| Método | Ruta | Descripción | Status esperado |
|---|---|---|---|
| POST | `/api/tareas` | Crear una tarea en un sprint | 201 Created |
| PATCH | `/api/tareas/{id}/estado` | Cambiar el estado de una tarea | 200 OK |
| PATCH | `/api/tareas/{id}/asignar/{devId}` | Reasignar la tarea a otro desarrollador | 200 OK |
| GET | `/api/tareas/sprint/{sprintId}/por-prioridad` | Tareas del sprint agrupadas por prioridad | 200 OK |
| GET | `/api/tareas/criticas` | Tareas críticas/altas pendientes | 200 OK |

---

### F.2 — Manejo de Excepciones

Creá un `@RestControllerAdvice` (clase `GlobalExceptionHandler`) que maneje:

- `RecursoNoEncontradoException` → responder con status **404** y un cuerpo JSON con `mensaje` y `timestamp`.
- `NegocioException` → responder con status **400** y el mismo formato.
- `MethodArgumentNotValidException` → responder con status **422** e incluir en el cuerpo un `Map<String, String>` con el nombre de cada campo inválido y su mensaje de error.
- Cualquier otra excepción no controlada → responder con status **500** y un mensaje genérico.

---

## Criterios de Evaluación

| Sección | Puntos |
|---|---|
| A — Configuración | 1 |
| B — Entidades JPA y relaciones | 3 |
| C — Repositorios, métodos derivados y @Query | 3 |
| D — DTOs y validaciones | 2 |
| E — Capa de servicio y colecciones | 4 |
| F — Controladores y manejo de errores | 3 |
| **Total** | **16** |

**Aprobado:** 10 puntos o más.

---

## Restricciones

- No se permite inyectar repositorios directamente en los controladores.
- No se permite usar listas de entidades como respuesta directa de los endpoints (siempre DTOs).
- Las colecciones `HashMap`, `ArrayList` y `TreeSet` deben usarse donde se indican explícitamente; reemplazarlas por otras sin justificación escrita descuenta puntos.
- No se permite usar `@Transactional` en los controladores.
- El uso de `Optional` en los servicios es obligatorio al obtener entidades por id; no se aceptan llamadas `.get()` sin verificar presencia.
- Las consultas con `@Query` deben estar en los repositorios, no en los servicios.

---

*Tiempo estimado de desarrollo: entre 4 y 6 horas.*
