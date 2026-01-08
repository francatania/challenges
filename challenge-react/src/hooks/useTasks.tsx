import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

export function useTasks(){
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTasks must be used with a provider.")
    }

    return context;
}