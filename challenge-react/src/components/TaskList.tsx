import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";

export function TaskList(){
    const {tasks, teams, loading} = useTasks();

    return (
        <section className="task-list">
            {loading ? <h1>Cargando...</h1>
            :
            tasks.map(task =>(
                <TaskItem key={task.id} task={task}/>
            ))
            }
        </section>

    )
}