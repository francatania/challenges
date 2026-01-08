# Challenge Técnico React - Gestión de Tareas con Equipos

## 📋 Contexto

Sos parte del equipo de desarrollo de **TaskFlow**, una aplicación de gestión de tareas colaborativa. Tu objetivo es construir un módulo que permita a los usuarios crear tareas, asignarlas a diferentes equipos y visualizar el estado de cada una.

---

## 🎯 Requerimientos Funcionales

### 1. Navegación y Rutas
- Implementar React Router con las siguientes rutas:
  - **`/`** - Dashboard con listado de tareas, filtros y estadísticas
  - **`/new-task`** - Formulario para crear nueva tarea
  - **`/task/:id`** - Vista detallada de una tarea específica
  - **`*`** - Página 404 para rutas no encontradas
- Incluir un navbar/header con links para navegar entre vistas
- Usar navegación programática después de crear una tarea (redirect a `/`)

### 2. Dashboard (Ruta `/`)
- Mostrar una lista de todas las tareas existentes
- Cada tarea debe mostrar:
  - Título
  - Descripción (truncada si es muy larga)
  - Equipo asignado
  - Estado (Pendiente, En Progreso, Completada)
  - Fecha de creación
  - Botón/link para ver detalle
- Filtros de tareas por equipo (opción "Todos los equipos")
- Panel de estadísticas globales:
  - Total de tareas
  - Tareas pendientes
  - Tareas en progreso
  - Tareas completadas
- Botón destacado "Nueva Tarea" que redirija a `/new-task`

### 3. Formulario de Creación (Ruta `/new-task`)
- Formulario para crear nuevas tareas con los siguientes campos:
  - **Título** (requerido, máximo 50 caracteres)
  - **Descripción** (requerido, máximo 200 caracteres)
  - **Equipo** (selección desde una lista de equipos disponibles)
  - **Estado** (selección: Pendiente, En Progreso, Completada)
- Validar el formulario antes de permitir el envío
- Mostrar mensajes de error claros para cada campo
- Al crear exitosamente, redireccionar al dashboard (`/`)
- Botón "Cancelar" que vuelva al dashboard

### 4. Vista Detallada de Tarea (Ruta `/task/:id`)
- Mostrar toda la información de la tarea:
  - Título
  - Descripción completa
  - Equipo asignado (nombre del equipo, no solo ID)
  - Estado actual
  - Fecha de creación (formateada de forma legible)
- Botón "Volver" que regrese al dashboard
- (Plus) Botón "Eliminar" que borre la tarea y redirija al dashboard

### 5. Carga de Datos Inicial
- Cargar la lista de equipos desde un archivo JSON local o mock
- Cargar tareas iniciales (pueden ser datos hardcodeados inicialmente)
- Mostrar un estado de "Cargando..." mientras se obtienen los datos

---

## 🛠️ Requerimientos Técnicos

### Obligatorios

1. **React + TypeScript**
   - Todo el código debe estar tipado correctamente
   - No usar `any` (salvo casos muy justificados)

2. **React Router**
   - Instalar y configurar `react-router-dom`
   - Usar `BrowserRouter`, `Routes`, `Route`
   - Implementar navegación con `useNavigate` o `<Link>`
   - Usar `useParams` para obtener parámetros de ruta (`:id`)

3. **Hooks Requeridos**
   - `useState` para el manejo de estado local (formulario, filtros)
   - `useEffect` para la carga inicial de datos
   - `useContext` para compartir el estado global de tareas entre componentes
   - `useNavigate` para navegación programática
   - `useParams` para obtener el ID de la tarea en la ruta dinámica

4. **Context API**
   - Crear un `TaskContext` que provea:
     - Lista de tareas
     - Función para agregar tareas
     - Función para obtener tarea por ID
     - Lista de equipos disponibles
   - Envolver la aplicación con el Provider correspondiente

5. **Formularios Controlados**
   - Todos los inputs deben ser controlados (value + onChange)
   - Implementar validaciones en tiempo real

6. **Componentización**
   - Separar la UI en componentes reutilizables y con responsabilidad única
   - Evitar componentes de más de 150 líneas
   - Crear páginas/vistas separadas para cada ruta

7. **Datos Mock**
   - Crear un archivo `/src/data/teams.json` con al menos 4 equipos:
     ```json
     [
       { "id": 1, "name": "Frontend" },
       { "id": 2, "name": "Backend" },
       { "id": 3, "name": "DevOps" },
       { "id": 4, "name": "QA" }
     ]
     ```
   - Crear un archivo `/src/data/tasks.json` con tareas precargadas:
     ```json
     [
       {
         "id": 1,
         "title": "Implementar login",
         "description": "Crear formulario de autenticación con validaciones",
         "teamId": 1,
         "status": "En Progreso",
         "createdAt": "2026-01-05T10:30:00Z"
       },
       {
         "id": 2,
         "title": "Configurar base de datos",
         "description": "Setup inicial de PostgreSQL y migraciones",
         "teamId": 2,
         "status": "Completada",
         "createdAt": "2026-01-04T09:15:00Z"
       },
       {
         "id": 3,
         "title": "Configurar CI/CD",
         "description": "Implementar pipeline de deploy automático",
         "teamId": 3,
         "status": "Pendiente",
         "createdAt": "2026-01-06T14:20:00Z"
       },
       {
         "id": 4,
         "title": "Testing de integración",
         "description": "Escribir tests E2E para flujo principal",
         "teamId": 4,
         "status": "En Progreso",
         "createdAt": "2026-01-07T11:00:00Z"
       },
       {
         "id": 5,
         "title": "Optimizar bundle size",
         "description": "Reducir tamaño del bundle usando code splitting",
         "teamId": 1,
         "status": "Pendiente",
         "createdAt": "2026-01-08T08:45:00Z"
       }
     ]
     ```
   - Simular llamadas asíncronas (setTimeout de 500-1000ms) para cargar equipos y tareas
   - Mostrar un indicador de "Cargando..." durante la carga inicial

### Deseables (Plus)

- Agregar función de eliminar tareas en la vista detallada
- Persistir las tareas en `localStorage`
- Agregar CSS/estilos básicos para una mejor UX (puede ser CSS puro, CSS modules, o styled-components)
- Ordenar tareas por fecha de creación (más recientes primero)
- Implementar breadcrumbs en la navegación
- Agregar una página 404 personalizada con link al dashboard

---

## 📂 Estructura de Carpetas Sugerida

```
src/
├── components/
│   ├── Navbar.tsx             # Navegación principal con Links
│   ├── TaskList.tsx           # Lista de tareas (reutilizable)
│   ├── TaskItem.tsx           # Componente individual de tarea en lista
│   ├── TaskFilter.tsx         # Selector de filtro por equipo
│   └── TaskStats.tsx          # Panel de estadísticas
├── pages/
│   ├── Dashboard.tsx          # Página principal (ruta /)
│   ├── NewTask.tsx            # Página con formulario (ruta /new-task)
│   ├── TaskDetail.tsx         # Página de detalle (ruta /task/:id)
│   └── NotFound.tsx           # Página 404
├── context/
│   └── TaskContext.tsx        # Context + Provider
├── types/
│   └── index.ts               # Definición de tipos (Task, Team, TaskStatus)
├── data/
│   ├── teams.json             # Datos mock de equipos
│   └── tasks.json             # Datos mock de tareas
├── hooks/                     # Custom hooks
│   └── useTasks.ts            # Hook para consumir TaskContext
├── App.tsx                    # Configuración de rutas
└── main.tsx                   # Entry point con Provider y Router
```

---

## 🔍 Qué se Evalúa

### 1. **Conocimiento de React (30%)**
- Uso correcto de hooks (useState, useEffect, useContext, useNavigate, useParams)
- Correcta implementación de Context API
- Formularios controlados y manejo de eventos
- Ciclo de vida con useEffect

### 2. **React Router (15%)**
- Configuración correcta de rutas
- Uso apropiado de `Link` y `useNavigate`
- Implementación correcta de rutas dinámicas con parámetros
- Manejo de rutas no encontradas (404)

### 3. **TypeScript (15%)**
- Tipado de props, estados y funciones
- Interfaces/Types bien definidos
- Uso de tipos genéricos cuando corresponda

### 4. **Programación Funcional (20%)**
- Uso de métodos funcionales: `map`, `filter`, `reduce`
- **Inmutabilidad**: No mutar arrays/objetos directamente (usar spread operator, métodos inmutables)
- Evitar bucles `for`/`while` en favor de métodos de arrays
- Funciones puras cuando sea posible
- Ejemplos esperados:
  - Filtrar tareas por equipo usando `.filter()`
  - Calcular estadísticas usando `.reduce()` o combinaciones de `.filter()` + `.length`
  - Renderizar listas con `.map()`
  - Agregar tareas sin mutar el estado: `[...tasks, newTask]`

### 5. **Arquitectura y Buenas Prácticas (10%)**
- Componentización clara y lógica
- Separación entre componentes y páginas
- Código limpio y legible
- Nombres descriptivos

### 6. **Funcionalidad (10%)**
- Cumplimiento de todos los requerimientos funcionales
- Navegación funciona correctamente
- Manejo correcto de estados
- Validaciones funcionando correctamente

---

## ⏱️ Tiempo Estimado

**3 a 4 horas** para completar todos los requerimientos obligatorios (incluye setup de routing y páginas adicionales).

---

## 📝 Instrucciones de Entrega

1. Instalar React Router: `npm install react-router-dom`
2. El proyecto debe correr con `npm run dev` sin errores
3. Todas las rutas deben ser navegables
4. El código debe pasar el linter (`npm run lint`) sin errores críticos
5. Incluir un README.md con:
   - Instrucciones para correr el proyecto
   - Decisiones técnicas tomadas
   - Plus implementados (si los hay)
   - Rutas disponibles en la aplicación

---

## 💡 Consejos

- Comenzá por definir los tipos en `/src/types/index.ts`
- Luego creá el Context antes de hacer los componentes
- Configurá el routing básico antes de crear las páginas
- Empezá por la página Dashboard (más simple) antes de TaskDetail
- Hacé commits regulares mientras trabajás
- No te preocupes por el diseño visual, enfocate en la funcionalidad
- Si te trabás, dejá comentarios explicando el problema
- Probá cada ruta individualmente antes de continuar

---

## ❌ Lo que NO se evaluará

- Diseño visual elaborado (CSS avanzado)
- Animaciones
- Responsive design perfecto
- Testing (no es necesario escribir tests)

---

¡Éxito con el challenge! 🚀
