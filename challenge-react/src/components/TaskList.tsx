import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { TaskFilter } from "./TaskFilter";
import type { Task } from "../types";

export function TaskList(){
    const {tasks, teams, loading} = useTasks();
    const [taskFilter, setTaskFilter] = useState<number>(0);
    const taskFiltered = taskFilter === 0 ? tasks : tasks.filter(t => t.teamId === taskFilter)


    return (
        <>
            <main className="">
                <section className="filter-section">
                    <TaskFilter filter={taskFilter} onChange={setTaskFilter} teams={teams}/>
                </section>

                <section className="task-list">
                    {loading ? <h1>Cargando...</h1>
                    :
                    taskFiltered.map(task =>(
                        <TaskItem key={task.id} task={task}/>
                    ))
                    }
                </section>
            </main>

        </>


    )
}