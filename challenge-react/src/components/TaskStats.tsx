import type { Task } from "../types";

export function TaskStats({tasks}: {tasks: Task[]}){
    const completed = tasks.reduce((acc, task) => {
        return task.status === "Completada" ? acc + 1 : acc;
    }, 0);

    const inProgress = tasks.reduce((acc, task)=>{
        return task.status === "En Progreso" ? acc + 1 : acc;
    },0)

    const pending = tasks.reduce((acc, task)=>{
        return task.status === "Pendiente" ? acc + 1 : acc;
    },0)

    return (
        <>
            <h2>Total: {tasks.length}</h2>
            <h2>Pendientes: {pending}</h2>
            <h2>En progreso: {inProgress}</h2>
            <h2>Completadas: {completed}</h2>
        </>

    )
}