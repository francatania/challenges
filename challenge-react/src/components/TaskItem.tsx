import type { Task } from "../types";

export function TaskItem ({task}: {task:Task}){

    return (
        <div className="task-card">
            <h2>Titulo: {task.title}</h2>
            <h2>Descripcion: {task.description}</h2>
            <h2>Equipo: {task.teamId}</h2>
            <h2>Estado: {task.status}</h2>
            <h2>Fecha: {new Date(task.createdAt).toLocaleDateString("es-AR")}</h2>
        </div>
    )
}