import { createContext, type ReactNode, useState, useEffect} from 'react';
import {type Task, type TaskContextType, type TaskStatus, type TaskToCreate, type Team} from '../types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({children}: {children: ReactNode}){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
    const loadData = async()=>{
        setLoading(true)
        setTimeout(async ()=>{
            try {
                const taskData = await import('../data/tasks.json');

                const teamData = await import('../data/teams.json')

                const taskValidated = taskData.default.map((task)=> ({
                    ...task,
                    status: task.status as TaskStatus
                }))

                setTasks(taskValidated);
                setTeams(teamData.default);
            } catch (error) {
                console.error("Error while retrieving data.")
            }
            finally{
                setLoading(false)
            }
        }, 1500)

    }

    loadData();


    }, [])

    const createTask = (task: TaskToCreate) =>{
        const nextId:number = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

        const newTask: Task  = {
            id: nextId,
            ...task,
            createdAt: new Date().toISOString()
        }

        setTasks((tasks)=> [...tasks, newTask]);
    }

    return (
        <TaskContext.Provider value={{tasks, teams, loading, createTask}}>
            {children}
        </TaskContext.Provider>
    )
}
