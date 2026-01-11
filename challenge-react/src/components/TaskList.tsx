import { TaskItem } from "./TaskItem";
import type { Task } from "../types";


export function TaskList({tasks, loading}: {tasks: Task[], loading: boolean}){

    return (
        <>
            <section className="task-list">
                {loading ? <h1>Cargando...</h1>
                    :
                    tasks.map(task =>(
                        <TaskItem key={task.id} task={task}/>
                    ))
                    }
            </section>
        </>

    )
}