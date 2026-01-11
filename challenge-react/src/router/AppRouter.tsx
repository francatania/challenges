import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { NewTask } from "../pages/NewTask"
import { TaskDetail } from "../pages/TaskDetail"

export const AppRouter = () =>{
    return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/new-task" element={<NewTask/>}/>
        <Route path="/task/:id" element={<TaskDetail/>}/>
        <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
    </Routes>
    )

}