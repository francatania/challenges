import { Link } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";

export function NewTask(){
    return(
        <>
        <div className="button-back-wrapper">
            <Link to="/"> <button className="back">{"<-- Volver"}</button></Link>
        </div>
        
        <TaskForm/>
        </>

    )
}