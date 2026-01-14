# Challenge Técnico: Aplicación de Gestión de Gastos

## 🎯 Introducción

¡Bienvenido al challenge técnico de Gestión de Gastos! Este proyecto se basa en tu experiencia previa con React, TypeScript, Context API y React Router, introduciendo conceptos del mundo real como **autenticación**, **integración con API** y **rutas protegidas**.

Construirás una aplicación de seguimiento de gastos personales que permite a los usuarios registrarse, iniciar sesión y gestionar sus gastos con operaciones CRUD completas. Este challenge simula una aplicación de producción real donde trabajarás con una API backend, manejarás autenticación JWT e implementarás filtros avanzados y funcionalidades de estadísticas.

### Lo que hiciste antes (Challenge de Gestión de Tareas)
- React Context API para manejo de estado
- Custom hooks (`useTasks`)
- React Router con rutas básicas
- Validación de formularios
- Filtros y estadísticas
- Datos mock con carga asíncrona simulada

### Lo nuevo en este Challenge
- 🔐 **Autenticación JWT** - Login/Registro con manejo de tokens
- 🌐 **Integración con API Real** - Peticiones HTTP a un servidor backend
- 🛡️ **Rutas Protegidas** - Guards de rutas basados en autenticación
- 🎣 **Hooks Avanzados** - `useAuth`, `useApi`, `useLocalStorage`, `useDebounce`
- 🔄 **Operaciones CRUD Completas** - Crear, Leer, Actualizar, Eliminar con llamadas a API
- 📊 **Filtros Avanzados** - Rangos de fechas, categorías, búsqueda con debounce
- ⚠️ **Manejo de Errores** - Fallos de red, errores de API, errores de validación

---

## ⏱️ Tiempo Estimado

- **Requisitos Core**: 3-4 horas
- **Features Bonus**: 1-2 horas adicionales (opcional)

**Tip**: Comienza con autenticación, luego pasa a gestión de gastos, y finalmente agrega filtros/estadísticas.

---

## 📋 Requisitos Funcionales

### 1. Sistema de Autenticación

#### Página de Registro (`/register`)
- Formulario con campos: Nombre, Apellido, Email, Password
- Validación client-side para todos los campos
- Llamar endpoint `POST /api/auth/register`
- Redireccionar a página de login al registrarse exitosamente
- Mostrar mensajes de error en caso de fallo

#### Página de Login (`/login`)
- Formulario con campos: Email, Password
- Validación client-side
- Llamar endpoint `POST /api/auth/login`
- Almacenar JWT token en localStorage
- Redireccionar al dashboard en caso de éxito
- Mostrar mensajes de error (credenciales inválidas, errores de red)

#### Funcionalidad de Logout
- Limpiar JWT token del localStorage
- Resetear estado de autenticación
- Redireccionar a página de login

#### Protección de Rutas
- Los usuarios deben estar autenticados para acceder a páginas de gastos
- Redireccionar usuarios no autenticados a `/login`
- Redireccionar usuarios autenticados fuera de `/login` y `/register` hacia el dashboard

---

### 2. Gestión de Gastos

#### Dashboard (`/`)
- Mostrar estadísticas de gastos:
  - Total de gastos (cantidad)
  - Monto total gastado
  - Monto gastado por categoría
  - Preview de gastos recientes
- Botones de acción rápida (Crear Nuevo Gasto, Ver Todos los Gastos)
- Barra de navegación con info de usuario y botón de logout

#### Página de Lista de Gastos (`/expenses`)
- Mostrar todos los gastos en formato lista/tabla
- Mostrar: descripción, monto, categoría, fecha
- Filtro por rango de fechas (fecha inicio, fecha fin)
- Filtro por categoría (dropdown)
- Barra de búsqueda para filtrar por descripción (con debounce)
- Click en gasto para ver detalles
- Spinner de carga mientras se obtienen datos
- Mensaje de estado vacío cuando no hay gastos

#### Página de Crear Gasto (`/expenses/new`)
- Formulario con campos:
  - Monto (input numérico)
  - Categoría (select dropdown)
  - Fecha (input de fecha)
  - Descripción (text area)
- Validación de formulario (ver sección de Reglas de Validación)
- Llamar endpoint `POST /api/spents`
- Redireccionar a lista de gastos en caso de éxito
- Mostrar mensajes de error en caso de fallo

#### Página de Detalle de Gasto (`/expenses/:id`)
- Mostrar información completa del gasto
- Modo de edición para actualizar campos del gasto
- Llamar endpoint `PATCH /api/spents/:id` para guardar cambios
- Botón de eliminar (opcional - feature bonus)
- Botón de volver a lista de gastos

---

### 3. Filtros y Búsqueda

#### Filtro por Rango de Fechas
- Inputs de fecha inicio y fecha fin
- Obtener gastos dentro del rango usando `GET /api/spents-range-date/:accountId?startDate=X&endDate=Y`
- Por defecto: últimos 30 días

#### Filtro por Categoría
- Dropdown con categorías disponibles
- Filtrar gastos por categoría seleccionada
- Opción para mostrar todas las categorías

#### Barra de Búsqueda
- Input de texto para buscar por descripción
- Debounced (esperar 300-500ms después de que el usuario deje de escribir)
- Búsqueda case-insensitive
- Funciona en combinación con otros filtros

---

### 4. Dashboard de Estadísticas

Calcular y mostrar:
- **Total de Gastos**: Cantidad de todos los gastos
- **Total Gastado**: Suma de todos los montos de gastos
- **Por Categoría**: Agrupar gastos por categoría y mostrar totales
- **Promedio de Gasto**: Total gastado / número de gastos

Usar patrones de programación funcional (`reduce`, `filter`, `map`) para los cálculos.

---

## 🛠️ Requisitos Técnicos

### Tecnologías Requeridas
- ✅ React 19.2.0
- ✅ TypeScript 5.9.3 (modo estricto)
- ✅ React Router DOM (instalar: `npm install react-router-dom`)
- ✅ Vite (ya configurado)

### Requisitos de Arquitectura

#### 1. Sistema de Tipos (`/src/types/index.ts`)
Definir interfaces TypeScript para:
- `User` - Información de usuario
- `Account` - Cuenta del usuario
- `LoginCredentials` - Datos del formulario de login
- `RegisterData` - Datos del formulario de registro
- `AuthResponse` - Respuesta de API de autenticación
- `Expense` - Entidad de gasto
- `ExpenseToCreate` - Datos para crear gasto
- `ExpenseToUpdate` - Datos para actualizar gasto (parcial)
- `Category` - Categoría de gasto
- `AuthContextType` - Forma del contexto de autenticación
- `ExpenseContextType` - Forma del contexto de gastos

**¡No se permiten tipos `any`!**

#### 2. Context API

**AuthContext** (`/src/context/AuthContext.tsx`):
```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  accounts: Account[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
```

Características:
- Almacenar usuario, token y cuentas en el estado
- Persistir token en localStorage
- Proveer funciones de autenticación
- Manejar estados de carga y error

**ExpenseContext** (`/src/context/ExpenseContext.tsx`):
```typescript
interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  createExpense: (expense: ExpenseToCreate) => Promise<void>;
  updateExpense: (id: string, data: ExpenseToUpdate) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  fetchExpensesByDateRange: (accountId: string, startDate: string, endDate: string) => Promise<void>;
  fetchExpenseById: (id: string) => Promise<Expense>;
  loading: boolean;
  error: string | null;
}
```

Características:
- Almacenar gastos y categorías en el estado
- Proveer operaciones CRUD
- Manejar estados de carga y error
- Usar token del AuthContext para llamadas a API

#### 3. Custom Hooks

**useAuth** (`/src/hooks/useAuth.ts`):
- Consumir `AuthContext`
- Lanzar error si se usa fuera del `AuthProvider`
- Retornar estado y funciones de autenticación

**useExpenses** (`/src/hooks/useExpenses.ts`):
- Consumir `ExpenseContext`
- Lanzar error si se usa fuera del `ExpenseProvider`
- Retornar estado y funciones de gastos

**useApi** (`/src/hooks/useApi.ts`):
- Hook cliente HTTP genérico
- Aceptar método, URL, body, headers
- Incluir automáticamente header `Authorization: Bearer {token}`
- Retornar `{ data, loading, error, execute }`
- Manejar errores HTTP (401, 404, 500, etc.)

**useLocalStorage** (`/src/hooks/useLocalStorage.ts`):
- Hook genérico para localStorage con generics de TypeScript
- Sincronizar estado con localStorage
- Retornar `[value, setValue, removeValue]`
- Manejar serialización/deserialización JSON

**useDebounce** (`/src/hooks/useDebounce.ts`):
- Aceptar valor y delay (ej: 500ms)
- Retornar valor debounced
- Usar para input de búsqueda para prevenir filtrado excesivo

#### 4. Estructura del Router (`/src/router/AppRouter.tsx`)

Rutas:
- `/login` - Ruta pública (Página de Login)
- `/register` - Ruta pública (Página de Registro)
- `/` - Ruta protegida (Dashboard)
- `/expenses` - Ruta protegida (Lista de gastos)
- `/expenses/new` - Ruta protegida (Crear gasto)
- `/expenses/:id` - Ruta protegida (Detalle/edición de gasto)
- `*` - Ruta pública (404 Not Found)

**Componente ProtectedRoute** (`/src/components/ProtectedRoute.tsx`):
- Verificar si el usuario está autenticado (token existe)
- Redireccionar a `/login` si no está autenticado
- Renderizar children si está autenticado

**Componente PublicRoute** (`/src/components/PublicRoute.tsx`):
- Redireccionar a `/` si ya está autenticado
- Renderizar children si no está autenticado

#### 5. Estructura de Componentes

**Pages** (`/src/pages/`):
- `Login.tsx` - Formulario de login
- `Register.tsx` - Formulario de registro
- `Dashboard.tsx` - Estadísticas y acciones rápidas
- `ExpenseList.tsx` - Lista de gastos con filtros
- `NewExpense.tsx` - Formulario de crear gasto
- `ExpenseDetail.tsx` - Ver/editar gasto individual
- `NotFound.tsx` - Página 404

**Components** (`/src/components/`):
- `Navbar.tsx` - Navegación con botón de logout
- `ProtectedRoute.tsx` - Guard de ruta
- `PublicRoute.tsx` - Wrapper de ruta pública
- `ExpenseItem.tsx` - Card/fila de gasto individual
- `ExpenseForm.tsx` - Formulario reutilizable para crear/editar
- `ExpenseStats.tsx` - Visualización de estadísticas
- `DateRangePicker.tsx` - Selector de rango de fechas
- `CategoryFilter.tsx` - Dropdown de categorías
- `SearchBar.tsx` - Input de búsqueda con debounce
- `LoadingSpinner.tsx` - Indicador de carga
- `ErrorMessage.tsx` - Visualización de errores

#### 6. Patrones de Programación Funcional

**Patrones Requeridos**:

1. **Métodos de Array**: Usar `map`, `filter`, `reduce`, `find`, `sort`
   ```typescript
   // Ejemplo: Calcular total gastado
   const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

   // Ejemplo: Agrupar por categoría
   const byCategory = expenses.reduce((acc, expense) => {
     const categoryName = expense.category;
     acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
     return acc;
   }, {} as Record<string, number>);
   ```

2. **Inmutabilidad**: Nunca mutar el estado directamente
   ```typescript
   // Agregar gasto
   setExpenses([...expenses, newExpense]);

   // Actualizar gasto
   setExpenses(expenses.map(e =>
     e.spentId === id ? { ...e, ...updates } : e
   ));

   // Eliminar gasto
   setExpenses(expenses.filter(e => e.spentId !== id));
   ```

3. **Funciones Puras**: Crear funciones utilitarias
   ```typescript
   const formatCurrency = (amount: number): string =>
     `$${amount.toFixed(2)}`;

   const formatDate = (date: string): string =>
     new Date(date).toLocaleDateString('es-ES');

   const isValidEmail = (email: string): boolean =>
     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   ```

4. **Funciones de Orden Superior**: Predicados, comparadores
   ```typescript
   const createDateRangeFilter = (start: string, end: string) =>
     (expense: Expense) => expense.date >= start && expense.date <= end;

   const sortByDate = (a: Expense, b: Expense) =>
     new Date(b.date).getTime() - new Date(a.date).getTime();
   ```

---

## 🌐 Documentación de la API

### URL Base
```
http://localhost:8080/api
```

### Endpoints

#### 1. Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

Request Body:
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "password": "password123"
}

Response (201 Created):
{
  "id": "696670aab7e07f016843526f",
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "accounts": [
    {
      "id": "696670aab7e07f0168435273",
      "accountName": "Principal",
      "incomes": [],
      "spents": [],
      "transfers": [],
      "createdAt": "2026-01-13T16:19:54.728Z",
      "updatedAt": "2026-01-13T16:19:54.728Z"
    },
    {
      "id": "696670aab7e07f0168435275",
      "accountName": "Ahorros",
      "incomes": [],
      "spents": [],
      "transfers": [],
      "createdAt": "2026-01-13T16:19:54.732Z",
      "updatedAt": "2026-01-13T16:19:54.732Z"
    }
  ]
}

Response (400 Bad Request):
{
  "error": "El email ya existe"
}
```

**Nota**: El registro devuelve el usuario completo con sus cuentas creadas automáticamente (Principal y Ahorros).

#### 2. Login de Usuario
```http
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "juan.perez@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (401 Unauthorized):
{
  "error": "Credenciales inválidas"
}
```

**Nota importante**: El token se llama `accessToken`, no `token`.

#### 3. Crear Gasto
```http
POST /spents
Content-Type: application/json
Authorization: Bearer {accessToken}

Request Body:
{
  "accountId": "696670aab7e07f0168435273",
  "amount": 1300,
  "categoryId": "65da711ddee93fd72a342a4a",
  "date": "2026-01-13",
  "description": "Compras del supermercado"
}

Response (201 Created):
{
  "spentId": "696671a1b7e07f0168435277",
  "description": "Compras del supermercado",
  "date": "2026-01-13T00:00:00.000Z",
  "amount": 1300
}
```

**Nota**: La respuesta de creación solo incluye los campos básicos (spentId, description, date, amount).

#### 4. Obtener Gasto por ID
```http
GET /spents/{id}
Authorization: Bearer {accessToken}

Response (200 OK):
{
  "spentId": "696671a1b7e07f0168435277",
  "description": "Compras del supermercado",
  "date": "2026-01-13T00:00:00.000Z",
  "amount": 1300,
  "account": {
    "_id": "696670aab7e07f0168435273",
    "accountName": "Principal"
  },
  "category": {
    "_id": "65da711ddee93fd72a342a4a",
    "category": "Comida"
  }
}

Response (404 Not Found):
{
  "error": "Gasto no encontrado"
}
```

**Nota**: Al obtener por ID, la respuesta incluye objetos completos para `account` y `category`.

#### 5. Obtener Gastos por Rango de Fechas
```http
GET /spents-range-date/{accountId}?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer {accessToken}

Response (200 OK):
[
  {
    "spentId": "696671a1b7e07f0168435277",
    "description": "Compras del supermercado",
    "date": "2026-01-13T00:00:00.000Z",
    "amount": 1300,
    "account": "Principal",
    "category": "Comida"
  },
  {
    "spentId": "696672a3b7e07f0168435280",
    "description": "Cena en restaurante",
    "date": "2026-01-10T00:00:00.000Z",
    "amount": 23300,
    "account": "Principal",
    "category": "Comida"
  }
]
```

**Nota importante**: En este endpoint, `account` y `category` son strings simples con los nombres, no objetos.

#### 6. Actualizar Gasto
```http
PATCH /spents/{id}
Content-Type: application/json
Authorization: Bearer {accessToken}

Request Body (actualización parcial):
{
  "description": "Descripción actualizada",
  "amount": 1800
}

Response (200 OK):
{
  "spentId": "696672a3b7e07f0168435280",
  "description": "Descripción actualizada",
  "date": "2026-01-10T00:00:00.000Z",
  "amount": 1800,
  "account": {
    "_id": "696670aab7e07f0168435273",
    "accountName": "Principal"
  },
  "category": {
    "_id": "65da711ddee93fd72a342a4a",
    "category": "Comida"
  }
}
```

**Nota**: La respuesta incluye objetos completos para `account` y `category`.

### Autenticación
Todos los endpoints de gastos requieren un token JWT en el header `Authorization`:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Importante**: El token se obtiene del campo `accessToken` en la respuesta del login.

### Respuestas de Error
```typescript
// 401 Unauthorized
{
  "error": "Token inválido o expirado"
}

// 400 Bad Request
{
  "error": "Error de validación",
  "details": {
    "amount": "El monto debe ser positivo"
  }
}

// 500 Internal Server Error
{
  "error": "Ocurrió un error inesperado"
}
```

### Credenciales de Prueba
Para propósitos de testing, puedes usar:
- **Email**: `qa@gmail.com`
- **Password**: `123456`

### Categorías (Datos Reales de la API)
Usa estas categorías con sus IDs reales de la base de datos:

```typescript
const categories: Category[] = [
  {
    id: "65da711ddee93fd72a342a4a",
    name: "Comida"
  },
  {
    id: "65da7157dee93fd72a342a60",
    name: "Deudas"
  },
  {
    id: "65da715bdee93fd72a342a62",
    name: "Vacaciones"
  },
  {
    id: "663c26fbfb5b23d9723ead62",
    name: "Taxi"
  },
  {
    id: "66b6a976810ee25b3ff83227",
    name: "Peluqueria"
  }
];
```

**Nota**: Estas son las categorías reales en la base de datos. Puedes hardcodearlas en tu aplicación ya que la API no provee un endpoint para obtenerlas.

---

## 🎨 Features Bonus (Opcionales)

Estas características harán que tu solución se destaque:

1. **Paginación o Scroll Infinito** - Manejar listas grandes de gastos eficientemente
2. **Exportar a CSV** - Descargar gastos como archivo CSV
3. **Colores de Categorías** - Código de colores visual para categorías
4. **Límites de Presupuesto** - Establecer presupuesto mensual y mostrar advertencias
5. **Tendencias de Gastos** - Gráfico simple mostrando gastos en el tiempo
6. **Modo Oscuro** - Toggle de tema
7. **Subir Recibos** - Carga de imágenes para recibos de gastos
8. **Modal de Confirmación de Eliminación** - Confirmar antes de eliminar gastos
9. **Opciones de Ordenamiento** - Ordenar por fecha, monto, categoría
10. **Diseño Responsive** - Layout amigable para móviles
11. **Selector de Cuentas** - Permitir cambiar entre cuenta "Principal" y "Ahorros"

---

## ✅ Reglas de Validación

### Formulario de Login
- **Email**: Requerido, formato de email válido
- **Password**: Requerido, mínimo 6 caracteres

### Formulario de Registro
- **Nombre**: Requerido, 2-50 caracteres
- **Apellido**: Requerido, 2-50 caracteres
- **Email**: Requerido, formato de email válido
- **Password**: Requerido, mínimo 8 caracteres, debe contener al menos una letra y un número
- **Confirmar Password**: Debe coincidir con el campo password

### Formulario de Gastos
- **Monto**: Requerido, número positivo, máximo 2 decimales
- **Categoría**: Requerida, debe ser de las categorías disponibles
- **Fecha**: Requerida, formato de fecha válido (YYYY-MM-DD), no una fecha futura
- **Descripción**: Requerida, 5-200 caracteres
- **Cuenta**: Requerida, debe ser una de las cuentas del usuario

---

## 📊 Criterios de Evaluación

Tu solución será evaluada en base a:

### Conocimiento de React (40%)
- ✅ Uso apropiado de hooks de React (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`)
- ✅ Implementación de Context API (AuthContext, ExpenseContext)
- ✅ Custom hooks con clara separación de responsabilidades
- ✅ Composición y reutilización de componentes
- ✅ Manejo apropiado del estado (local vs global)
- ✅ Arrays de dependencias de efectos correctos

### TypeScript (15%)
- ✅ Todas las interfaces y tipos están correctamente definidos
- ✅ No uso del tipo `any`
- ✅ Tipado apropiado para props, estado y funciones
- ✅ Tipos genéricos donde sea apropiado
- ✅ Inferencia de tipos usada efectivamente

### Integración con API (15%)
- ✅ Peticiones HTTP correctamente implementadas
- ✅ Headers de autorización incluidos
- ✅ Manejo de errores para fallos de red
- ✅ Estados de carga durante operaciones asíncronas
- ✅ Datos de respuesta correctamente tipados
- ✅ Errores de API mostrados al usuario

### Programación Funcional (15%)
- ✅ Uso de `map`, `filter`, `reduce` para transformaciones de datos
- ✅ Actualizaciones de estado inmutables (sin mutaciones directas)
- ✅ Funciones utilitarias puras
- ✅ Funciones de orden superior (predicados, comparadores)
- ✅ Composición de funciones

### Arquitectura (10%)
- ✅ Estructura de carpetas clara
- ✅ Separación de responsabilidades (pages, components, hooks, context, services)
- ✅ Principio DRY (Don't Repeat Yourself)
- ✅ Componentes menores a 150 líneas
- ✅ Convenciones de nombres significativas

### Experiencia de Usuario (5%)
- ✅ Navegación intuitiva
- ✅ Mensajes de error claros
- ✅ Feedback de carga
- ✅ Validación de formularios con mensajes amigables
- ✅ Estilo consistente
- ✅ Estados vacíos manejados

---

## 📁 Estructura de Proyecto Recomendada

```
challengue-react-2/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CategoryFilter.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseItem.tsx
│   │   ├── ExpenseStats.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── SearchBar.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ExpenseContext.tsx
│   ├── hooks/
│   │   ├── useApi.ts
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useExpenses.ts
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ExpenseDetail.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── Login.tsx
│   │   ├── NewExpense.tsx
│   │   ├── NotFound.tsx
│   │   └── Register.tsx
│   ├── router/
│   │   └── AppRouter.tsx
│   ├── services/
│   │   └── api.ts (opcional - funciones helper de API)
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts (formateadores, validadores, etc.)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Instrucciones de Setup

### 1. Instalar Dependencias
```bash
cd challengue-react-2
npm install
npm install react-router-dom
```

### 2. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

La aplicación correrá en `http://localhost:5173`

### 3. API Backend
La API está corriendo en `http://localhost:8080/api`

**¡Asegúrate de que el servidor backend esté corriendo antes de comenzar el desarrollo!**

### 4. Probar Acceso a la API
Usa una herramienta como Postman, Thunder Client, o curl para probar los endpoints de la API:

```bash
# Probar login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"qa@gmail.com","password":"123456"}'
```

---

## 📦 Entregables

### Qué Entregar
1. **Código fuente completo** en la carpeta `challengue-react-2`
2. **README.md** con:
   - Instrucciones de setup
   - Cómo ejecutar el proyecto
   - Cualquier suposición realizada
   - Cualquier feature bonus implementada
3. **Sin node_modules** (asegúrate de que `.gitignore` esté configurado)

### Requisitos
- ✅ La compilación de TypeScript pasa (`npm run build`)
- ✅ Sin errores de TypeScript
- ✅ Todas las rutas funcionales
- ✅ El flujo de autenticación funciona end-to-end
- ✅ Las operaciones CRUD funcionan con la API
- ✅ Los filtros y búsqueda funcionan correctamente
- ✅ Las estadísticas calculan con precisión

---

## 💡 Tips y Mejores Prácticas

### Para Comenzar
1. **Comienza con los tipos** - Define todas las interfaces primero en `/src/types/index.ts`
2. **Construye AuthContext primero** - La autenticación es la base
3. **Prueba el flujo de auth** - Asegúrate de que login/register/logout funcionen antes de continuar
4. **Luego ExpenseContext** - Construye sobre la auth funcionando
5. **Una página a la vez** - Completa y prueba cada página antes de pasar a la siguiente

### Mejores Prácticas de React
- Usa `useCallback` para funciones pasadas a componentes hijos
- Usa `useMemo` para cálculos costosos
- Mantén los componentes bajo 150 líneas
- Extrae lógica reutilizable en custom hooks
- Eleva el estado cuando múltiples componentes lo necesiten

### Tips de TypeScript
- Comienza con tipos estrictos, no uses `any`
- Usa inferencia de tipos de TypeScript cuando sea posible
- Define interfaces antes de implementar componentes
- Usa propiedades opcionales (`?`) para actualizaciones parciales
- Crea union types para enums (`type Status = "pending" | "approved"`)

### Integración con API
- Usa bloques `try-catch` para todas las llamadas a API
- Muestra mensajes de error amigables (no objetos de error raw)
- Muestra spinners de carga durante peticiones
- Maneja errores 401 redireccionando a login
- Prueba con datos inválidos para asegurar que el manejo de errores funcione

### Debugging
- Revisa la consola del navegador para errores
- Usa React DevTools para inspeccionar el estado de componentes
- Usa la pestaña Network para inspeccionar peticiones/respuestas de API
- Agrega console.logs estratégicamente (remuévelos antes de entregar)
- Prueba con refresh del navegador para asegurar que la persistencia del token funcione

---

## ⚠️ Errores Comunes a Evitar

### Problemas de TypeScript
- ❌ Usar tipo `any` (usa interfaces apropiadas)
- ❌ Ignorar errores de TypeScript con `@ts-ignore`
- ❌ No tipar parámetros y valores de retorno de funciones

### Problemas de React
- ❌ Mutar el estado directamente (`expenses.push()` en lugar de `setExpenses([...expenses, newExpense])`)
- ❌ Loops infinitos de useEffect (dependencias faltantes)
- ❌ No manejar estados de carga durante llamadas a API
- ❌ Olvidar limpiar efectos con funciones de retorno

### Problemas de API
- ❌ Olvidar incluir header `Authorization`
- ❌ No manejar errores de API graciosamente
- ❌ Hardcodear token en llamadas a API (usa contexto en su lugar)
- ❌ No validar datos del formulario antes de enviar a la API
- ❌ No manejar las diferentes estructuras de respuesta (account y category como strings vs objetos)

### Problemas de Autenticación
- ❌ Almacenar datos sensibles en localStorage (solo almacena el token)
- ❌ No limpiar token en logout
- ❌ No redireccionar a login cuando el token es inválido/expirado
- ❌ Permitir acceso a rutas protegidas sin autenticación
- ❌ Buscar `token` en lugar de `accessToken` en la respuesta del login

### Problemas Generales
- ❌ No probar la app con refresh del navegador
- ❌ No manejar estados vacíos (sin gastos todavía)
- ❌ No proveer feedback al usuario durante operaciones
- ❌ Convenciones de nombres inconsistentes
- ❌ Dejar console.logs en el código final

---

## 🎓 Recursos de Aprendizaje

Si te trabas, estos recursos pueden ayudar:

- **React Hooks**: [React Official Docs](https://react.dev/reference/react)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **React Router**: [React Router Docs](https://reactrouter.com/)
- **Fetch API**: [MDN Fetch Guide](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- **JWT Authentication**: [JWT.io](https://jwt.io/introduction)

---

## 🏁 Notas Finales

Este challenge está diseñado para evaluar tu capacidad de:
- Construir una aplicación React completa y lista para producción
- Integrarte con una API backend real
- Manejar estado complejo con Context API
- Implementar autenticación y rutas protegidas
- Escribir código type-safe con TypeScript
- Aplicar patrones de programación funcional
- Manejar errores y estados de carga graciosamente

**Recuerda**: Enfócate en código limpio y legible sobre soluciones ingeniosas. Los comentarios deben explicar el "por qué", no el "qué". Prueba tu aplicación a fondo, especialmente casos edge y escenarios de error.

**¡Buena suerte y a codear!** 🚀

---

## 📞 ¿Preguntas?

Si tienes preguntas sobre los requisitos o encuentras problemas con la API:
- Revisa la sección de documentación de API cuidadosamente
- Prueba los endpoints con Postman/curl antes de codear
- Verifica que el servidor backend esté corriendo
- Verifica peticiones de red en DevTools del navegador
- Nota que la API devuelve estructuras diferentes según el endpoint (account/category como string vs objeto)

Enfócate en demostrar tus habilidades de React, TypeScript y resolución de problemas. ¡Estamos emocionados de ver tu solución!
