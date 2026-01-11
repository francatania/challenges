import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { TaskForm } from "../components/TaskForm"

export const AppRouter = () =>{
    return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/new-task" element={<TaskForm/>}/>
        <Route path="/task/:id" />
        <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
    </Routes>
    )

}