import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import type { Task, Team } from "../types";

export function TaskItem ({task, detail}: {task:Task, detail:boolean}){
    const {teams} = useTasks();
    const team: Team | undefined = teams.find(t => t.id === task.teamId);

    return (
        <div className="task-card">
            <h2>Titulo: {task.title}</h2>
            <h2>Descripcion: {detail ? task.description :task.description.slice(0, 20) + "..."}</h2>
            <h2>Equipo: {team?.name}</h2>
            <h2>Estado: {task.status}</h2>
            <h2>Fecha: {new Date(task.createdAt).toLocaleDateString("es-AR")}</h2>

            {!detail && <Link to={`/task/${task.id}`}>
                <button>Ver detalle</button>
            </Link>}
        </div>
    )
}
