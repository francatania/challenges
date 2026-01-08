export type TaskStatus = "Pendiente" | "En Progreso" | "Completada";

export interface Task {
    id: number,
    title: string,
    description: string,
    teamId: number,
    status: TaskStatus,
    createdAt: string
}

export interface TaskToCreate {
    title: string,
    description: string,
    teamId: number,
    status: TaskStatus,
}

export interface Team {
    id: number,
    name: string
}

export interface TaskContextType {
    tasks: Task[],
    teams: Team[],
    createTask: (task: TaskToCreate) => void,
    loading: boolean
}