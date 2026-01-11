import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskFilter } from "../components/TaskFilter";
import { TaskStats } from "../components/TaskStats";
import { TaskList } from "../components/TaskList";
import { Link } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";

export function Dashboard(){
        const {tasks, teams, loading} = useTasks();
        const [taskFilter, setTaskFilter] = useState<number>(0);
        const taskFiltered = taskFilter === 0 ? tasks : tasks.filter(t => t.teamId === taskFilter)
    
    
        return (
            <>
                <nav>
                    <section className="filter-section">
                            <TaskFilter filter={taskFilter} onChange={setTaskFilter} teams={teams}/>
                    </section>
    
                    <section className="stats-section">
                            <TaskStats tasks={tasks}/>
                    </section>

                    <section className="button-section">
                        <Link to={"/new-task"}>
                            <button className="new-task">Crear +</button>
                        </Link>
                    </section>

                </nav>
                <main className="">
                    <TaskList tasks={taskFiltered} loading={loading}/>
                </main>
    
            </>
    
    
        )
}