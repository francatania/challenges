import { useParams } from "react-router-dom";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types";

export function TaskDetail(){
    const {id} = useParams();
    const {tasks, teams} = useTasks();
    const task: Task | undefined = tasks.find(t => t.id === Number(id))

    return <>
           
        {!task && <div>Tarea no encontrada</div>}
            
        <TaskItem detail={true} task={task!}/>
    </>
}